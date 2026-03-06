import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MapPin, Droplets, Wind, Leaf } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './AiChat.css';

const MOCK_CATEGORIES = [
    { id: 'plants', name: 'Flora', icon: <Leaf size={16} /> },
    { id: 'animals', name: 'Fauna', icon: <Sparkles size={16} /> },
    { id: 'water', name: 'Water Health', icon: <Droplets size={16} /> },
    { id: 'air', name: 'Air Quality', icon: <Wind size={16} /> }
];

const MOCK_RESPONSES = {
    general: "I'm the EcoWatch AI assistant. I can help identify species, provide cultural context for your discoveries, or analyze local air and water data.",
    plants: "Southeast Asia is home to incredible biodiversity. If you've observed a plant, it could be used for traditional medicine or food. Can you describe it?",
    animals: "Many unique species are found in ASEAN! From hornbills in Malaysia to tarsiers in the Philippines. What did you spot?",
    water: "Water quality is vital. If you see plastics in waterways, document it here on EcoWatch to alert local agencies.",
    air: "Air quality can fluctuate due to seasonal shifts and urban density. Protecting green spaces helps mitigate urban heat!"
};

const AiChat = () => {
    const { currentUser } = useAppContext();
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: MOCK_RESPONSES.general, category: null }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = (text, category = null) => {
        if (!text.trim()) return;

        const newMsg = { id: Date.now(), sender: 'user', text };
        setMessages(prev => [...prev, newMsg]);
        setInputText('');
        setIsTyping(true);

        // Simulate AI response delay
        setTimeout(() => {
            setIsTyping(false);

            let botText = "That's an interesting observation! Please document it using the Camera tab so the community can learn from it.";

            const lowerText = text.toLowerCase();
            if (category === 'plants' || lowerText.includes('plant') || lowerText.includes('tree')) botText = MOCK_RESPONSES.plants;
            else if (category === 'animals' || lowerText.includes('animal') || lowerText.includes('bird')) botText = MOCK_RESPONSES.animals;
            else if (category === 'water' || lowerText.includes('water') || lowerText.includes('river')) botText = MOCK_RESPONSES.water;
            else if (category === 'air' || lowerText.includes('air') || lowerText.includes('smoke')) botText = MOCK_RESPONSES.air;

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'bot',
                text: botText
            }]);
        }, 1500);
    };

    return (
        <div className="chat-container animate-fade-in">
            <div className="chat-header">
                <div className="bot-avatar glass-panel">
                    <Bot size={24} color="var(--accent-primary)" />
                </div>
                <div>
                    <h2>EcoWatch AI</h2>
                    <p>Environmental Research Assistant</p>
                </div>
            </div>

            <div className="chat-categories">
                {MOCK_CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        className="category-pill glass-panel"
                        onClick={() => handleSend(`Tell me about ${cat.name} in ASEAN.`, cat.id)}
                    >
                        {cat.icon} {cat.name}
                    </button>
                ))}
            </div>

            <div className="chat-messages" ref={scrollRef}>
                {messages.map(msg => (
                    <div key={msg.id} className={`message-wrapper ${msg.sender === 'user' ? 'user' : 'bot'}`}>
                        <div className={`message-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble glass-panel'}`}>
                            <p>{msg.text}</p>
                        </div>
                        {msg.sender === 'user' && (
                            <div className="message-avatar user-msg-avatar">{currentUser?.avatar}</div>
                        )}
                        {msg.sender === 'bot' && (
                            <div className="message-avatar bot-msg-avatar">
                                <Bot size={14} />
                            </div>
                        )}
                    </div>
                ))}

                {isTyping && (
                    <div className="message-wrapper bot">
                        <div className="message-bubble bot-bubble glass-panel typing-indicator">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                )}
            </div>

            <div className="chat-input-area glass-panel">
                <input
                    type="text"
                    className="chat-input"
                    placeholder="Ask about nature, pollution, species..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend(inputText)}
                />
                <button
                    className="chat-send-btn"
                    onClick={() => handleSend(inputText)}
                    disabled={!inputText.trim()}
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
};

export default AiChat;
