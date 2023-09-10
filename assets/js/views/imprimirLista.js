import { utils } from "../utils/utils.js";
import { excluirPlayer } from "../services/excluirPlayer.js";

export const imprimirLista = (players) => {
    const localLista = document.getElementById('names-list');

    localLista.innerHTML = '';

    players.forEach((player) => {
        let playerLi = document.createElement('li');
        let botaoExcluir = document.createElement('ion-icon');

        playerLi.innerHTML = `${utils.priMaiuscula(player.nome)}`;
        botaoExcluir.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';

        playerLi.id = `${player}-li`;
        botaoExcluir.id = player;

        botaoExcluir.name = 'trash-outline';
        botaoExcluir.onclick = () => {
            excluirPlayer(player, players);
            return false;
        };

        playerLi.appendChild(botaoExcluir);
        localLista.appendChild(playerLi);
    });
};