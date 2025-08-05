
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

    //! Happiness

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
}