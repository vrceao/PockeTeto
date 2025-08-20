
//! Time management

function updateTime() {
    // Calculate time
    teto.time.minutes = Math.floor(teto.time.ticks / 60 - 60 * Math.floor(teto.time.ticks / 60 / 60));
    teto.time.hours = Math.floor(teto.time.ticks / 60 / 60 - 24 * Math.floor(teto.time.ticks / 60 / 60 / 24));
    teto.time.days = Math.floor(teto.time.ticks / 60 / 60 / 24);

    // Update time counter
    if (teto.time.minutes >= 10 && teto.time.hours >= 10) tetoTime.textContent = `Day ${teto.time.days} | ${teto.time.hours}:${teto.time.minutes} | ${teto.settings.difficultyText}`
    else if (teto.time.minutes <= 10 && teto.time.hours >= 10) tetoTime.textContent = `Day ${teto.time.days} | ${teto.time.hours}:0${teto.time.minutes} | ${teto.settings.difficultyText}`
    else if (teto.time.hours <= 10 && teto.time.minutes >= 10) tetoTime.textContent = `Day ${teto.time.days} | 0${teto.time.hours}:${teto.time.minutes} | ${teto.settings.difficultyText}`
    else tetoTime.textContent = `Day ${teto.time.days} | 0${teto.time.hours}:0${teto.time.minutes} | ${teto.settings.difficultyText}`
}

//! Formatting functions

