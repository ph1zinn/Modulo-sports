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

        coletarDadosPartida(torneio);
    });
}
