function registrarPartida(rl, torneios, menu) {
    if (torneios.length === 0) {
        console.log('Nenhum torneio registrado para registrar partidas.');
        console.log('\nPressione Enter para retornar ao menu...');
        return rl.question('', menu(rl));
    }

    console.log('\n=== TORNEIOS DISPONÍVEIS PARA REGISTRAR PARTIDA ===');
    torneios.forEach((torneio, index) => {
        console.log(`${index + 1}. ID: ${torneio.id} | Nome: ${torneio.nome} | Jogo: ${torneio.jogo}`);
    });

    rl.question('\nDigite o ID do torneio que deseja registrar a partida: ', (idInput) => {
        const idDoTorneio = parseInt(idInput, 10);
        const torneio = torneios.find(t => t.id === idDoTorneio);

        if (!torneio) {
            console.log('Esse torneio não existe!');
            console.log('\nPressione Enter para retornar ao menu...');
            return rl.question('', menu(rl));
        }

        if (torneio.participantes.length < 2) {
            console.log(`Torneio "${torneio.nome}" precisa de pelo menos 2 participantes para registrar uma partida.`);
            console.log('\nPressione Enter para retornar ao menu...');
            return rl.question('', menu(rl));
        }

        coletarDadosPartida(rl, torneio, menu);
    });
}
function coletarDadosPartida(rl, torneio, menu) {
    console.log(`\nTorneio selecionado: ${torneio.nome}`);
    console.log('Participantes registrados: ' + torneio.participantes.join(', '));

    rl.question('Informe o nome do Jogador 1 (deve ser um participante): ', (jogador1) => {
        if (!torneio.participantes.includes(jogador1.trim())) {
            console.log(`"${jogador1.trim()}" não é um participante registrado neste torneio. Tente novamente.`);
            return coletarDadosPartida(rl, torneio, menu);
        }

        rl.question('Informe o nome do Jogador 2 (deve ser um participante, diferente do Jogador 1): ', (jogador2) => {
            if (!torneio.participantes.includes(jogador2.trim())) {
                console.log(`"${jogador2.trim()}" não é um participante registrado neste torneio. Tente novamente.`);
                return coletarDadosPartida(rl, torneio, menu);
            }
            if (jogador1.trim() === jogador2.trim()) {
                console.log('Jogador 1 e Jogador 2 não podem ser a mesma pessoa. Tente novamente.');
                return coletarDadosPartida(rl, torneio, menu);
            }

            rl.question('Informe o nome do vencedor: ', (vencedor) => {
                if (vencedor.trim() !== jogador1.trim() && vencedor.trim() !== jogador2.trim()) {
                    console.log('O vencedor deve ser um dos jogadores informados. Por favor, tente novamente.');
                    return coletarDadosPartida(rl, torneio, menu);
                }

                const partida = {
                    jogador1: jogador1.trim(),
                    jogador2: jogador2.trim(),
                    vencedor: vencedor.trim(),
                    timestamp: new Date().toLocaleString()
                };

                torneio.partidas.push(partida);

                console.log('\nPartida registrada com sucesso!');
                console.log(`Partida: ${partida.jogador1} vs ${partida.jogador2}`);
                console.log(`Vencedor: ${partida.vencedor}`);

                console.log('\nPressione Enter para voltar ao menu...');
                rl.question('', () => menu(rl));
            });
        });
    });
}

module.exports = registrarPartida;
