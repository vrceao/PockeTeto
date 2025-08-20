
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
    checkEffects();

    // Puking
    if (teto.action == "puke") {
        addStat("health", -0.25, "Teto is puking");
        addStat("happiness", -1.00, "Teto is puking");
        addStat("hunger", -10.00, "Teto is puking");
        if (teto.stats.hunger < 50) {
            teto.action = "home";
            addEffect( "disgustedAfterPuke", [
                    { stat: "happiness", difference: -0.03 }
                ], 480, "Teto feels disgusted after puking"
            );
        }
    }

    //! Health

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

    //! Hunger

    // Nautral hunger decrease
    if (teto.action != "food" && teto.action != "sleep") {
        addStat("hunger", -0.15, "Natural decrease");
    }
    // Nautral hunger decrease during sleep
    if (teto.action != "food" && teto.action == "sleep") {
        addStat("hunger", -0.10, "Natural decrease while sleeping");
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
}