const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

async function roolDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandowBlock() {
    let random = Math.random();
    let result

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }

    return result;
}
async function espaco() {
    console.log("-----------------------------");
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(
        `${characterName}🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute
        }`);
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        //sortear o bloco
        let block = await getRandowBlock();
        console.log(`Bloco: ${block}\n`);

        //rolar o dado
        let diceResult1 = await roolDice();
        let diceResult2 = await roolDice();

        //habilidade
        let testSkill1 = 0;
        let testSkill2 = 0;

        if (block === "RETA") {
            testSkill1 = diceResult1 + character1.VELOCIDADE;
            testSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(
                character1.NOME,
                "velocidade",
                diceResult1,
                character1.VELOCIDADE
            );
            await logRollResult(
                character2.NOME,
                "velocidade",
                diceResult2,
                character2.VELOCIDADE
            );
            await espaco();
        }
        if (block === "CURVA") {
            testSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            testSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(
                character1.NOME,
                "MANOBRABILIDADE",
                diceResult1,
                character1.MANOBRABILIDADE
            );
            await logRollResult(
                character2.NOME,
                "MANOBRABILIDADE",
                diceResult2,
                character2.MANOBRABILIDADE
            );
            await espaco();
        }

        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            await logRollResult(
                character1.NOME,
                "PODER",
                diceResult1,
                character1.PODER
            );
            await logRollResult(
                character2.NOME,
                "PODER",
                diceResult2,
                character2.PODER
            );
            if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto! 🐢`);
                character2.PONTOS--;

            } else if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto! 🐢`);
                character1.PONTOS--;

            } else {
                console.log("Empate! Ninguém perdeu ponto");
            }
            await espaco();

            //verifica quem, entre os dois, tem o maior poder
            if (powerResult1 > powerResult2) {
                console.log(`${character1.NOME} venceu o confronto!`);
                character1.PONTOS++;

            } else if (powerResult2 > powerResult1) {
                console.log(`${character2.NOME} venceu o confronto!`);
                character2.PONTOS++;
            }
            await espaco();
        }
    }
}

async function declareWinner(character1, character2) {
    console.log("\nResultado final:");
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

    if (character1.PONTOS > character2.PONTOS) {
        console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);

    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);

    } else console.log("A corrida terminou em empate");
}

(async function main() {
    console.log(
        `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
    );

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();