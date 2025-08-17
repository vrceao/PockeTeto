
// HTML Classes
const tetoElements = {
    statsButton: document.getElementsByClassName("statsButton"),
    tetoMessages: document.getElementsByClassName("tetoMessages"),

    foodName: document.getElementsByClassName("foodName"),
    foodMessage: document.getElementsByClassName("foodMessage")
}

// Main game object
let teto = {
    settings: {
        // Preferences
        fullscreenMode: false,
        // Selected menu and detail messages
        menu: null,
        messages: null,
        // Difficulty (easy = 1, normal = 2, hard = 3, insane = 5, expert = 10, lunatic = 20)
        difficulty: 2,
        difficultyText: "Normal (x2)",
        // Status
        started: false,
        paused: true,
        pauseMenu: false,
        tutorial: false,
        gameover: false,
        gameoverReason: ""
    },

    // Buffs and debuffs
    debuffs: {
        home: {
            didntPet: 0
        },
        sleep: {
            sleptPast10: 0,
            sleptLate: 0,
            sleepReached100: 0,
            sleptForTooLittle: 0,
            sleptTooQuick: 0
        },
        food: {
            sweetsDebuff: 0
        }
    },

    buffs: {
        home: {
            petStreak: 0
        },
        sleep: {
            SleptGoodAmount: 0
        },
        food: {
            meatBuff: 0,
            veggieBuff: 0,
            sweetsBuff: 480
        }
    },
    // Player inventory
    inventory: {
        meat: 1,
        veggies: 2,
        sweets: 1
    },
    // Store management
    store: {
        // Store prices
        prices: {
            meat: 11.99,
            veggies: 7.99,
            sweets: 3.99
        }
    },

    // Time to consume foods
    foodTime: {
        meat: 20,
        veggies: 12,
        sweets: 5
    },
    // Amount of hunger foods restore
    foodGain: {
        meat: 70,
        veggies: 50,
        sweets: 30
    },

    // Actions: home, game, sleep, food, alone, puke
    action: "home",
    previousAction: "home",
    actionTime: -1,

    sleepingTime: null,
    sleepCooldown: 0,

    selectedFood: 0,
    foodKeys: ["meat", "veggies", "sweets"],
    eatenFood: null,
    hungerGained: 0,
    eatingFinish: [null, null],

    petCooldown: 30,
    petStreak: 0,

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
        statKeys: ["health", "happiness", "sleep", "hunger"],

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
    },

    // Future gamemode "Teto Overload" inspired by Needy Streamer Overload
    overload: {
        active: false
    }
}