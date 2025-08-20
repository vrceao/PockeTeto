
class Effect {
    constructor(id, changes, duration, message) {
        this.id = id;
        this.changes = changes;
        this.duration = duration;
        this.message = message;
    }

    tick() {
        if (this.duration > 0) {
            this.duration--;
            for (let change of this.changes) {
                addStat(change.stat, change.difference, this.message);
            }
        }
    }
}

function addEffect(id, changes, duration, message) {
    if (!teto.effects.some(effect => effect.id === id)) {
        teto.effects.push(new Effect(id, changes, duration, message));
    }
}

function checkEffects() {
    teto.effects = teto.effects.filter(effect => {
        if (effect.duration > 0) {
            effect.duration--;

            if (effect.changes && Array.isArray(effect.changes)) {
                for (let change of effect.changes) {
                    addStat(change.stat, change.difference, effect.message);
                }
            }
        }

        return effect.duration > 0;
    });
}