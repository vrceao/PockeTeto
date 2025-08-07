
function actionSleepCheck() {
    // Debuff sleep past 10 AM
    if (teto.action == "sleep" && teto.time.hours == 10 && teto.time.minutes == 0) {
        teto.debuffs.sleep.sleptPast10 = 480;
        actionSleep();
    };
    // Debuff sleep reached 100%
    if (teto.action == "sleep" && teto.stats.sleep >= 100) {
        teto.debuffs.sleep.sleepReached100 = 480;
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
    if (teto.action == "sleep") {
        // Add sleep cooldown
        teto.sleepCooldown = 240;
        // Debuff slept too little
        if (teto.sleepingTime < 360) teto.debuffs.sleep.sleptForTooLittle = 480;
        // Buff slept 7:45-8:15
        if (teto.sleepingTime >= 465 && teto.sleepingTime <= 495) teto.buffs.sleep.SleptGoodAmount = 480;
        // Update action
        teto.action = "home";
    }
    else if (teto.action == "home") {
        // Cancel if on sleep cooldown
        if (teto.sleepCooldown > 0) return;
        // Cancel between 04:00-22:00
        if (teto.time.hours >= 4 && teto.time.hours < 22) return;
        // Debuff between 00:00-4:00
        if (teto.time.hours >= 0 && teto.time.hours <= 4) teto.debuffs.sleep.sleptLate = 480;
        // Debuff slept too quick
        if (teto.sleepingTime > -840) teto.debuffs.sleep.sleptTooQuick = 480;
        // Update action
        teto.action = "sleep"
    }
}