import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Leaf, User, Settings, HelpCircle, LogOut, ChevronDown } from 'lucide-react';
import './Header.css';

const Header = ({ onNavigate }) => {
    const { currentUser, logout } = useAppContext();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <header className="app-header glass-panel">
            <div className="header-logo">
                <div className="logo-icon">
                    <Leaf size={20} color="var(--accent-primary)" />
                </div>
                <span className="logo-text">EcoWatch</span>
            </div>

            {currentUser && (
                <div className="user-nav">
                    <div className="points-badge">
                        <span className="points-icon">pts</span>
                        <span className="points-value">{currentUser.points}</span>
                    </div>

                    <div className="user-menu-container" ref={menuRef}>
                        <button
                            className="user-menu-btn"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <div className="avatar">
                                {currentUser.avatar}
                            </div>
                            <ChevronDown size={16} color="var(--text-muted)" />
                        </button>

                        {menuOpen && (
                            <div className="user-dropdown-menu animate-fade-in">
                                <div className="dropdown-header">
                                    <strong>{currentUser.name}</strong>
                                    <span className="dropdown-subtitle">@{currentUser.id}</span>
                                </div>

                                <hr className="dropdown-divider" />

                                <button
                                    className="dropdown-item"
                                    onClick={() => { setMenuOpen(false); onNavigate('profile'); }}
                                >
                                    <User size={16} /> Account Profile
                                </button>
                                <button
                                    className="dropdown-item"
                                    onClick={() => { setMenuOpen(false); onNavigate('settings'); }}
                                >
                                    <Settings size={16} /> App Settings
                                </button>
                                <button
                                    className="dropdown-item"
                                    onClick={() => { setMenuOpen(false); onNavigate('faq'); }}
                                >
                                    <HelpCircle size={16} /> FAQs & Help
                                </button>

                                <hr className="dropdown-divider" />

                                <button
                                    className="dropdown-item logout-item"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        logout();
                                    }}
                                >
                                    <LogOut size={16} /> Log Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
