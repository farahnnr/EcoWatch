import React, { useState, useEffect } from 'react';
import { Moon, Sun, Settings as SettingsIcon, ChevronLeft, Bell, BellOff, Globe } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Settings.css';

const Settings = ({ onBack }) => {
    const { aseanCountries } = useAppContext();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    const [notifications, setNotifications] = useState(true);

    useEffect(() => {
        // Apply theme to document
        if (theme === 'light') {
            document.body.classList.add('theme-light');
        } else {
            document.body.classList.remove('theme-light');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="settings-container animate-fade-in">
            <div className="settings-header">
                <button className="icon-button back-button" onClick={onBack}>
                    <ChevronLeft size={24} />
                </button>
                <h2>App Settings</h2>
                <div style={{ width: 40 }}></div> {/* Spacer */}
            </div>

            <div className="settings-content">
                <div className="settings-section glass-panel">
                    <div className="section-title">
                        <SettingsIcon size={18} color="var(--accent-primary)" />
                        <h3>Preferences</h3>
                    </div>

                    <div className="setting-item">
                        <div className="setting-info">
                            <h4>Dark Mode</h4>
                            <p>Toggle between light and dark themes</p>
                        </div>
                        <button
                            className={`toggle-switch ${theme === 'dark' ? 'active' : ''}`}
                            onClick={toggleTheme}
                        >
                            <div className="toggle-slider">
                                {theme === 'dark' ? <Moon size={12} color="#0f172a" /> : <Sun size={12} color="#f59e0b" />}
                            </div>
                        </button>
                    </div>

                    <div className="setting-item">
                        <div className="setting-info">
                            <h4>Push Notifications</h4>
                            <p>Receive updates for nearby citizen science activities</p>
                        </div>
                        <button
                            className={`toggle-switch ${notifications ? 'active' : ''}`}
                            onClick={() => setNotifications(!notifications)}
                        >
                            <div className="toggle-slider">
                                {notifications ? <Bell size={12} color="#0f172a" /> : <BellOff size={12} color="#64748b" />}
                            </div>
                        </button>
                    </div>
                </div>

                <div className="settings-section glass-panel push-top">
                    <div className="section-title">
                        <Globe size={18} color="var(--accent-primary)" />
                        <h3>Regional Data</h3>
                    </div>

                    <div className="setting-item">
                        <div className="setting-info">
                            <h4>Data Sync Priority</h4>
                            <p>Prioritize local flora/fauna data models</p>
                        </div>
                        <select className="input-field select-field settings-select">
                            <option value="auto">Auto (Detect Location)</option>
                            {aseanCountries.map(c => (
                                <option key={c.id} value={c.id}>{c.flag} {c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="settings-footer">
                    <p>EcoWatch v1.0.0-beta</p>
                    <p>Made for ASEAN Citizen Science</p>
                </div>
            </div>
        </div>
    );
};

export default Settings;
