function filtrarTorneiosPorJogo(rl, torneios, menu) {
    if (torneios.length === 0) {
        console.log('Nenhum torneio registrado.');
        console.log('\nPressione Enter para retornar ao menu...');
        return rl.question('', menu(rl));
    }
    console.log('\n=== TORNEIOS DISPONÍVEIS PARA CONSULTA ===');
    torneios.forEach((torneio, index) => {
        console.log(`${index + 1}. ID: ${torneio.id} | Nome: ${torneio.nome} | Jogo: ${torneio.jogo}`);
    });

    rl.question('\nDigite o nome do jogo para filtrar os torneios: ', (nomeJogoBusca) => {
        if (nomeJogoBusca.trim() === '') {
            console.log('O nome do jogo não pode ser vazio.');
            console.log('\nPressione Enter para retornar ao menu...');
            return rl.question('', menu(rl));
        }

        const torneiosFiltrados = torneios.filter(torneio =>
            torneio.jogo.toLowerCase().includes(nomeJogoBusca.toLowerCase())
        );

        if (torneiosFiltrados.length === 0) {
            console.log(`Nenhum torneio encontrado para o jogo "${nomeJogoBusca}".`);
        } else {
            console.log(`\n--- TORNEIOS DE "${nomeJogoBusca}" ---`);
            torneiosFiltrados.forEach(torneio => {
                console.log(`ID: ${torneio.id}`);
                console.log(`Nome: ${torneio.nome}`);
                console.log(`Data: ${torneio.data}`);
                console.log(`Total de Participantes: ${torneio.participantes.length}`);
                console.log("-------------------------");
            });
        }

        console.log('\nPressione Enter para retornar ao menu...');
        rl.question('', () => menu(rl));
    });
}
module.exports = filtrarTorneiosPorJogo;

