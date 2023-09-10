import { criarPokeCard } from "../components/criarPokeCard.js";
import { criarDoubleCard } from "../components/criarDoubleCard.js";

export const imprimirPokeCard = (players) => {
    const place = document.getElementById('pokemon-card-place');
    const double = document.getElementById('input-double');

    double.value === 'fusao' ? place.classList.add('double') : place.classList.remove('double');

    place.innerHTML = '';

    for (let i = 0; i < players.length; i++) {
        place.innerHTML += double.value === 'fusao'
            ? criarDoubleCard(players[i], i + 1)
            : criarPokeCard(players[i], i + 1);
    }
};