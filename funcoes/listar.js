function listarTorneios(menu, rl, torneios) {
    if (torneios.length === 0) {
        console.log('Não há torneios de E-Sports cadastrados.');
    } else {
        console.log(`\n=== TORNEIOS DE E-SPORTS CADASTRADOS ===`);
        torneios.forEach((torneio, index) => {
            const status = torneio.concluido ? 'Concluído' : 'Pendente';
            const totalParticipantes = torneio.participantes ? torneio.participantes.length : 0;
            console.log(
                `${index + 1}. ID: ${torneio.id} | Nome: ${torneio.nome} | Jogo: ${torneio.jogo} | Status: ${status} \n` +
                `   Data: ${torneio.data} | Total de Participantes: ${totalParticipantes}`
            );
        });
    }

    console.log('\nPressione Enter para retornar ao menu anterior.');
    rl.question('', () => menu(rl));
}

module.exports = listarTorneios