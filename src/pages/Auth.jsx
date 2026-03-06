import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Leaf, LogIn, UserPlus } from 'lucide-react';
import './Auth.css';

const Auth = () => {
    const { login, signup, aseanCountries } = useAppContext();
    const [isLogin, setIsLogin] = useState(true);

    // Form State
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('id'); // Default Indonesia
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (isLogin) {
            const userId = name.trim();
            if (!userId || !password) {
                setError('Please enter User ID / Name and password');
                return;
            }
            const success = login(userId, password);
            if (!success) setError('Invalid credentials. Check your User ID and password.');
        } else {
            if (!name.trim() || !password) {
                setError('Please provide a name and a password');
                return;
            }
            signup(name, country, password);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card glass-panel animate-fade-in">
                <div className="auth-header">
                    <div className="auth-logo">
                        <Leaf size={40} color="var(--accent-primary)" />
                    </div>
                    <h1 className="auth-title">EcoWatch</h1>
                    <p className="auth-subtitle">ASEAN Citizen Science</p>
                </div>

                <div className="auth-tabs">
                    <button
                        className={`auth-tab ${isLogin ? 'active' : ''}`}
                        onClick={() => { setIsLogin(true); setError(''); setPassword(''); }}
                        type="button"
                    >
                        Log In
                    </button>
                    <button
                        className={`auth-tab ${!isLogin ? 'active' : ''}`}
                        onClick={() => { setIsLogin(false); setError(''); setPassword(''); }}
                        type="button"
                    >
                        Sign Up
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && <div className="auth-error animate-fade-in">{error}</div>}

                    {isLogin ? (
                        <>
                            <div className="form-group">
                                <label>User ID or Name (Demo: u1, u2...)</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="Enter User ID or Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Password (Demo: password123)</label>
                                <input
                                    type="password"
                                    className="input-field"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="form-group">
                                <label>Display Name</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>ASEAN Country</label>
                                <select
                                    className="input-field select-field"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                >
                                    {aseanCountries.map(c => (
                                        <option key={c.id} value={c.id}>
                                            {c.flag} {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="input-field"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    )}

                    <button type="submit" className="primary-button auth-submit">
                        {isLogin ? (
                            <><LogIn size={18} /> Enter Platform</>
                        ) : (
                            <><UserPlus size={18} /> Join EcoWatch</>
                        )}
                    </button>
                </form>
            </div>

            <div className="auth-bg-decor shape-1 animate-pulse-glow"></div>
            <div className="auth-bg-decor shape-2" style={{ animationDelay: '1s' }}></div>
        </div>
    );
};

export default Auth;
