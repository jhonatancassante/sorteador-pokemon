(() => {
    const MAX_POKE = 1010
    const API_URL = 'https://pokeapi.co/api/v2/pokemon/'
    const players = [];
    let pokemonsSorteados = [];

    const numeroAleatorio = () => Math.floor(Math.random() * (MAX_POKE - 1 + 1) + 1);

    const priMaiuscula = (texto) => {
        let textoSeparado = texto.split(' ');

        for (let i = 0; i < textoSeparado.length; i++) {
            textoSeparado[i] = textoSeparado[i][0].toUpperCase() + textoSeparado[i].slice(1);
        }

        return textoSeparado.join(' ');
    };

    async function pegarPokemon() {
        const numero = numeroAleatorio();

        try {
            const response = await fetch(API_URL + numero, { method: 'GET' });
            const data = await response.json();

            let id = data.id;
            let nome = priMaiuscula(data.name);
            let url = data.sprites.other.dream_world.front_default ?? data.sprites.home.home.front_default;
            let types = [];

            for (const element of data.types) {
                types.push({ nome: priMaiuscula(element.type.name), url: element.type.url, });
            }

            return { id, nome, url, types };
        } catch (error) {
            return pegarPokemon();
        }
    }

    function verificarCampo(campo, botao) {
        const mensagem = document.getElementById('message');

        if (players.includes(campo.value.toLowerCase())) {
            campo.classList.add('input-error');
            botao.disabled = true;
            mensagem.innerHTML = 'Jogador já cadastrado!';
            return false;
        } else {
            campo.classList.remove('input-error');
            botao.disabled = false;
            mensagem.innerHTML = "";
            return true;
        }
    }

    function excluirPlayer(id) {
        const index = players.indexOf(id);

        players.splice(index, 1);
        pokemonsSorteados.splice(index, 1);

        imprimirLista();
        imprimirPokeCard(pokemonsSorteados);
    }

    function imprimirLista() {
        const localLista = document.getElementById('names-list');

        localLista.innerHTML = '';

        players.forEach((player) => {
            let playerLi = document.createElement('li');
            let botaoExcluir = document.createElement('ion-icon');

            playerLi.innerHTML = `${priMaiuscula(player)}`;
            botaoExcluir.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';

            playerLi.id = `${player}-li`;
            botaoExcluir.id = player;

            botaoExcluir.name = 'trash-outline';
            botaoExcluir.onclick = () => {
                excluirPlayer(player);
                return false;
            };

            playerLi.appendChild(botaoExcluir);
            localLista.appendChild(playerLi);
        });
    }

    function verificaLista(botao) {
        if (players.length <= 1) {
            botao.disabled = true;
        } else {
            botao.disabled = false;
        }
    }

    async function sortearPokemon() {
        const todosPokemon = [];

        for (const player of players) {
            let pokemon = await pegarPokemon();

            todosPokemon.push({ player, pokemon });
        }

        return todosPokemon;
    }

    function criarPokeCard(pokePlayer) {
        let types = '';

        for (const type of pokePlayer.pokemon.types) {
            types += `
                <div class="type-box ${type.nome.toLowerCase()}">${type.nome}</div>
            `;
        }

        return `
            <div class="poke-card">
            <div class="player-name">${priMaiuscula(pokePlayer.player)}</div>
            <figure>
                <img src="${pokePlayer.pokemon.url}" title="${pokePlayer.pokemon.nome}" alt="Imagem do pokemon ${pokePlayer.pokemon.nome}" />
                <figcaption>
                <div class="types">${types}</div>

                #${pokePlayer.pokemon.id} ${pokePlayer.pokemon.nome}
                </figcaption>
            </figure>

            </div>
        `;
    }

    function imprimirPokeCard(pokePlayers) {
        const place = document.getElementById('pokemon-card-place');

        place.innerHTML = '';

        for (const pokePlayer of pokePlayers) {
            place.innerHTML += criarPokeCard(pokePlayer);
        }
    }

    async function main() {
        const campoNome = document.getElementById('input-name');
        const botaoAdicionar = document.getElementById('add-person');
        const botaoSortear = document.getElementById('catch-pokemon');

        verificaLista(botaoSortear);

        campoNome.addEventListener('input', () => {
            verificarCampo(campoNome, botaoAdicionar);
        });

        botaoAdicionar.addEventListener('click', (event) => {
            event.preventDefault();

            if (verificarCampo(campoNome, botaoAdicionar)) {
                players.push(campoNome.value.toLowerCase());
                campoNome.value = '';
                campoNome.focus();
            }

            verificaLista(botaoSortear);

            imprimirLista();
        });

        botaoSortear.addEventListener('click', async () => {
            pokemonsSorteados = await sortearPokemon();
            imprimirPokeCard(pokemonsSorteados);
        });
    }

    main()
})();