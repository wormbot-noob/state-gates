// --- INITIAL STATE ---
let userProfile = {
    name: "Abeer",
    tokens: {
        leanBody: 5,      // LBT: Decays every 7 days
        sleepReservoir: 3, // SQT: Decays every 48 hours
        emotionalGarden: 1 // EHT: Never decays, just goes dormant
    },
    lastUpdated: Date.now()
};

// --- THE STATE GATE LOGIC ---
const states = {
    BODY: {
        RED: { label: "Depleted", allowed: ["Recovery"] },
        YELLOW: { label: "Maintaining", allowed: ["Recovery", "Maintenance"] },
        GREEN: { label: "Capable", allowed: ["Recovery", "Maintenance", "Growth"] },
        GOLD: { label: "Primed", allowed: ["Growth", "Performance"] }
    }
    // ... Repeat for Sleep, Nutrition, Emotional
};
const TACTIC_LIBRARY = [
    // BODY
    { id: 1, category: 'BODY', tier: 'RED', name: 'Toe Yoga', icon: 'footprints', bonus: 'LBT' },
    { id: 2, category: 'BODY', tier: 'YELLOW', name: 'Zone 2 Talk-Test', icon: 'mic', bonus: 'LBT' },
    { id: 3, category: 'BODY', tier: 'GREEN', name: 'Farmer’s Carry', icon: 'dumbbell', bonus: 'LBT' },
    { id: 4, category: 'BODY', tier: 'GOLD', name: 'Heathrow Sprint', icon: 'timer', bonus: 'LBT' },
    // SLEEP
    { id: 5, category: 'SLEEP', tier: 'RED', name: 'Dark Sanctuary', icon: 'moon', bonus: 'SQT' },
    { id: 6, category: 'SLEEP', tier: 'YELLOW', name: 'Wake-Time Anchor', icon: 'anchor', bonus: 'SQT' },
    { id: 7, category: 'SLEEP', tier: 'GREEN', name: '3-Hour Buffer', icon: 'utensils-crossed', bonus: 'SQT' },
    { id: 8, category: 'SLEEP', tier: 'GOLD', name: 'Digital Sunset', icon: 'sunset', bonus: 'SQT' },
    // NUTRITION
    { id: 9, category: 'NUTRITION', tier: 'RED', name: 'Fiber Buffer', icon: 'leaf', bonus: 'LBT' },
    { id: 10, category: 'NUTRITION', tier: 'YELLOW', name: 'Protein Pulse', icon: 'beef', bonus: 'LBT' },
    { id: 11, category: 'NUTRITION', tier: 'GREEN', name: '1g/lb Target', icon: 'scale', bonus: 'LBT' },
    { id: 12, category: 'NUTRITION', tier: 'GOLD', name: 'SAD Escape', icon: 'shield-check', bonus: 'LBT' },
    // EMOTIONAL
    { id: 13, category: 'EMOTIONAL', tier: 'RED', name: '4-7-8 Reset', icon: 'wind', bonus: 'EHT' },
    { id: 14, category: 'EMOTIONAL', tier: 'YELLOW', name: 'Patient Reframe', icon: 'brain', bonus: 'EHT' },
    { id: 15, category: 'EMOTIONAL', tier: 'GREEN', name: 'Eulogy Virtue', icon: 'heart', bonus: 'EHT' },
    { id: 16, category: 'EMOTIONAL', tier: 'GOLD', name: 'Radical Vulnerability', icon: 'unlock', bonus: 'EHT' }
];
// --- THE DECAY LOGIC (Medicine 3.0 Physics) ---
function applyBiologicalDecay() {
    const now = Date.now();
    const daysPassed = Math.floor((now - userProfile.lastUpdated) / (1000 * 60 * 60 * 24));

    if (daysPassed >= 7) {
        userProfile.tokens.leanBody -= Math.floor(daysPassed / 7);
        if (userProfile.tokens.leanBody < 0) userProfile.tokens.leanBody = 0;
        console.log("Biological drift detected: LBT updated.");
    }
    // Update timestamp
    userProfile.lastUpdated = now;
    saveData();
}

function saveData() {
    localStorage.setItem('abeerGameData', JSON.stringify(userProfile));
}