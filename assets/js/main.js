import { verificarCampo } from "./utils/verificarCampo.js";
import { imprimirLista } from "./views/imprimirLista.js";
import { imprimirPokeCard } from "./views/imprimirPokeCard.js";
import { Player } from "./models/player.js";
import { utils } from "./utils/utils.js";

(() => {
    let players = [];

    function verificaLista(botao) {
        if (players.length < 1) {
            botao.disabled = true;
        } else {
            botao.disabled = false;
        }
    }

    async function sortearPokemon() {
        for (const player of players) {
            await player.pegarPokemon();
        }
    }

    async function main() {
        const campoNome = document.getElementById('input-name');
        const botaoAdicionar = document.getElementById('add-person');
        const botaoSortear = document.getElementById('catch-pokemon');
        const backUp = document.getElementById('back-up');

        verificaLista(botaoSortear);

        campoNome.addEventListener('input', () => {
            verificarCampo(campoNome, players, botaoAdicionar);
        });

        botaoAdicionar.addEventListener('click', (event) => {
            event.preventDefault();

            if (verificarCampo(campoNome, players, botaoAdicionar)) {
                players.push(new Player(campoNome.value.toLowerCase()));
                campoNome.value = '';
                campoNome.focus();
            }

            verificaLista(botaoSortear);

            imprimirLista(players);
        });

        botaoSortear.addEventListener('click', async () => {
            const loadingScreen = document.getElementById('loading-screen');

            loadingScreen.classList.add('active-black-screen');
            await sortearPokemon();
            utils.shuffle(players);
            imprimirPokeCard(players);
            loadingScreen.classList.remove('active-black-screen');
            document.getElementById('pokemon-grid').scrollIntoView();
        });

        backUp.addEventListener('click', () => {
            document.getElementById('players-list-view').scrollIntoView();
        })
    }

    main()
})();