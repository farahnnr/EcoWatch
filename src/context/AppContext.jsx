import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_LOGS, MOCK_USERS, ASEAN_COUNTRIES, getLeaderboardData } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // Authentication State
    const [currentUser, setCurrentUser] = useState(null);

    // App Data State
    const [logs, setLogs] = useState([]);
    const [users, setUsers] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);

    // Load initial mock data
    useEffect(() => {
        // Check localStorage for an existing user session to persist login
        const savedUserId = localStorage.getItem('ecowatch_user_id');
        if (savedUserId) {
            const user = MOCK_USERS.find(u => u.id === savedUserId);
            if (user) setCurrentUser(user);
        }

        // Load logs and sort by newest first
        setLogs([...MOCK_LOGS].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
        setUsers(MOCK_USERS);
        setLeaderboard(getLeaderboardData());
    }, []);

    const login = (userId, password) => {
        const user = users.find(u => u.id === userId || u.name === userId);
        if (user && user.password === password) {
            setCurrentUser(user);
            localStorage.setItem('ecowatch_user_id', user.id);
            return true;
        }
        return false;
    };

    const signup = (name, countryId, password) => {
        const newUser = {
            id: `u${Date.now()}`,
            name,
            country: countryId,
            password,
            points: 10, // Starting points for joining
            avatar: name.substring(0, 2).toUpperCase()
        };

        setUsers(prev => [...prev, newUser]);
        setCurrentUser(newUser);
        localStorage.setItem('ecowatch_user_id', newUser.id);

        // Update leaderboard with new user
        // We would normally re-calculate leaderboard based on users, but for simplicity here:
        setLeaderboard(prev => {
            let updated = [...prev];
            const countryIndex = updated.findIndex(c => c.id === countryId);
            if (countryIndex >= 0) {
                updated[countryIndex].score += newUser.points;
            } else {
                const country = ASEAN_COUNTRIES.find(c => c.id === countryId);
                if (country) {
                    updated.push({ id: countryId, name: country.name, flag: country.flag, score: newUser.points });
                }
            }
            return updated.sort((a, b) => b.score - a.score);
        });

        return true;
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('ecowatch_user_id');
    };

    const updateUser = (userId, updates) => {
        setUsers(prevUsers =>
            prevUsers.map(u => u.id === userId ? { ...u, ...updates } : u)
        );
        if (currentUser && currentUser.id === userId) {
            setCurrentUser(prev => ({ ...prev, ...updates }));
        }
    };

    const addLog = (newLogEntry) => {
        const log = {
            id: `L${Date.now()}`,
            userId: currentUser.id,
            timestamp: new Date().toISOString(),
            ...newLogEntry
        };

        setLogs(prev => [log, ...prev]);

        // Award points to user
        setCurrentUser(prev => ({ ...prev, points: prev.points + 50 }));

        // Ideally we'd trigger a leaderboard recalculation here 
        // but we can skip that for the prototype or implement it fully if strictly needed.
        return log;
    };

    const deleteLog = (logId) => {
        setLogs(prev => prev.filter(l => l.id !== logId));
        // You typically might also deduct points, but for this mock, just deleting the post.
    };

    const reportLog = (logId) => {
        // Mock report logic: immediately hide it from feed to simulate action taken.
        setLogs(prev => prev.filter(l => l.id !== logId));
    };

    const getUserById = (id) => users.find(u => u.id === id);

    return (
        <AppContext.Provider value={{
            currentUser,
            logs,
            leaderboard,
            login,
            signup,
            logout,
            updateUser,
            addLog,
            deleteLog,
            reportLog,
            getUserById,
            users,
            aseanCountries: ASEAN_COUNTRIES
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
