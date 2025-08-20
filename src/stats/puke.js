
function actionPukeCheck() {
    if (teto.action == "home" && teto.stats.hunger > 100) {
        // Random chance to puke based on current hunger
        // 110% - 0.1% every tick
        // 120% - 0.2% every tick
        // etc.
        if (Math.random() < (teto.stats.hunger - 100) / 10000) actionPuke();
    }
}

function actionPuke() {
    teto.action = "puke";
}