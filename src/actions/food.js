
function changeFood(value) {
    // Change the selected food
    teto.selectedFood = (teto.selectedFood + value + 3) % 3;

    // Update the header text color
    for (let i = 0; i < tetoElements.foodName.length; i++) tetoElements.foodName[i].style.color = "#808080";
    tetoElements.foodName[[1, 2, 0][teto.selectedFood]].style.color = "#ffffff";

    // Update the messages
    tetoElements.foodMessage[0].textContent = [
        `Heavy and savory food. Perfect for recovering after a long break, gaining energy and strength fast.`,
        `Light and healthy food. Perfect for casual eating and staying well.`,
        `Just a little sweet snack. Perfect for Teto in a silly mood. Don't expect much thought.`
    ][teto.selectedFood];
    // How much you own and the price
    tetoElements.foodMessage[1].textContent = [
        `• You own ${teto.inventory.meat} of this food. It costs $${teto.store.prices.meat}.`,
        `• You own ${teto.inventory.veggies} of this food. It costs $${teto.store.prices.veggies}.`,
        `• You own ${teto.inventory.sweets} of this food. It costs $${teto.store.prices.sweets}.`
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

function actionFoodCheck() {

}

function actionFood() {

}