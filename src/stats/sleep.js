
function actionSleepCheck() {
    // Effect - Slept Past 10 AM
    if (teto.action == "sleep" && teto.time.hours == 10 && teto.time.minutes == 0) {
        addEffect( "sleptPast10", [
                { stat: "happiness", difference: -0.01 }
            ], 480, "Teto slept past 10 AM"
        );
        actionSleep();
    };
    // Effect - Sleep reached 100%
    if (teto.action == "sleep" && teto.stats.sleep >= 100) {
        addEffect( "sleepFull", [
                { stat: "happiness", difference: -0.01 }
            ], 480, "Teto's sleep reached 100%"
        );
        actionSleep();
    };
    // Effect - Woke up hungry
    if (teto.action == "sleep" && teto.stats.hunger <= 20) {
        addEffect( "wokeUpHungry", [
                { stat: "happiness", difference: -0.01 }
            ], 480, "Teto woke up hungry"
        );
        actionSleep();
    };

    // Sleeping
    if (teto.action == "sleep") {
        actionButtonSleep.textContent = `Wake up`;
        actionButtonSleep.style.color = `#b0ffb0`;
        actionMessageSleep.textContent = `Sleeping (${formatTime(teto.sleepingTime)})`;
    }
    // On cooldown
    else if (teto.sleepCooldown > 0) {
        actionButtonSleep.textContent = `Disabled`;
        actionButtonSleep.style.color = `#ffb0b0`;
        actionMessageSleep.textContent = `Awake (Cooldown ${formatTime(teto.sleepCooldown)})`;
    }
    // Early (10:00-22:00)
    else if (teto.time.hours >= 4 && teto.time.hours < 22) {
        actionButtonSleep.textContent = `Disabled`;
        actionButtonSleep.style.color = `#ffb0b0`;
        actionMessageSleep.textContent = `Awake (Available ${getCountdownTo(22, 0)})`;
    }
    // Hungry
    else if (teto.stats.hunger <= 40) {
        actionButtonSleep.textContent = `Disabled`;
        actionButtonSleep.style.color = `#ffb0b0`;
        actionMessageSleep.textContent = `Awake (Too hungry)`;
    }
    // Busy
    else if (teto.action != "home") {
        actionButtonSleep.textContent = `Disabled`;
        actionButtonSleep.style.color = `#ffb0b0`;
        actionMessageSleep.textContent = `Awake (Busy)`;
    }
    // Ready
    else if (teto.action == "home") {
        actionButtonSleep.textContent = `Put to sleep`;
        actionButtonSleep.style.color = `#b0ffb0`;
        actionMessageSleep.textContent = `Awake (Ready)`;
    }
}

function actionSleep() {
    if (!teto.settings.started) return;
    else if (teto.settings.paused) {
        pauseFlash();
        return;
    }
    if (teto.action == "sleep") {
        // Add sleep cooldown
        teto.sleepCooldown = 240;
        // Effect - Slept too little
        if (teto.sleepingTime < 360) {
            addEffect( "sleptTooLittle", [
                    { stat: "happiness", difference: -0.01 },
                    { stat: "health", difference: -0.01 }
                ], 480, "Teto slept for less than 6 hours"
            );
        };
        // Effect - Slept 7:45-8:15
        if (teto.sleepingTime >= 465 && teto.sleepingTime <= 495) {
            addEffect( "sleptPerfectAmount", [
                    { stat: "health", difference: 0.01 }
                ], 480, "Teto's sleep lasted from 7 hours and 45 minutes to 8 hours and 15 minutes"
            );
        };
        // Update action
        teto.action = "home";
    }
    else if (teto.action == "home") {
        // Cancel if on sleep cooldown
        if (teto.sleepCooldown > 0) return;
        // Cancel between 04:00-22:00
        if (teto.time.hours >= 4 && teto.time.hours < 22) return;
        // Effect - Slept past midnight
        if (teto.time.hours >= 0 && teto.time.hours <= 4) {
            addEffect( "sleptPastMidnight", [
                    { stat: "health", difference: -0.01 }
                ], 480, "Teto went to sleep past midnight"
            );
        };
        // Effect - Slept foo fast
        if (teto.sleepingTime > -840) {
            addEffect( "sleptTooFast", [
                    { stat: "health", difference: -0.01 }
                ], 480, "Teto went to sleep after less than 14 hours"
            );
        };
        // Update action
        teto.action = "sleep"
    }
}