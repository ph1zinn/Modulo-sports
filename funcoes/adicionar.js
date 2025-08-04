const menu = require("./menu");

function adicionarTorneio(rl, torneios, menu) {
    rl.question('Digite um número para o ID do torneio: ', (idInput) => {
        const id = parseInt(idInput, 10);
        if (isNaN(id) || idInput.trim() === '') {
            console.log("ID inválido. Por favor, digite um número.");
            return adicionarTorneio(rl, torneios, menu);
        }

        if (torneios.some(t => t.id === id)) {
            console.log(`Já existe um torneio com o ID ${id}. Por favor, escolha outro ID.`);
            return adicionarTorneio(rl, torneios, menu);
        }

        rl.question('Digite o nome do torneio: ', (nome) => {
            if (nome.trim() === '') {
                console.log('Nome do torneio não pode ser vazio. Por favor, tente novamente.');
                return adicionarTorneio(rl, torneios, menu);
            }
            rl.question('Digite o nome do jogo: ', (jogo) => {
                if (jogo.trim() === '') {
                    console.log('Nome do jogo não pode ser vazio. Por favor, tente novamente.');
                    return menu(rl);
                }
                rl.question('Digite a data do torneio (YYYY-MM-DD): ', (data) => {
                    if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) {
                        console.log('Formato de data inválido. Use YYYY-MM-DD.');
                        return adicionarTorneio(rl, torneios, menu);
                    }

                    const novoTorneio = {
                        id,
                        nome,
                        jogo,
                        data,
                        participantes: [],
                        partidas: [],
                        concluido: false
                    };
                    torneios.push(novoTorneio);
                    console.log(`\nTorneio "${novoTorneio.nome}" adicionado com sucesso!`);

                    coletarParticipantes(novoTorneio);
                });
            });
        });
    });
    function coletarParticipantes(torneioAtual) {
        rl.question(`\nAdicione um participante para o torneio "${torneioAtual.nome}" (digite 'parar' para finalizar): `, (nomeParticipante) => {
            if (nomeParticipante.toLowerCase().trim() === 'parar') {
                if (torneioAtual.participantes.length === 0) {
                    console.log('Nenhum participante adicionado. Por favor, adicione pelo menos um participante.');
                    return coletarParticipantes(torneioAtual);
                }
                console.log(`\nTotal de ${torneioAtual.participantes.length} participantes adicionados ao torneio "${torneioAtual.nome}".`);
                return menu(rl);
            }
    
            if (nomeParticipante.trim() === '') {
                console.log('Nome do participante não pode ser vazio. Tente novamente.');
                return coletarParticipantes(torneioAtual);
            }
    
            if (torneioAtual.participantes.includes(nomeParticipante.trim())) {
                console.log(`"${nomeParticipante.trim()}" já foi adicionado a este torneio.`);
                return coletarParticipantes(torneioAtual);
            }
    
            torneioAtual.participantes.push(nomeParticipante.trim());
            console.log(`"${nomeParticipante.trim()}" adicionado.`);
            coletarParticipantes(torneioAtual);
        });
    }
}

module.exports = adicionarTorneio;