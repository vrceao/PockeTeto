
function addStat(stat_, difference_, message_) {
    // Adding the difference
    if (stat_ == "health") teto.stats.tickDifference.health += difference_;
    else if (stat_ == "happiness") teto.stats.tickDifference.happiness += difference_;
    else if (stat_ == "sleep") teto.stats.tickDifference.sleep += difference_;
    else if (stat_ == "hunger") teto.stats.tickDifference.hunger += difference_;
    // Adding the message
    if (stat_ == "health") teto.stats.messages[0].push([`${message_} (${plus(difference_)}%/t)`, difference_]);
    else if (stat_ == "happiness") teto.stats.messages[1].push([`${message_} (${plus(difference_)}%/t)`, difference_]);
    else if (stat_ == "sleep") teto.stats.messages[2].push([`${message_} (${plus(difference_)}%/t)`, difference_]);
    else if (stat_ == "hunger") teto.stats.messages[3].push([`${message_} (${plus(difference_)}%/t)`, difference_]);
    // Handle food
    if (teto.action == "food") {
        teto.hungerGained += difference_;
        if (teto.hungerGained >= teto.foodGain[teto.eatenFood] - 1) {
            teto.action = "home"; teto.hungerGained = 0;
        }
    }
}

function updateStats() {
    //! Other

    // Puking
    if (teto.action == "puke") {
        addStat("health", -0.25, "Teto is puking");
        addStat("happiness", -1.00, "Teto is puking");
        addStat("food", -10.00, "Teto is puking");
    }

    // (Debuff) Decrease health & happiness if slept too little
    if (teto.debuffs.sleep.sleptForTooLittle > 0) {
        teto.debuffs.sleep.sleptForTooLittle--;
        addStat("health", -0.01, "Teto slept for less than 6 hours");
        addStat("happiness", -0.01, "Teto slept for less than 6 hours");
    }

    //! Health

    // (Buff) Increase health if slept 7:45-8:15
    if (teto.buffs.sleep.SleptGoodAmount > 0) {
        teto.buffs.sleep.SleptGoodAmount--;
        addStat("health", 0.01, "Teto's sleep lasted from 7 hours and 45 minutes to 8 hours and 15 minutes");
    }
    // Decrease health when hunger below 20%
    if (teto.stats.hunger <= 20 && teto.action != "sleep") {
        addStat("health", -0.03, "Teto's hunger is below 20%");
    }
    // Decrease health when sleep below 20%
    if (teto.stats.sleep <= 20 && teto.action != "sleep") {
        addStat("health", -0.03, "Teto's sleep is below 20%");
    }
    // Decrease health when hunger above 100%
    if (teto.stats.hunger > 100) {
        addStat("health", -0.03, "Teto's hunger is above 100%");
    }

    // (Buff) Increase health after eating veggies
    if (teto.buffs.food.veggies > 0) {
        teto.buffs.food.veggies--;
        addStat("health", 0.01, "Teto ate veggies");
    }
    // (Debuff) Decrease health if slept past midnight
    if (teto.debuffs.sleep.sleptLate > 0) {
        teto.debuffs.sleep.sleptLate--;
        addStat("health", -0.01, "Teto went to sleep past midnight");
    }
    // (Debuff) Decrease health if slept too quick
    if (teto.debuffs.sleep.sleptTooQuick > 0) {
        teto.debuffs.sleep.sleptTooQuick--;
        addStat("health", -0.01, "Teto went to sleep after less than 14 hours");
    }
    // (Debuff) Decrease health after eating sweets
    if (teto.debuffs.food.sweets > 0) {
        teto.debuffs.food.sweets--;
        addStat("health", -0.01, "Teto ate sweets");
    }

    //! Happiness

    // Increase happiness while Teto is not alone
    if (teto.action != "alone" && teto.action != "sleep") {
        addStat("happiness", 0.02, "Teto is happy with the player");
    }
    // Decrease happiness when hunger below 30%
    if (teto.stats.hunger <= 30 && teto.action != "sleep") {
        addStat("happiness", -0.03, "Teto's hunger is below 30%");
    }
    // Decrease happiness when sleep below 30%
    if (teto.stats.sleep <= 30 && teto.action != "sleep") {
        addStat("happiness", -0.03, "Teto's sleep is below 30%");
    }

    // (Buff) Increase happiness after eating sweets
    if (teto.buffs.food.sweets > 0) {
        teto.buffs.food.sweets--;
        addStat("happiness", 0.01, "Teto ate sweets");
    }
    // (Buff) Increase happiness after pet streak
    if (teto.buffs.home.petStreak > 0) {
        teto.buffs.home.petStreak--;
        addStat("happiness", 0.01, "Teto has been pet more than 5 times today");
    }
    // (Debuff) Decrease happiness if slept past 10 AM
    if (teto.debuffs.sleep.sleptPast10 > 0) {
        teto.debuffs.sleep.sleptPast10--;
        addStat("happiness", -0.01, "Teto slept past 10 AM");
    }
    // (Debuff) Decrease happiness if sleep reached 100%
    if (teto.debuffs.sleep.sleepReached100 > 0) {
        teto.debuffs.sleep.sleepReached100--;
        addStat("happiness", -0.01, "Teto's sleep reached 100%");
    }
    // (Debuff) Decrease happiness if didn't pet for 2 hours
    if (teto.debuffs.home.didntPet > 0) {
        teto.debuffs.home.didntPet--;
        addStat("happiness", -0.01, "Teto hasn't been pet for more than 2 hours");
    }

    //! Hunger

    // Nautral hunger decrease
    if (teto.action != "food" && teto.action != "sleep") {
        addStat("hunger", -0.15, "Natural decrease");
    }
    // Nautral hunger decrease during sleep
    if (teto.action != "food" && teto.action == "sleep") {
        addStat("hunger", -0.10, "Natural decrease while sleeping");
    }

    // Foods
    if (teto.action == "food") {
        // (Food) Meat
        if (teto.buffs.food.meat > 0) {
            teto.buffs.food.meat--;
            addStat("hunger", teto.foodGain["meat"] / teto.foodTime["meat"], `Teto is eating meat`);
        }

        // (Food) Veggies
        else if (teto.buffs.food.veggies > 0) {
            teto.buffs.food.veggies--;
            addStat("hunger", teto.foodGain["veggies"] / teto.foodTime["veggies"], `Teto is eating veggies`);
        }

        // (Food) Sweets
        else if (teto.buffs.food.sweets > 0) {
            teto.buffs.food.sweets--;
            addStat("hunger", teto.foodGain["sweets"] / teto.foodTime["sweets"], `Teto is eating sweets`);
        }
    }

    //! Sleep

    // Nautral sleep decrease
    if (teto.action != "sleep") {
        addStat("sleep", -0.05, "Natural decrease");
    }
    // Nautral sleep increase
    if (teto.action == "sleep") {
        addStat("sleep", 0.15, "Teto is sleeping");
    }

    // (Buff) Increase sleep after eating meat
    if (teto.buffs.food.meat > 0) {
        teto.buffs.food.meat--;
        addStat("sleep", 0.01, "Teto ate meat");
    }
}