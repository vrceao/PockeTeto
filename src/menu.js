
//! Onload function that changes user preferences

onload = function() {
    // Update the strings in food
    changeFood(0);
    // Disable context menu
    if (preferences.disableContextMenu) {
        document.body.oncontextmenu = function() {
            return false;
        };
    }
    // Always fullscreen mode
    if (preferences.alwaysFullscreenMode) {
        fullscreenMode();
    }
    // Default difficulty
    let current = 2;
    for (let i = 0; i < [2, 3, 5, 10, 20, 1].length; i++) {
        if (current == preferences.defaultDifficulty) break;
        changeDifficulty();
        current = [2, 3, 5, 10, 20, 1][([2, 3, 5, 10, 20, 1].indexOf(current) + 1) % [2, 3, 5, 10, 20, 1].length];
    }
}

//! Switching Categories

const panel = document.getElementById("panel");
const home = document.getElementById("home");
const panelCategory = document.getElementsByClassName("panelCategory");
const sidebarTile = document.getElementsByClassName("sidebarTile")

function changeMenu(menu) {
    if (teto.settings.pauseMenu) pauseMenu();

    // Update the menu variable
    teto.settings.menu = menu;

    // Show home and panel in case menu is opened
    panel.style.display = "flex";
    home.style.display = "flex";

    // Default all categories and buttons
    for (let i = 0; i < panelCategory.length; i++) {
        panelCategory[i].style.display = `none`;
        sidebarTile[i].style.border = ``;
    }

    // Make the first change fade-in
    panel.style.opacity = "100%";

    // Only show one category and button effect
    panelCategory[menu].style.display = `flex`;
    sidebarTile[menu].style.border = `2px solid #b0b0ffff`;
}

//! Pause

function pause() {
    // Cancel if game over
    if (teto.settings.gameOver) return;
    // Cancel if menu is opened
    if (teto.settings.pauseMenu) return;

    if (teto.settings.paused) {
        if (!teto.settings.started) {
            if (teto.settings.menu == null) changeMenu(0);
            if (teto.settings.messages == null) showMessages(0);

            setInterval(() => {
                frame();
            }, 1000 * 1 / 60);

            nextTick();
            // Pause text
            tetoPausedMessage.textContent = "Game paused! Stats aren't updating.";
            // Details bar
            statsButtons.style.opacity = "100%";
            statsButtons.style.marginLeft = "0px";
            // Set variable
            teto.settings.started = true;
        }
        pauseSvg.src = "assets/svgs/pause.svg";
        pauseButton.style.border = "2px solid #ffffff00";
        teto.settings.paused = false;
        tetoPausedMessage.style.opacity = "0%";
        tetoPausedMessage.style.marginTop = "-40px";
        if (teto.settings.fullscreenMode) statsButtons.style.borderRadius = "0px 0px 8px 8px";
    } else {
        pauseSvg.src = "assets/svgs/unpause.svg";
        pauseButton.style.border = "2px solid #b0b0ffff";
        teto.settings.paused = true;
        tetoPausedMessage.style.opacity = "100%";
        tetoPausedMessage.style.marginTop = "8px";
        if (teto.settings.fullscreenMode) statsButtons.style.borderRadius = "8px 8px 8px 8px";
    }
}

function pauseFlash() {
    // this will notify the player when they try to do something when the game is paused and flash the element*
}

//! Menu

function pauseMenu() {
    if (teto.settings.paused == false) pause();
    else if (teto.settings.paused == false && teto.settings.pauseMenu == true) pause();

    if (teto.settings.pauseMenu) {
        menuSvg.src = "assets/svgs/menu.svg";
        menuButton.style.border = "2px solid #ffffff00";
        teto.settings.pauseMenu = false;
        pauseMenuElement.style.display = `none`;
        panel.style.display = "flex";
        home.style.display = "flex";
    } else {
        menuSvg.src = "assets/svgs/menu2.svg";
        menuButton.style.border = "2px solid #b0b0ffff";
        teto.settings.pauseMenu = true;
        pauseMenuElement.style.display = `flex`;
        // Default all buttons
        for (let i = 0; i < sidebarTile.length; i++) {
            sidebarTile[i].style.border = ``;
        }
        panel.style.display = "none";
        home.style.display = "none";
    }
}

//! Show messages

