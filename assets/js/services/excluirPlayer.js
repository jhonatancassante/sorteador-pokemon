import { imprimirLista } from "../views/imprimirLista.js";
import { imprimirPokeCard } from "../views/imprimirPokeCard.js";

export const excluirPlayer = (id, players) => {
    const index = players.indexOf(id);

    players.splice(index, 1);

    imprimirLista(players);
    imprimirPokeCard(players);
};