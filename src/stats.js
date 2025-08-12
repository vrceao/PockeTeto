
function updateStats() {
    let difference;

    //! Health & Happiness

    // (Debuff) Decrease health & happiness if slept too little
    if (teto.debuffs.sleep.sleptForTooLittle > 0) {
        teto.debuffs.sleep.sleptForTooLittle--;
        difference = -0.01;
        teto.stats.messages[0].push([`Teto woke up after less than 6 hours (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.health += difference;
        difference = -0.01;
        teto.stats.messages[1].push([`Teto woke up after less than 6 hours (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.happiness += difference;
    }

    //! Health

    // (Buff) Increase health if slept 7:45-8:15
    if (teto.buffs.sleep.SleptGoodAmount > 0) {
        teto.buffs.sleep.SleptGoodAmount--;
        difference = 0.01;
        teto.stats.messages[0].push([`Teto's sleep lasted from 7 hours and 45 minutes to 8 hours and 15 minutes (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.health += difference;
    }
    // Decrease health when hunger below 20%
    if (teto.stats.hunger <= 20 && teto.action != "sleep") {
        difference = -0.03;
        teto.stats.messages[0].push([`Teto is hungry (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.health += difference;
    }
    // Decrease health when sleep below 20%
    if (teto.stats.sleep <= 20 && teto.action != "sleep") {
        difference = -0.03;
        teto.stats.messages[0].push([`Teto is sleepy (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.health += difference;
    }
    // Decrease health when hunger above 100%
    if (teto.stats.hunger > 100) {
        difference = -0.03;
        teto.stats.messages[0].push([`Teto ate too much (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.health += difference;
    }

    // (Buff) Increase health after eating veggies
    if (teto.buffs.food.veggies > 0) {
        teto.buffs.food.veggies--;
        difference = 0.01;
        teto.stats.messages[0].push([`Teto ate veggies (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.health += difference;
    }
    // (Debuff) Decrease health if slept past midnight
    if (teto.debuffs.sleep.sleptLate > 0) {
        teto.debuffs.sleep.sleptLate--;
        difference = -0.01;
        teto.stats.messages[0].push([`Teto went to sleep past midnight (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.health += difference;
    }
    // (Debuff) Decrease health if slept too quick
    if (teto.debuffs.sleep.sleptTooQuick > 0) {
        teto.debuffs.sleep.sleptTooQuick--;
        difference = -0.01;
        teto.stats.messages[0].push([`Teto went to sleep after less than 14 hours (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.health += difference;
    }
    // (Debuff) Decrease health after eating sweets
    if (teto.debuffs.food.sweets > 0) {
        teto.debuffs.food.sweets--;
        difference = -0.01;
        teto.stats.messages[0].push([`Teto ate sweets (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.health += difference;
    }

    //! Happiness

    // Increase happiness while Teto is not alone
    if (teto.action != "alone" && teto.action != "sleep") {
        difference = 0.02;
        teto.stats.messages[1].push([`Teto is happy with the player (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.happiness += difference;
    }
    // Decrease happiness when hunger below 30%
    if (teto.stats.hunger <= 30 && teto.action != "sleep") {
        difference = -0.03;
        teto.stats.messages[1].push([`Teto is hungry (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.happiness += difference;
    }
    // Decrease happiness when sleep below 30%
    if (teto.stats.sleep <= 30 && teto.action != "sleep") {
        difference = -0.03;
        teto.stats.messages[1].push([`Teto is sleepy (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.happiness += difference;
    }

    // (Buff) Increase happiness after eating sweets
    if (teto.buffs.food.sweets > 0) {
        teto.buffs.food.sweets--;
        difference = 0.01;
        teto.stats.messages[0].push([`Teto ate sweets (${difference.toFixed(2)}%/t)`, difference]);
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
    // (Debuff) Decrease happiness if didn't pet for 2 hours
    if (teto.debuffs.home.didntPet > 0) {
        teto.debuffs.home.didntPet--;
        difference = -0.01;
        teto.stats.messages[1].push([`Teto hasn't been pet for 2 hours (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.happiness += difference;
    }

    //! Hunger

    // Nautral hunger decrease
    if (teto.action != "food" && teto.action != "sleep") {
        difference = -0.15;
        teto.stats.messages[3].push([`Natural decrease (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.hunger += difference;
    }
    // Nautral hunger decrease during sleep
    if (teto.action != "food" && teto.action == "sleep") {
        difference = -0.10;
        teto.stats.messages[3].push([`Natural decrease while sleeping (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.hunger += difference;
    }

    // (Food) Meat
    if (teto.action == "food") {
        let foodPerTick = Number((teto.foodGain[teto.eatenFood] / teto.foodTime[teto.eatenFood]).toFixed(2));
        difference = foodPerTick;
        teto.hungerGained += foodPerTick
        teto.stats.tickDifference.hunger += difference;

        if (teto.eatenFood == "meat") teto.stats.messages[3].push([`Teto is eating meat (${difference.toFixed(2)}%/t)`, difference]);
        else if (teto.eatenFood == "veggies") teto.stats.messages[3].push([`Teto is eating veggies (${difference.toFixed(2)}%/t)`, difference]);
        else if (teto.eatenFood == "sweets") teto.stats.messages[3].push([`Teto is eating sweets (${difference.toFixed(2)}%/t)`, difference]);

        if (teto.hungerGained >= teto.foodGain[teto.eatenFood]) {
            teto.action = "home";
            teto.hungerGained = 0;
        }
    }

    //! Sleep

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

    // (Buff) Increase sleep after eating meat
    if (teto.buffs.food.meat > 0) {
        teto.buffs.food.meat--;
        difference = 0.01;
        teto.stats.messages[2].push([`Teto ate meat (${difference.toFixed(2)}%/t)`, difference]);
        teto.stats.tickDifference.sleep += difference;
    }
}