function showMessages(stat) {
    // Set the variable
    teto.settings.messages = stat;

    for (let i = 0; i < tetoElements.tetoMessages.length; i++) {
        tetoElements.tetoMessages[i].style.display = "none";
        tetoElements.statsButton[i].style.border = "";
    }

    tetoElements.tetoMessages[stat].style.display = "flex";
    tetoElements.statsButton[stat].style.border = `2px solid #b0b0ffff`;
}

//! Stat messages renderer

function updateDetails() {
    for (let i = 0; i < teto.stats.messages.length; i++) {
        tetoElements.tetoMessages[i].innerHTML = "";
        let statTypeText = document.createElement("p");
        statTypeText.style.fontSize = "24px";

        // Set correct types
        if (i == 0) tetoElements.tetoMessages[i].appendChild(statTypeText).textContent = `Health`;
        else if (i == 1) tetoElements.tetoMessages[i].appendChild(statTypeText).textContent = `Happiness`;
        else if (i == 2) tetoElements.tetoMessages[i].appendChild(statTypeText).textContent = `Sleep`;
        else tetoElements.tetoMessages[i].appendChild(statTypeText).textContent = `Hunger`;

        for (let j = 0; j < teto.stats.messages[i].length; j++) {
            let statText = document.createElement("p");
            tetoElements.tetoMessages[i].appendChild(statText).textContent = `-> ${teto.stats.messages[i][j][0]}`;
            if (teto.stats.messages[i][j][1] < 0) statText.style.color = "#ffb0b0";
            else if (teto.stats.messages[i][j][1] > 0) statText.style.color = "#b0ffb0";
        }

        // Create a default text if no messages
        if (tetoElements.tetoMessages[i].children.length == 1) {
            let emptyMessageText = document.createElement("p");
            emptyMessageText.style.color = "white";

            // Set correct empty messages
            if (i == 0) tetoElements.tetoMessages[i].appendChild(emptyMessageText).textContent = `-> Nothing affects Teto's Health right now (+0.00%/T)`;
            else if (i == 1) tetoElements.tetoMessages[i].appendChild(emptyMessageText).textContent = `-> Nothing affects Teto's Happiness right now (+0.00%/T)`;
            else if (i == 2) tetoElements.tetoMessages[i].appendChild(emptyMessageText).textContent = `-> Nothing affects Teto's Sleep right now (+0.00%/T)`;
            else tetoElements.tetoMessages[i].appendChild(emptyMessageText).textContent = `-> Nothing affects Teto's Hunger right now (+0.00%/T)`;
        }
    }

    // Reset teto messages variable
    for (let i = 0; i < teto.stats.messages.length; i++) {
        teto.stats.messages[i] = [];
    }
}

//! Fullscreen mode

function fullscreenMode() {
    if (!teto.settings.fullscreenMode) {
        teto.settings.fullscreenMode = true;
        // document.querySelector("body").style.backgroundImage = "url()";
        sidebar.style.borderRadius = "0px";
        panel.style.borderRadius = "0px";
        if (!teto.settings.paused) statsButtons.style.borderRadius = "0px 0px 8px 8px";
        pauseMenuElement.style.borderRadius = "0px";
        changeFullscreenButton.textContent = "On";
    } else {
        teto.settings.fullscreenMode = false;
        // document.querySelector("body").style.backgroundImage = "";
        sidebar.style.borderRadius = "";
        panel.style.borderRadius = "";
        statsButtons.style.borderRadius = "";
        pauseMenuElement.style.borderRadius = "";
        changeFullscreenButton.textContent = "Off";
    }
}

//! Difficulty

function changeDifficulty() {
    // Cancel if game over
    if (teto.settings.gameOver) return;
    // Cancel if started
    if (teto.settings.started) return;

    switch(teto.settings.difficulty) {
        case 1:
            teto.settings.difficulty = 2;
            teto.settings.difficultyText = "Normal (x2)";
            break
        case 2:
            teto.settings.difficulty = 3;
            teto.settings.difficultyText = "Hard (x3)";
            break
        case 3:
            teto.settings.difficulty = 5;
            teto.settings.difficultyText = "Insane (x5)";
            break
        case 5:
            teto.settings.difficulty = 10;
            teto.settings.difficultyText = "Expert (x10)";
            break
        case 10:
            teto.settings.difficulty = 20;
            teto.settings.difficultyText = "Lunatic (x20)";
            break
        case 20:
            teto.settings.difficulty = 1;
            teto.settings.difficultyText = "Easy (x1)";
            break
    }
    changeDifficultyButton.textContent = teto.settings.difficultyText;
}