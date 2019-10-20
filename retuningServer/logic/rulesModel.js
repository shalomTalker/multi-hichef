module.exports = (tuning) => {
    let {
        tuneIngredients = [],
        tuneAmount = 50,
        tuneTiming = 1000,
        tuneEquipment = [],
        missingEquipment,
        dislikes,
        levelPreparation
    } = tuning

    return {
        0: { key: "tuneAmount", value: tuneAmount + 5 },
        1: { key: "cookingTime", value: tuneTiming + 15 },
        2: {
            key: "missingEquipment",
            value: missingEquipment
                .concat(tuneEquipment
                    .filter(obj => obj.reason.includes('dont have'))
                    .map(obj => obj.tool))
        },
        3: {
            key: "dislikes",
            value: dislikes
                .concat(tuneIngredients
                    .filter(obj => obj.reason.includes('dont like'))
                    .map(obj => obj.ingredient))
        },
        4: { key: "levelPreparation", value: (levelPreparation === 'easy') ? 'medium' : {} }
    }
}