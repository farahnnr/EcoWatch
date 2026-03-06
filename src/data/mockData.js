export const ASEAN_COUNTRIES = [
    { id: 'bn', name: 'Brunei', flag: '🇧🇳' },
    { id: 'kh', name: 'Cambodia', flag: '🇰🇭' },
    { id: 'id', name: 'Indonesia', flag: '🇮🇩' },
    { id: 'la', name: 'Laos', flag: '🇱🇦' },
    { id: 'my', name: 'Malaysia', flag: '🇲🇾' },
    { id: 'mm', name: 'Myanmar', flag: '🇲🇲' },
    { id: 'ph', name: 'Philippines', flag: '🇵🇭' },
    { id: 'sg', name: 'Singapore', flag: '🇸🇬' },
    { id: 'th', name: 'Thailand', flag: '🇹🇭' },
    { id: 'vn', name: 'Vietnam', flag: '🇻🇳' }
];

export const MOCK_USERS = [
    { id: 'u1', name: 'Budi Santoso', country: 'id', points: 1250, avatar: 'BS', password: 'password123' },
    { id: 'u2', name: 'Siti Nurhaliza', country: 'my', points: 980, avatar: 'SN', password: 'password123' },
    { id: 'u3', name: 'Somchai', country: 'th', points: 1540, avatar: 'SO', password: 'password123' },
    { id: 'u4', name: 'Maria Santos', country: 'ph', points: 1120, avatar: 'MS', password: 'password123' },
    { id: 'u5', name: 'Nguyen Van A', country: 'vn', points: 890, avatar: 'NV', password: 'password123' }
];

export const MOCK_LOGS = [
    {
        id: 'L1',
        userId: 'u1',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
        location: { lat: -6.2088, lng: 106.8456, name: 'Jakarta, Indonesia' },
        imageUrl: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&q=80&w=800',
        notes: 'Found this interesting plant near the river. Locals use it for medicine.',
        aiAnalysis: {
            species: 'Centella asiatica (Gotu Kola)',
            confidence: 0.94,
            health: 'Good',
            culturalContext: {
                'id': 'Dikenal sebagai Pegagan di Indonesia, sering digunakan sebagai jamu untuk melancarkan sirkulasi darah.',
                'my': 'Dikenal sebagai Pegaga di Malaysia, dimakan sebagai ulam.',
                'th': 'Called Bua Bok in Thailand, blended into a sweet green drink for health.',
                'en': 'Known as Gotu Kola, it is used in traditional medicine across Southeast Asia for healing and vitality.'
            }
        }
    },
    {
        id: 'L2',
        userId: 'u3',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        location: { lat: 13.7563, lng: 100.5018, name: 'Bangkok, Thailand' },
        imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800',
        notes: 'Lots of plastic waste in the canal today after the rain.',
        aiAnalysis: {
            category: 'Pollution Incident',
            severity: 'High',
            identifiedObjects: ['Plastic Bottles', 'Food Packaging', 'Styrofoam'],
            actionableInsight: 'Reported to local environmental agency. Community cleanup recommended.',
            culturalContext: {
                'en': 'Plastic pollution in urban waterways is a shared challenge in growing ASEAN megacities.',
                'th': 'มลพิษจากพลาสติกในคลองเป็นความท้าทายร่วมกันในเมืองใหญ่ของอาเซียนที่กำลังเติบโต'
            }
        }
    },
    {
        id: 'L3',
        userId: 'u4',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        location: { lat: 14.5995, lng: 120.9842, name: 'Manila, Philippines' },
        imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800',
        notes: 'Beautiful mahogany tree providing shade in the park.',
        aiAnalysis: {
            species: 'Swietenia macrophylla (Big-leaf Mahogany)',
            confidence: 0.88,
            health: 'Excellent',
            culturalContext: {
                'en': 'An introduced species often used for urban forestry in the Philippines due to its wide canopy.',
                'ph': 'Madalas itanim sa mga parke sa Pilipinas para magbigay ng lilim.'
            }
        }
    }
];

export const getLeaderboardData = () => {
    const countryScores = {};

    MOCK_USERS.forEach(user => {
        if (!countryScores[user.country]) {
            countryScores[user.country] = 0;
        }
        countryScores[user.country] += user.points;
    });

    return Object.entries(countryScores)
        .map(([countryId, score]) => {
            const country = ASEAN_COUNTRIES.find(c => c.id === countryId);
            return {
                id: countryId,
                name: country?.name || 'Unknown',
                flag: country?.flag || '🏳️',
                score
            };
        })
        .sort((a, b) => b.score - a.score);
};
