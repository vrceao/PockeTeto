
function updateFoodDetails() {
    // Update the messages
    tetoElements.foodMessage[0].textContent = [
        `Heavy and savory food. Perfect for recovering after a long break, gaining energy and strength fast.`,
        `Light and healthy food. Perfect for casual eating and staying well.`,
        `Just a little sweet snack. Perfect for Teto in a silly mood. Don't expect much thought.`
    ][teto.selectedFood];
    // How much you own and the price
    tetoElements.foodMessage[1].textContent = [
        `• You own ${teto.inventory.meat} of this food.`,
        `• You own ${teto.inventory.veggies} of this food.`,
        `• You own ${teto.inventory.sweets} of this food.`
    ][teto.selectedFood];
    // Time to consume
    tetoElements.foodMessage[2].textContent = [
        `• This food will take Teto ${formatTime(teto.foodTime.meat)} to consume.`,
        `• This food will take Teto ${formatTime(teto.foodTime.veggies)} to consume.`,
        `• This food will take Teto ${formatTime(teto.foodTime.sweets)} to consume.`,
    ][teto.selectedFood];
    // Hunger stat
    tetoElements.foodMessage[3].textContent = [
        `• Teto gains +${teto.foodGain.meat.toFixed(1)}% hunger after eating this food.`,
        `• Teto gains +${teto.foodGain.veggies.toFixed(1)}% hunger after eating this food.`,
        `• Teto gains +${teto.foodGain.sweets.toFixed(1)}% hunger after eating this food.`
    ][teto.selectedFood];
    // Debuff
    tetoElements.foodMessage[4].textContent = [
        `• Eating this will give you a sleep buff.`,
        `• Eating this will give you a health buff.`,
        `• Eating this will give you a health debuff and a happiness buff.`,
    ][teto.selectedFood];
}

function changeFood(value) {
    // Change the selected food
    teto.selectedFood = (teto.selectedFood + value + 3) % 3;

    // Update the header text color
    for (let i = 0; i < tetoElements.foodName.length; i++) tetoElements.foodName[i].style.color = "#808080";
    tetoElements.foodName[[1, 2, 0][teto.selectedFood]].style.color = "#ffffff";

    updateFoodDetails();
    actionFoodCheck();
}

function actionFoodCheck() {
    // Cancel if game not started
    if (!teto.settings.started) return;
    // Eating
    if (teto.action == "food") {
        let finishHour = teto.time.hours;
        let finishMinute = teto.time.minutes + teto.foodTime[teto.eatenFood];

        finishHour = (finishHour + Math.floor(finishMinute / 60)) % 24;
        finishMinute = finishMinute % 60;
        actionButtonFood.textContent = `Disabled`;
        actionButtonFood.style.color = `#ffb0b0`;
        actionMessageFood.textContent = `Eating (Remaining ${getCountdownTo(teto.eatingFinish[0], teto.eatingFinish[1])})`;
    }
    // Late (00:00-06:00)
    else if (teto.time.hours >= 0 && teto.time.hours < 6) {
        actionButtonFood.textContent = `Disabled`;
        actionButtonFood.style.color = `#ffb0b0`;
        actionMessageFood.textContent = `Idle (Available ${getCountdownTo(6, 0)})`;
    }
    // No food
    else if (teto.inventory[teto.foodKeys[teto.selectedFood]] <= 0) {
        actionButtonFood.textContent = `Disabled`;
        actionButtonFood.style.color = `#ffb0b0`;
        actionMessageFood.textContent = `Idle (No food)`;
    }
    // Busy
    else if (teto.action != "home") {
        actionButtonFood.textContent = `Disabled`;
        actionButtonFood.style.color = `#ffb0b0`;
        actionMessageFood.textContent = `Idle (Busy)`;
    }
    // Ready
    else if (teto.action == "home") {
        actionButtonFood.textContent = `Feed`;
        actionButtonFood.style.color = `#b0ffb0`;
        actionMessageFood.textContent = `Idle (Ready)`;
    }
}

function actionFood() {
    if (teto.action == "food") return;
    else if (teto.action == "sleep") return;
    else if (teto.inventory[teto.foodKeys[teto.selectedFood]] <= 0) return;
    teto.action = "food";
    // Meat
    if (teto.selectedFood == 0) {
        if (teto.inventory.meat <= 0) return;
        teto.eatenFood = "meat";
        teto.inventory.meat--;
        teto.buffs.food.meat = 480;
    }
    // Veggies
    else if (teto.selectedFood == 1) {
        if (teto.inventory.veggies <= 0) return;
        teto.eatenFood = "veggies";
        teto.inventory.veggies--;
        teto.buffs.food.veggies = 480;
    }
    // Sweets
    else if (teto.selectedFood == 2) {
        if (teto.inventory.sweets <= 0) return;
        teto.eatenFood = "sweets";
        teto.inventory.sweets--;
        teto.buffs.food.sweets = 480;
        teto.debuffs.food.sweets = 480;
    }

    let finishHour = teto.time.hours;
    let finishMinute = teto.time.minutes + teto.foodTime[teto.eatenFood];
    finishHour = (finishHour + Math.floor(finishMinute / 60)) % 24;
    finishMinute = finishMinute % 60;
    teto.eatingFinish = [finishHour, finishMinute];
}