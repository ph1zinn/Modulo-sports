const adicionarTorneio = require ('./adicionar');
const listarTorneios = require ('./listar');
const registrarPartida = require ('./registrar');
const listarPartidasDoTorneio = require ('./listarPartidas');
const filtrarTorneiosPorJogo = require ('./filtrar');
const removerTorneio = require ('./remover');

let torneios = [];

function menu(rl) {
    console.log('\n<<<GERENCIAMENTO-DE-TORNEIOS>>>');
    console.log('1. Adicionar Torneio.');
    console.log('2. Listar Torneios.');
    console.log('3. Registrar Partida.');
    console.log('4. Listar Partidas e Classificação de um Torneio.');
    console.log('5. Filtrar Torneios por Jogo.');
    console.log('6. Remover Torneio.');
    console.log('7. Sair do Programa de Torneios.');
    console.log('='.repeat(30));

    rl.question('Escolha uma opção: ', (opcao) => {
        switch (opcao) {
            case '1':
                adicionarTorneio(rl, torneios, menu);
                break;
            case '2':
                listarTorneios(rl, torneios, menu);
                break;
            case '3':
                registrarPartida(rl, torneios, menu);
                break;
            case '4':
                listarPartidasDoTorneio(rl, torneios, menu);
                break;
            case '5':
                filtrarTorneiosPorJogo(rl, torneios, menu);
                break;
            case '6':
                removerTorneio(rl, torneios, menu);
                break;
            case '7':
                rl.close();
                console.log('Obrigado por usar nosso Programa. Até mais!');
                break;
            default:
                console.log('Opção inválida. Tente Novamente.');
                menu(rl);
        }
    });
}

module.exports = menu;