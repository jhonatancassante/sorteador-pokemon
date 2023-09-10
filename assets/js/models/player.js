import { constants } from "../constants/constants.js";
import { utils } from "../utils/utils.js";

export class Player {
    #nome;
    #pokemon;
    #pokemon2;

    constructor(nome) {
        this.#nome = nome.toLowerCase();
    }

    get nome() {
        return utils.priMaiuscula(this.#nome);
    }

    get pokemon() {
        return this.#pokemon;
    }

    get pokemon2() {
        return this.#pokemon2;
    }

    async pegarPokemon() {
        this.#pokemon = await this.acessarApi();
        this.#pokemon2 = await this.acessarApi();
    }

    async acessarApi() {
        const numero = utils.numeroAleatorio();

        try {
            const data = await fetch(constants.API_URL + numero, { method: 'GET' })
                .then(async response => {
                    const data = await response.json();
                    return data;
                });

            let id = data.id;
            let nome = utils.priMaiuscula(data.name);
            let url = data.sprites.other.dream_world.front_default ?? data.sprites.home.home.front_default;
            let types = [];

            for (const element of data.types) {
                types.push({ nome: utils.priMaiuscula(element.type.name), url: element.type.url, });
            }

            return { id, nome, url, types };
        } catch (error) {
            const newTry = await this.acessarApi();
            return newTry;
        }
    };
};