
function actionPetCheck() {
    if (teto.petCooldown <= -120 && teto.action != "sleep") {
        addEffect( "forgotToPet", [
                { stat: "happiness", difference: -0.01 }
            ], 480, "Teto hasn't been pet for more than 2 hours"
        );
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

    teto.petStreak++;

    if (teto.petStreak >= 6) {
        addEffect( "petStreak", [
                { stat: "happiness", difference: 0.01 }
            ], 480, "Teto has been pet more than 5 times today"
        );
    }
}

function restartPetStreak() {
    teto.petStreak = 0;
}