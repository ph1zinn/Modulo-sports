function removerTorneio(rl, torneios, menu) {
    if (torneios.length === 0) {
        console.log('Nenhum torneio registrado para remover.');
        console.log('\nPressione Enter para retornar ao menu...');
        return rl.question('', menu(rl));
    }
  
    console.log('\n=== TORNEIOS DISPONÍVEIS PARA REMOÇÃO ===');
    torneios.forEach((torneio, index) => {
        console.log(`${index + 1}. ID: ${torneio.id} | Nome: ${torneio.nome} | Jogo: ${torneio.jogo} | Data: ${torneio.data}`);
    });
  
    rl.question('\nDigite o ID do torneio que deseja apagar: ', (idParaRemover) => {
        const idNumerico = parseInt(idParaRemover, 10);
  
        const index = torneios.findIndex(torneio => torneio.id === idNumerico);
        if (index !== -1) {
            const [removido] = torneios.splice(index, 1);
            console.log(`Torneio "${removido.nome}" (ID: ${removido.id}) foi removido com sucesso!`);
        } else {
            console.log('ID do torneio inválido ou não encontrado!');
        }
  
        console.log('\nPressione Enter para voltar ao menu...');
        rl.question('', menu(rl));
    });
  }
  
  
  module.exports = removerTorneio;
