
function keyPressed() {
    switch (key) {
        case keybinds.changeMenus[0]:
            changeMenu(0);
            break;
        case keybinds.changeMenus[1]:
            changeMenu(1);
            break;
        case keybinds.changeMenus[2]:
            changeMenu(2);
            break;
        case keybinds.changeMenus[3]:
            changeMenu(3);
            break;
        case keybinds.changeMenus[4]:
            changeMenu(4);
            break;
        case keybinds.changeMessages[0]:
            changeMessages(0);
            break;
        case keybinds.changeMessages[1]:
            changeMessages(1);
            break;
        case keybinds.changeMessages[2]:
            changeMessages(2);
            break;
        case keybinds.changeMessages[3]:
            changeMessages(3);
            break;
        case keybinds.changeMenuUp[0]: case keybinds.changeMenuUp[1]: case keybinds.changeMenuUp[2]: case keybinds.changeMenuUp[3]: case keybinds.changeMenuUp[4]:
            if (!teto.settings.started) return;
            if (teto.settings.menu == 0) changeMenu(4);
            else changeMenu(teto.settings.menu - 1);
            break;
        case keybinds.changeMenuDown[0]: case keybinds.changeMenuDown[1]: case keybinds.changeMenuDown[2]: case keybinds.changeMenuDown[3]: case keybinds.changeMenuDown[4]:
            if (!teto.settings.started) return;
            if (teto.settings.menu == 4) changeMenu(0);
            else changeMenu(teto.settings.menu + 1);
            break;
        case keybinds.changeMessagesUp[0]: case keybinds.changeMessagesUp[1]: case keybinds.changeMessagesUp[2]: case keybinds.changeMessagesUp[3]: case keybinds.changeMessagesUp[4]:
            if (!teto.settings.started) return;
            if (teto.settings.messages == 0) showMessages(3);
            else showMessages(teto.settings.messages - 1);
            break;
        case keybinds.changeMessagesDown[0]: case keybinds.changeMessagesDown[1]: case keybinds.changeMessagesDown[2]: case keybinds.changeMessagesDown[3]: case keybinds.changeMessagesDown[4]:
            if (!teto.settings.started) return;
            if (teto.settings.messages == 3) showMessages(0);
            else showMessages(teto.settings.messages + 1);
            break;
        case keybinds.pause[0]: case keybinds.pause[1]: case keybinds.pause[2]: case keybinds.pause[3]: case keybinds.pause[4]:
            pause();
            break;
        case keybinds.pauseMenu[0]: case keybinds.pauseMenu[1]: case keybinds.pauseMenu[2]: case keybinds.pauseMenu[3]: case keybinds.pauseMenu[4]:
            pauseMenu();
            break;
        case keybinds.tutorial[0]: case keybinds.tutorial[1]: case keybinds.tutorial[2]: case keybinds.tutorial[3]: case keybinds.tutorial[4]:
            if (!teto.settings.paused) pause();
            console.log("Tutorial doesnt exist yet");
            break;
    }
}