
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

    // Reset the tick difference
    teto.stats.tickDifference.health = 0;
    teto.stats.tickDifference.happiness = 0;
    teto.stats.tickDifference.sleep = 0;
    teto.stats.tickDifference.hunger = 0;

    if (teto.action != "sleep") {
        if (teto.sleepingTime > 0) teto.sleepingTime = 0;
        teto.sleepingTime--;
    }
    if (teto.action == "sleep") {
        if (teto.sleepingTime < 0) teto.sleepingTime = 0;
        teto.sleepingTime++;
    }

    actionSleepCheck();

    let difference;

    // (Debuff) Decrease health & happiness if slept too little sleptForTooLittle
    if (teto.debuffs.sleep.sleptForTooLittle > 0) {
        teto.debuffs.sleep.sleptForTooLittle--;
        difference = -0.01;
        teto.stats.messages[0].push([`Woke up after less than 6 hours (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.health += difference;
        difference = -0.01;
        teto.stats.messages[1].push([`Woke up after less than 6 hours (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.happiness += difference;
    }

    // (Debuff) Decrease health if slept past midnight
    if (teto.debuffs.sleep.sleptLate > 0) {
        teto.debuffs.sleep.sleptLate--;
        difference = -0.01;
        teto.stats.messages[0].push([`Went to sleep past midnight (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.health += difference;
    }
    // (Debuff) Decrease health if slept too quick
    if (teto.debuffs.sleep.sleptTooQuick > 0) {
        teto.debuffs.sleep.sleptTooQuick--;
        difference = -0.01;
        teto.stats.messages[0].push([`Went to sleep after less than 14 hours (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.health += difference;
    }

    // Increase happiness while Teto is not alone
    if (teto.action != "alone" && teto.action != "sleep") {
        difference = 0.02;
        teto.stats.messages[1].push([`Teto is happy with the player (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.happiness += difference;
    }
    // (Debuff) Decrease happiness if slept past 10 AM
    if (teto.debuffs.sleep.sleptPast10 > 0) {
        teto.debuffs.sleep.sleptPast10--;
        difference = -0.01;
        teto.stats.messages[1].push([`Teto slept past 10 AM (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.happiness += difference;
    }
    // (Debuff) Decrease happiness if sleep reached 100%
    if (teto.debuffs.sleep.sleepReached100 > 0) {
        teto.debuffs.sleep.sleepReached100--;
        difference = -0.01;
        teto.stats.messages[1].push([`Sleep reached 100% (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.happiness += difference;
    }

    // Nautral food decrease
    if (teto.action != "food" && teto.action != "sleep") {
        difference = -0.15;
        teto.stats.messages[3].push([`Natural decrease (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.hunger += difference;
    }
    // Nautral food decrease (sleep)
    if (teto.action != "food" && teto.action == "sleep") {
        difference = -0.10;
        teto.stats.messages[3].push([`Natural decrease while sleeping (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.hunger += difference;
    }

    // Nautral sleep decrease
    if (teto.action != "sleep") {
        difference = -0.05;
        teto.stats.messages[2].push([`Natural decrease (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.sleep += difference;
    }
    // Nautral sleep increase
    if (teto.action == "sleep") {
        difference = 0.15;
        teto.stats.messages[2].push([`Teto is sleeping (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.sleep += difference;
    }

    // Change percentage color based on increase/decrease
    if (teto.stats.tickDifference.health > 0) tetoHealth.style.color = "#b0ffb0";
    else if (teto.stats.tickDifference.health < 0) tetoHealth.style.color = "#ffb0b0";
    else tetoHealth.style.color = "";
    if (teto.stats.tickDifference.happiness > 0) tetoHappiness.style.color = "#b0ffb0";
    else if (teto.stats.tickDifference.happiness < 0) tetoHappiness.style.color = "#ffb0b0";
    else tetoHappiness.style.color = "";
    if (teto.stats.tickDifference.sleep > 0) tetoSleep.style.color = "#b0ffb0";
    else if (teto.stats.tickDifference.sleep < 0) tetoSleep.style.color = "#ffb0b0";
    else tetoSleep.style.color = "";
    if (teto.stats.tickDifference.hunger > 0) tetoHunger.style.color = "#b0ffb0";
    else if (teto.stats.tickDifference.hunger < 0) tetoHunger.style.color = "#ffb0b0";
    else tetoHunger.style.color = "";

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