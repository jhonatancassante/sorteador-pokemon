export const verificarCampo = (campo, players, botao) => {
    const mensagem = document.getElementById('message');

    campo.classList.add('input-error');
    botao.disabled = true;

    console.log(players)

    if (players.filter(player =>
        player.nome.toLowerCase() === campo.value.toLowerCase()
    ).length > 0) {
        mensagem.innerHTML = 'Jogador já cadastrado!';
        return false;
    } else if (campo.value.trim().length === 0) {
        mensagem.innerHTML = 'Campo vazio!';
        return false;
    } else {
        campo.classList.remove('input-error');
        botao.disabled = false;
        mensagem.innerHTML = "";
        return true;
    }
}; 