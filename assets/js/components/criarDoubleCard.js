export const criarDoubleCard = (player, i) => {
    let types = '';
    let types2 = '';

    for (const type of player.pokemon.types) {
        types += `
            <div class="type-box ${type.nome.toLowerCase()}">${type.nome}</div>
        `;
    }

    for (const type of player.pokemon2.types) {
        types2 += `
            <div class="type-box ${type.nome.toLowerCase()}">${type.nome}</div>
        `;
    }

    return `
        <div class="poke-card double-card">
        <div class="player-name">#${i} - ${player.nome}</div>
        <div class="poke-double">
        <figure>
            <img src="${player.pokemon.url}" title="${player.pokemon.nome}" alt="Imagem do pokemon ${player.pokemon.nome}" />
            <figcaption>
            <div class="types">${types}</div>

            #${player.pokemon.id} ${player.pokemon.nome}
            </figcaption>
        </figure>
        <div class="vs-text">VS</div>
        <figure>
            <img src="${player.pokemon2.url}" title="${player.pokemon2.nome}" alt="Imagem do pokemon ${player.pokemon2.nome}" />
            <figcaption>
            <div class="types">${types2}</div>

            #${player.pokemon2.id} ${player.pokemon2.nome}
            </figcaption>
        </figure>
        </div>

        </div>
    `;
};