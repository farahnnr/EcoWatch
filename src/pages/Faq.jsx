import React, { useState } from 'react';
import { ChevronDown, ChevronLeft, HelpCircle } from 'lucide-react';
import './Faq.css';

const FAQ_DATA = [
    {
        id: 1,
        question: "What is EcoWatch?",
        answer: "EcoWatch is an AI-powered citizen science platform for ASEAN students. We collect environmental data (like flora/fauna sightings, air quality, water health) to help measure our region's biodiversity and environmental changes over time."
    },
    {
        id: 2,
        question: "How do I earn points?",
        answer: "Points are awarded for each new observation you log using the Camera feature. Detailed submissions with notes and accurate locations receive higher points! Your points contribute to both your 'Global Explorer' ranking and your country's 'Regional' ranking."
    },
    {
        id: 3,
        question: "How does the AI Analysis work?",
        answer: "When you upload a photo, our machine learning models verify the species, assess 'health severity' tags (like spotting invasive patterns or drought stress), and surface related cultural context across different Southeast Asian nations."
    },
    {
        id: 4,
        question: "Why should I link my phone number?",
        answer: "Linking your number acts as an anti-exploitation measure. To ensure the citizen science data stays authentic, we want to verify that real residents are contributing real logs, preventing duplicate or bot accounts from inflating a country's rank."
    },
    {
        id: 5,
        question: "How can I report a bug or bad data?",
        answer: "You can ask the EcoWatch AI Chatbot to guide you, or flag a specific Feed post. Our moderation team reviews flagged entries to keep the dataset clean."
    }
];

const Faq = ({ onBack }) => {
    const [openId, setOpenId] = useState(null);

    const toggleItem = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="faq-container animate-fade-in">
            <div className="faq-header">
                <button className="icon-button back-button" onClick={onBack}>
                    <ChevronLeft size={24} />
                </button>
                <h2>FAQs & Help</h2>
                <div style={{ width: 40 }}></div> {/* Spacer */}
            </div>

            <div className="faq-hero">
                <div className="faq-icon-wrapper">
                    <HelpCircle size={40} color="var(--accent-primary)" />
                </div>
                <p>How can we help you explore the ASEAN environment?</p>
            </div>

            <div className="faq-list">
                {FAQ_DATA.map(item => (
                    <div key={item.id} className={`faq-item glass-panel ${openId === item.id ? 'open' : ''}`}>
                        <button
                            className="faq-question"
                            onClick={() => toggleItem(item.id)}
                        >
                            <h3>{item.question}</h3>
                            <ChevronDown
                                size={20}
                                className={`faq-chevron ${openId === item.id ? 'rotated' : ''}`}
                            />
                        </button>

                        <div className="faq-answer-wrapper">
                            <div className="faq-answer">
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Faq;
