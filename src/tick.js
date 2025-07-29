
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

function nextTick() {
    // console.log(`[INFO TICK #${Math.floor((teto.time.ticks - teto.time.starting) / 60)}] Next tick has occured`, teto);

    updateTime();

    actionSleepCheck();

    // Reset the tick difference
    teto.stats.tickDifference.health = 0;
    teto.stats.tickDifference.happiness = 0;
    teto.stats.tickDifference.sleep = 0;
    teto.stats.tickDifference.hunger = 0;

    // Increase happiness while Teto is not alone
    if (teto.action != "alone" && teto.action != "sleep") {
        let difference = 0.02;
        teto.stats.messages[1].push([`Teto is happy with the player (${difference}%/t)`, difference]);
        teto.stats.tickDifference.happiness += difference;
    }

    // Nautral food decrease
    if (teto.action != "food" && teto.action != "sleep") {
        let difference = -0.15;
        teto.stats.messages[3].push([`Natural decrease (${difference}%/t)`, difference]);
        teto.stats.tickDifference.hunger += difference;
    }
    // Nautral food decrease (sleep)
    if (teto.action != "food" && teto.action == "sleep") {
        let difference = -0.10;
        teto.stats.messages[3].push([`Natural decrease while sleeping (${difference}%/t)`, difference]);
        teto.stats.tickDifference.hunger += difference;
    }

    // Nautral sleep decrease
    if (teto.action != "sleep") {
        let difference = -0.05;
        teto.stats.messages[2].push([`Natural decrease (${difference}%/t)`, difference]);
        teto.stats.tickDifference.sleep += difference;
    }
    // Nautral sleep increase
    if (teto.action == "sleep") {
        let difference = 0.15;
        teto.stats.messages[2].push([`Teto is sleeping (${difference}%/t)`, difference]);
        teto.stats.tickDifference.sleep += difference;
    }

    // Change percentage color based on increase/decrease
    if (teto.stats.tickDifference.health > 0) tetoHealth.style.color = "#b0ffb0";
    else if (teto.stats.tickDifference.health < 0) tetoHealth.style.color = "#ffb0b0";
    if (teto.stats.tickDifference.happiness > 0) tetoHappiness.style.color = "#b0ffb0";
    else if (teto.stats.tickDifference.happiness < 0) tetoHappiness.style.color = "#ffb0b0";
    if (teto.stats.tickDifference.sleep > 0) tetoSleep.style.color = "#b0ffb0";
    else if (teto.stats.tickDifference.sleep < 0) tetoSleep.style.color = "#ffb0b0";
    if (teto.stats.tickDifference.hunger > 0) tetoHunger.style.color = "#b0ffb0";
    else if (teto.stats.tickDifference.hunger < 0) tetoHunger.style.color = "#ffb0b0";

    // Update stats
    teto.stats.health += teto.stats.tickDifference.health;
    teto.stats.happiness += teto.stats.tickDifference.happiness;
    teto.stats.sleep += teto.stats.tickDifference.sleep;
    teto.stats.hunger += teto.stats.tickDifference.hunger;

    // Cap the stats on certain values
    if (teto.stats.health >= 100) teto.stats.health = 100;
    if (teto.stats.happiness >= 100) teto.stats.happiness = 100;
    if (teto.stats.sleep >= 100) teto.stats.sleep = 100;
    if (teto.stats.hunger >= 150) teto.stats.hunger = 150;

    // Update stats display

    if (teto.stats.tickDifference.health >= 0) tetoHealth.textContent = `${teto.stats.health.toFixed(1)}% Health (+${teto.stats.tickDifference.health.toFixed(2).toString()}%/t)`;
    else tetoHealth.textContent = `${teto.stats.health.toFixed(1)}% Health (${teto.stats.tickDifference.health.toFixed(2).toString()}%/t)`;
    if (teto.stats.tickDifference.happiness >= 0) tetoHappiness.textContent = `${teto.stats.happiness.toFixed(1)}% Happiness (+${teto.stats.tickDifference.happiness.toFixed(2).toString()}%/t)`;
    else tetoHappiness.textContent = `${teto.stats.happiness.toFixed(1)}% Happiness (${teto.stats.tickDifference.happiness.toFixed(2).toString()}%/t)`;
    if (teto.stats.tickDifference.sleep >= 0) tetoSleep.textContent = `${teto.stats.sleep.toFixed(1)}% Sleep (+${teto.stats.tickDifference.sleep.toFixed(2).toString()}%/t)`;
    else tetoSleep.textContent = `${teto.stats.sleep.toFixed(1)}% Sleep (${teto.stats.tickDifference.sleep.toFixed(2).toString()}%/t)`;
    if (teto.stats.tickDifference.hunger >= 0) tetoHunger.textContent = `${teto.stats.hunger.toFixed(1)}% Hunger (+${teto.stats.tickDifference.hunger.toFixed(2).toString()}%/t)`;
    else tetoHunger.textContent = `${teto.stats.hunger.toFixed(1)}% Hunger (${teto.stats.tickDifference.hunger.toFixed(2).toString()}%/t)`;

    updateDetails();
}

function gameOver() {
    console.log(`[INFO TICK #${Math.floor((teto.time.ticks - teto.time.starting) / 60)}] Game over`, teto);

    pause();
    teto.settings.started = false;
    teto.settings.gameOver = true;
    tetoPausedMessage.textContent = `Game over! Survived: ${(teto.time.ticks - teto.time.starting) / 60} Ticks`;
}

function frame() {
    // Cancel if game over
    if (teto.settings.gameOver) return;
    // Cancel if game not started
    if (!teto.settings.started) return;
    // Cancel if game paused
    if (teto.settings.paused) return;
    teto.time.ticks += teto.settings.difficulty;
    if (teto.time.ticks % 60 == 0) nextTick();
    if (teto.stats.health <= 0 || teto.stats.happiness <= 0 || teto.stats.sleep <= 0 || teto.stats.hunger <= 0 || teto.stats.hunger == 150) gameOver();
}