// This function returns a string in a "HH:MM" format
function formatTime(minutes) {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

// Get a countdown to a certain time
function getCountdownTo(targetHour, targetMinute) {
    const currentTotalMinutes = teto.time.hours * 60 + teto.time.minutes;
    const targetTotalMinutes = targetHour * 60 + targetMinute;

    return `${formatTime(targetTotalMinutes - currentTotalMinutes)}`;
}

// Add a "+" if a alue is positive
function plus(value) {
    let formatted = value.toFixed(2);
    if (value >= 0) formatted = "+" + formatted;
    return formatted;
}

//! Tick

function nextTick() {
    // console.log(`[INFO TICK #${Math.floor((teto.time.ticks - teto.time.starting) / 60)}] Next tick has occured`, teto);

    updateTime();

    // Reset the tick difference
    teto.stats.tickDifference.health = 0;
    teto.stats.tickDifference.happiness = 0;
    teto.stats.tickDifference.sleep = 0;
    teto.stats.tickDifference.hunger = 0;

    teto.petCooldown--;

    if (teto.action != "sleep") {
        if (teto.sleepingTime > 0) teto.sleepingTime = 0;
        teto.sleepingTime--;
        // Lower the sleep cooldown every tick
        if (teto.sleepCooldown > 0) teto.sleepCooldown--;
    }
    if (teto.action == "sleep") {
        if (teto.sleepingTime < 0) teto.sleepingTime = 0;
        teto.sleepingTime++;
    }

    // Call action checks
    gameOver();
    actionPetCheck()
    actionSleepCheck();
    actionFoodCheck();
    updateFoodDetails();
    actionPukeCheck();
    if (teto.time.hours == 0 && teto.time.minutes == 0) restartPetStreak();

    // Update all stats and messages
    updateStats();
    updateMessages();

    // Update action
    teto.actionTime++;
    if (teto.previousAction != teto.action) teto.actionTime = 0;
    if (teto.action == "home") tetoAction.textContent = `Chilling (${formatTime(teto.actionTime)})`;
    else if (teto.action == "sleep") tetoAction.textContent = `Sleeping (${formatTime(teto.actionTime)})`;
    else if (teto.action == "food") tetoAction.textContent = `Eating (${formatTime(teto.actionTime)})`;
    else if (teto.action == "puke") tetoAction.textContent = `Puking (${formatTime(teto.actionTime)})`;
    else tetoAction.textContent = `Unknown action (${formatTime(teto.actionTime)})`;
    teto.previousAction = teto.action;

    // Change percentage color based on increase/decrease
    if (teto.settings.gameOverReason != "health") {
        if (teto.stats.tickDifference.health > 0) tetoHealth.style.color = "#b0ffb0";
        else if (teto.stats.tickDifference.health < 0) tetoHealth.style.color = "#ffb0b0";
        else tetoHealth.style.color = "";
    } else setInterval(() => { gameoverFlash() }, 1000);
    if (teto.settings.gameOverReason != "happiness") {
        if (teto.stats.tickDifference.happiness > 0) tetoHappiness.style.color = "#b0ffb0";
        else if (teto.stats.tickDifference.happiness < 0) tetoHappiness.style.color = "#ffb0b0";
        else tetoHappiness.style.color = "";
    } else setInterval(() => { gameoverFlash() }, 1000);
    if (teto.settings.gameOverReason != "sleep") {
        if (teto.stats.tickDifference.sleep > 0) tetoSleep.style.color = "#b0ffb0";
        else if (teto.stats.tickDifference.sleep < 0) tetoSleep.style.color = "#ffb0b0";
        else tetoSleep.style.color = "";
    } else setInterval(() => { gameoverFlash() }, 1000);
    if (teto.settings.gameOverReason != "hunger") {
        if (teto.stats.tickDifference.hunger > 0) tetoHunger.style.color = "#b0ffb0";
        else if (teto.stats.tickDifference.hunger < 0) tetoHunger.style.color = "#ffb0b0";
        else tetoHunger.style.color = "";
    } else setInterval(() => { gameoverFlash() }, 1000);

    // Update stats display
    let exclamation = ["", "", "", ""];
    // if (teto.settings.gameOver) exclamation[teto.stats.statKeys.indexOf(teto.settings.gameOverReason)] = "✱ ";
    tetoHealth.textContent = `${exclamation[0] + teto.stats.health.toFixed(2)}% Health (${plus(teto.stats.tickDifference.health)}%/t)`;
    tetoHappiness.textContent = `${exclamation[1] + teto.stats.happiness.toFixed(2)}% Happiness (${plus(teto.stats.tickDifference.happiness)}%/t)`;
    tetoSleep.textContent = `${exclamation[2] + teto.stats.sleep.toFixed(2)}% Sleep (${plus(teto.stats.tickDifference.sleep)}%/t)`;
    tetoHunger.textContent = `${exclamation[3] + teto.stats.hunger.toFixed(2)}% Hunger (${plus(teto.stats.tickDifference.hunger)}%/t)`;

    if (teto.settings.gameOver) return;
    // Update stats
    teto.stats.health += teto.stats.tickDifference.health;
    teto.stats.happiness += teto.stats.tickDifference.happiness;
    teto.stats.sleep += teto.stats.tickDifference.sleep;
    teto.stats.hunger += teto.stats.tickDifference.hunger;
}

//! Game over

function gameOver() {
    if (teto.stats.health <= 0 || teto.stats.happiness <= 0 || teto.stats.sleep <= 0 || teto.stats.hunger <= 0 || teto.stats.hunger > 150) {
        pause();
        console.log(`[INFO TICK #${Math.floor((teto.time.ticks - teto.time.starting) / 60)}] Game over`, teto);
        if (teto.stats.health <= 0) {
            teto.settings.started = false;
            teto.settings.gameOver = true;
            tetoPausedMessage.textContent = `Game over! Survived: ${(teto.time.ticks - teto.time.starting) / 60} Ticks.`;
            teto.settings.gameOverReason = "health";
            teto.stats.health = 0;
        }
        else if (teto.stats.happiness <= 0) {
            teto.settings.started = false;
            teto.settings.gameOver = true;
            tetoPausedMessage.textContent = `Game over! Survived: ${(teto.time.ticks - teto.time.starting) / 60} Ticks.`;
            teto.settings.gameOverReason = "happiness";
            teto.stats.happiness = 0;
            //! Teto overload
            teto.overload.active = true;
        }
        else if (teto.stats.sleep <= 0) {
            teto.settings.started = false;
            teto.settings.gameOver = true;
            tetoPausedMessage.textContent = `Game over! Survived: ${(teto.time.ticks - teto.time.starting) / 60} Ticks.`;
            teto.settings.gameOverReason = "sleep";
            teto.stats.sleep = 0;
        }
        else if (teto.stats.hunger <= 0) {
            teto.settings.started = false;
            teto.settings.gameOver = true;
            tetoPausedMessage.textContent = `Game over! Survived: ${(teto.time.ticks - teto.time.starting) / 60} Ticks.`;
            teto.settings.gameOverReason = "hunger";
            teto.stats.hunger = 0;
        }
        else if (teto.stats.hunger > 150) {
            teto.settings.started = false;
            teto.settings.gameOver = true;
            tetoPausedMessage.textContent = `Game over! Survived: ${(teto.time.ticks - teto.time.starting) / 60} Ticks.`;
            teto.settings.gameOverReason = "hunger";
            teto.stats.hunger = 150;
        }
    }
}

function gameoverFlash() {
    // I have no idea how to do all of these else if statements in one line, if anyone knows how please tell me how
    if (teto.settings.gameOverReason == "health") {
        tetoHealth.style.color = "#b0b0ff";
        tetoHealth.style.marginLeft = "8px";
    }
    else if (teto.settings.gameOverReason == "happiness") {
        tetoHappiness.style.color = "#b0b0ff";
        tetoHappiness.style.marginLeft = "8px";
    }
    else if (teto.settings.gameOverReason == "sleep") {
        tetoSleep.style.color = "#b0b0ff";
        tetoSleep.style.marginLeft = "8px";
    }
    else if (teto.settings.gameOverReason == "hunger") {
        tetoHunger.style.color = "#b0b0ff";
        tetoHunger.style.marginLeft = "8px";
    }

    setTimeout(() => {
        if (teto.settings.gameOverReason == "health") {
            tetoHealth.style.color = "#ffb0b0";
            tetoHealth.style.marginLeft = "0px";
        }
        else if (teto.settings.gameOverReason == "happiness") {
            tetoHappiness.style.color = "#ffb0b0";
            tetoHappiness.style.marginLeft = "0px";
        }
        else if (teto.settings.gameOverReason == "sleep") {
            tetoSleep.style.color = "#ffb0b0";
            tetoSleep.style.marginLeft = "0px";
        }
        else if (teto.settings.gameOverReason == "hunger") {
            tetoHunger.style.color = "#ffb0b0";
            tetoHunger.style.marginLeft = "0px";
        }
    }, 250);
}

//! Every frame

function frame() {
    // Cancel if game over
    if (teto.settings.gameOver) return;
    // Cancel if game not started
    if (!teto.settings.started) return;
    // Cancel if game paused
    if (teto.settings.paused) return;
    teto.time.ticks += teto.settings.difficulty;
    if (teto.time.ticks % 60 == 0) nextTick();
}