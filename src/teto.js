
// HTML Classes
const tetoElements = {
    statsButton: document.getElementsByClassName("statsButton"),
    tetoMessages: document.getElementsByClassName("tetoMessages")
}

// Main game object
let teto = {
    settings: {
        // Preferences
        fullscreenMode: false,
        // Selected menu and detail messages
        menu: 0,
        messages: 0,
        // Difficulty (easy = 1, normal = 2, hard = 3, insane = 5, expert = 10, lunatic = 20)
        difficulty: 2,
        difficultyText: "Normal (x2)",
        // Status
        started: false,
        paused: true,
        pauseMenu: false,
        gameover: false
    },
    // Actions: home, game, sleep, food, alone
    action: "home",
    // Time management
    time : {
        starting: 60 * 60 * 8 + 60 * 60 * 24,
        ticks: 60 * 60 * 8 + 60 * 60 * 24,
        minutes: null,
        hours: null,
        days: 1
    },
    // Stats management
    stats: {
        // Values in %
        health: 75,
        happiness: 50,
        sleep: 75,
        hunger: 50,
        // Difference of each stat at every tick (Resets every tick)
        tickDifference: {
            health: 0,
            happiness: 0,
            sleep: 0,
            hunger: 0,
        },
        // Stats messages
        messages: [
            health = [],
            happiness = [],
            sleep = [],
            hunger = []
        ]
    }
}