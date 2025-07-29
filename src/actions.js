
function actionSleepCheck() {
    if (teto.action == "sleep" && teto.time.hours == 10 && teto.time.minutes == 0) actionSleep();
    if (teto.action == "sleep" && teto.stats.sleep >= 100) actionSleep();

    else if (teto.action == "sleep") {
        actionButtonSleep.textContent = `Wake up`;
        actionButtonSleep.style.color = `#b0ffb0`;
        actionMessageSleep.textContent = `Sleeping`;
    }
    else if (teto.action == "home") {
        actionButtonSleep.textContent = `Put to sleep`;
        actionButtonSleep.style.color = `#b0ffb0`;
        actionMessageSleep.textContent = `Awake`;
    }
    else if (teto.action != "home") {
        actionButtonSleep.textContent = `Disabled`;
        actionButtonSleep.style.color = `#b0ffb0`;
        actionMessageSleep.textContent = `Awake (Busy)`;
    }
}

function actionSleep() {
    console.log("AAAAAAAA");
    if (teto.action == "sleep") {
        teto.action = "home";
    }
    else if (teto.action == "home") {
        teto.action = "sleep"
    }
}