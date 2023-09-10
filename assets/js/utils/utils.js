import { constants } from "../constants/constants.js";

const numeroAleatorio = () => Math.floor(Math.random() * (constants.MAX_POKE - 1 + 1) + 1);

const priMaiuscula = (texto) => {
    let textoSeparado = texto.split(' ');

    for (let i = 0; i < textoSeparado.length; i++) {
        textoSeparado[i] = textoSeparado[i][0]
            ? textoSeparado[i][0].toUpperCase() + textoSeparado[i].slice(1)
            : textoSeparado.slice(i, 1);
    }

    return textoSeparado.join(' ');
};

const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
};

export const utils = {
    numeroAleatorio,
    priMaiuscula,
    shuffle,
};