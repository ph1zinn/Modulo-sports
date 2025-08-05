function listarPartidasDoTorneio(rl, torneios, menu) {
    if (torneios.length === 0) {
        console.log('Nenhum torneio registrado.');
        console.log('\nPressione Enter para retornar ao menu...');
        return rl.question('', menu(rl));
    }

    console.log('\n=== TORNEIOS DISPONÍVEIS PARA CONSULTA ===');
    torneios.forEach((torneio, index) => {
        console.log(`${index + 1}. ID: ${torneio.id} | Nome: ${torneio.nome} | Jogo: ${torneio.jogo}`);
    });

    rl.question('\nDigite o ID do torneio para listar as partidas e classificação: ', (idInput) => {
        const idDoTorneio = parseInt(idInput, 10);
        const torneio = torneios.find(t => t.id === idDoTorneio);

        if (!torneio) {
            console.log(`Torneio com ID ${idInput} não encontrado.`);
            console.log('\nPressione Enter para retornar ao menu...');
            return rl.question('', menu(rl));
        }

        console.log(`\n--- PARTIDAS DO TORNEIO "${torneio.nome}" (ID: ${torneio.id}) ---`);
        if (torneio.partidas.length === 0) {
            console.log("Nenhuma partida registrada para este torneio.");
        } else {
            torneio.partidas.forEach((partida, index) => {
                console.log(`Partida ${index + 1}: ${partida.jogador1} vs ${partida.jogador2} | Vencedor: ${partida.vencedor} | Data/Hora: ${partida.timestamp}`);
            });
        }

        console.log(`\n--- CLASSIFICAÇÃO DO TORNEIO "${torneio.nome}" ---`);
        const pontuacoes = {};

        if (torneio.participantes && torneio.participantes.length > 0) {
             torneio.participantes.forEach(participante => pontuacoes[participante] = 0);
        } else {
            console.log("Nenhum participante registrado para este torneio, ou nenhum ponto foi marcado ainda.");
        }

        torneio.partidas.forEach(partida => {
            if (!pontuacoes.hasOwnProperty(partida.vencedor)) {
                pontuacoes[partida.vencedor] = 0;
            }
            pontuacoes[partida.vencedor]++;
        });

        const ranking = Object.entries(pontuacoes).sort(([, vitA], [, vitB]) => vitB - vitA);

        if (ranking.length === 0) {
            console.log("Nenhuma pontuação registrada ainda.");
        } else {
            ranking.forEach(([jogador, vitorias], index) => {
                console.log(`${index + 1}. ${jogador} - ${vitorias} vitória(as)`);
            });
        }

        console.log('\nPressione Enter para retornar ao menu...');
        rl.question('', () => menu(rl));
    });
}

module.exports = listarPartidasDoTorneio
