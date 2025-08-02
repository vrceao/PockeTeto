
//! Change your keybinds here
//! Capitalization of letters does matter, Do not add more rows to keybinds (Max 5 per function)

let keybinds = {
    //? Change the currently opened menu (Home/Game/Sleep/Food/Work)
    changeMenuUp: [
        "w",
        "ArrowUp",
        "",
        "",
        ""
    ],
    changeMenuDown: [
        "s",
        "ArrowDown",
        "",
        "",
        ""
    ],
    changeMenus: [
        "1",
        "2",
        "3",
        "4",
        "5"
    ],
    //? Change the currently opened messages (Home/Game/Sleep/Food)
    changeMessagesUp: [
        "W",
        "a",
        "ArrowLeft",
        "",
        ""
    ],
    changeMessagesDown: [
        "S",
        "d",
        "ArrowRight",
        "",
        ""
    ],
    changeMessages: [
        "!",
        "@",
        "#",
        "$",
        "%"
    ],
    //? Pausing the game
    pause: [
        "q",
        "Q",
        "",
        "",
        ""
    ],
    //? Opening the pause menu
    pauseMenu: [
        "e",
        "E",
        "",
        "",
        ""
    ],
    //? Opening the tutorial (Doesn't exist yet)
    tutorial: [
        "t",
        "T",
        "",
        "",
        ""
    ]
}

//! Change your preference settings here

let preferences = {
    //? Disable the context menu (Right click)
    disableContextMenu: false,
    //? Always enable fullscreen mode
    alwaysFullscreenMode: false,
    //? Default difficulty (Input the multiplier number [1, 2, 3, 5, 10, 20])
    defaultDifficulty: 2
}