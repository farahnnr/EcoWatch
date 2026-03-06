import React, { useState } from 'react';
import { Trophy, Medal, Award, Globe, Users } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Leaderboard.css';

const Leaderboard = () => {
    const { users, aseanCountries, currentUser } = useAppContext();
    const [viewMode, setViewMode] = useState('regional'); // 'regional' | 'global'
    const [selectedCountry, setSelectedCountry] = useState(currentUser?.country || 'id');

    // Sort global users
    const topUsers = [...users].sort((a, b) => b.points - a.points);

    // Sort regional users based on selected country
    const regionalUsers = users
        .filter(u => u.country === selectedCountry)
        .sort((a, b) => b.points - a.points);

    const getRankIcon = (index) => {
        switch (index) {
            case 0: return <Trophy size={24} className="rank-icon rank-gold" />;
            case 1: return <Medal size={24} className="rank-icon rank-silver" />;
            case 2: return <Award size={24} className="rank-icon rank-bronze" />;
            default: return <span className="rank-number">{index + 1}</span>;
        }
    };

    return (
        <div className="leaderboard-container animate-fade-in">
            <div className="leaderboard-header">
                <div className="trophy-bg">
                    <Trophy size={48} color="var(--accent-primary)" opacity={0.2} />
                </div>
                <h2>{viewMode === 'regional' ? 'Regional Rankings' : 'Global Explorers'}</h2>
                <p>
                    {viewMode === 'regional'
                        ? 'Top contributors within each ASEAN nation.'
                        : 'Top individuals across the entire network.'}
                </p>
            </div>

            <div className="leaderboard-tabs">
                <button
                    className={`tab-btn ${viewMode === 'regional' ? 'active' : ''}`}
                    onClick={() => setViewMode('regional')}
                >
                    <Globe size={16} /> Regional
                </button>
                <button
                    className={`tab-btn ${viewMode === 'global' ? 'active' : ''}`}
                    onClick={() => setViewMode('global')}
                >
                    <Users size={16} /> Global
                </button>
            </div>

            {viewMode === 'regional' && (
                <div className="country-selector">
                    {aseanCountries.map(country => (
                        <button
                            key={country.id}
                            className={`country-pill ${selectedCountry === country.id ? 'active' : ''}`}
                            onClick={() => setSelectedCountry(country.id)}
                        >
                            <span className="country-flag">{country.flag}</span>
                            <span className="country-name-pill">{country.name}</span>
                        </button>
                    ))}
                </div>
            )}

            <div className="leaderboard-list">
                {viewMode === 'regional' ? (
                    regionalUsers.length > 0 ? (
                        regionalUsers.map((user, index) => {
                            const isTop3 = index < 3;
                            const userCountry = aseanCountries.find(c => c.id === user.country);
                            return (
                                <div
                                    key={user.id}
                                    className={`leaderboard-item glass-panel ${isTop3 ? `rank-${index + 1}` : ''}`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="rank-display">
                                        {getRankIcon(index)}
                                    </div>

                                    <div className="country-display">
                                        <div className="user-avatar-lb">{user.avatar}</div>
                                        <div className="user-info-col">
                                            <span className="country-name">{user.name}</span>
                                            <span className="score-label" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                                                {userCountry?.flag} {userCountry?.name}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="score-display">
                                        <span className="score-value">{user.points ? user.points.toLocaleString() : 0}</span>
                                        <span className="score-label">pts</span>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="empty-state">
                            <p>No contributors from this country yet.</p>
                        </div>
                    )
                ) : (
                    topUsers.map((user, index) => {
                        const isTop3 = index < 3;
                        const userCountry = aseanCountries.find(c => c.id === user.country);
                        return (
                            <div
                                key={user.id}
                                className={`leaderboard-item glass-panel ${isTop3 ? `rank-${index + 1}` : ''}`}
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="rank-display">
                                    {getRankIcon(index)}
                                </div>

                                <div className="country-display">
                                    <div className="user-avatar-lb">{user.avatar}</div>
                                    <div className="user-info-col">
                                        <span className="country-name">{user.name}</span>
                                        <span className="score-label" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                                            {userCountry?.flag} {userCountry?.name}
                                        </span>
                                    </div>
                                </div>

                                <div className="score-display">
                                    <span className="score-value">{user.points ? user.points.toLocaleString() : 0}</span>
                                    <span className="score-label">pts</span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
