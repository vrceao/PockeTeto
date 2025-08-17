
function actionPukeCheck() {
    if (teto.action == "home" && teto.stats.hunger > 100) {
        if (Math.random() * (teto.stats.hunger - 100) * 100 < (teto.stats.hunger - 100) / 10) actionPuke();
    }
}

function actionPuke() {
    teto.action = "puke";
}