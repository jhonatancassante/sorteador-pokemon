export const criarPokeCard = (player, i) => {
    let types = '';

    for (const type of player.pokemon.types) {
        types += `
            <div class="type-box ${type.nome.toLowerCase()}">${type.nome}</div>
        `;
    }

    return `
        <div class="poke-card">
        <div class="player-name">#${i} - ${player.nome}</div>
        <figure>
            <img src="${player.pokemon.url}" title="${player.pokemon.nome}" alt="Imagem do pokemon ${player.pokemon.nome}" />
            <figcaption>
            <div class="types">${types}</div>

            #${player.pokemon.id} ${player.pokemon.nome}
            </figcaption>
        </figure>

        </div>
    `;
};