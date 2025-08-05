
function actionPetCheck() {
    if (teto.petCooldown <= -120 && teto.action != "sleep") {
        teto.debuffs.home.didntPet = 480;
    }

    // On cooldown
    if (teto.petCooldown > 0) {
        actionButtonPet.textContent = `Disabled`;
        actionButtonPet.style.color = `#ffb0b0`;
        let hoursCooldown = Math.floor(teto.petCooldown / 60);
        let minutesCooldown = teto.petCooldown % 60;
        if (hoursCooldown < 10) hoursCooldown = "0" + hoursCooldown;
        if (minutesCooldown < 10) minutesCooldown = "0" + minutesCooldown;
        actionMessagePet.textContent = `(Cooldown ${hoursCooldown}:${minutesCooldown})`;
    }
    // Petable
    else if (teto.petCooldown <= 0) {
        actionButtonPet.textContent = `Pet Teto`;
        actionButtonPet.style.color = `#b0ffb0`;
        let hoursCooldown = Math.ceil(teto.petCooldown / 60) * -1;
        let minutesCooldown = teto.petCooldown % 60 * -1;
        if (hoursCooldown < 10) hoursCooldown = "0" + hoursCooldown;
        if (minutesCooldown < 10) minutesCooldown = "0" + minutesCooldown;
        actionMessagePet.textContent = `Ready (${hoursCooldown}:${minutesCooldown} Elapsed)`;
    }
}

function actionPet() {
    if (teto.petCooldown > 0) return;
    teto.petCooldown = 120;
}