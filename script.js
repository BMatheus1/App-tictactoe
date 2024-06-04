document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const squares = document.querySelectorAll('.square');
    const statusDisplay = document.getElementById('status');
    const restartButton = document.getElementById('restart');
    const celebration = document.getElementById('celebration');
    const winnerName = document.getElementById('winner-name');
  
    let boardState = Array(9).fill(null);
    let xIsNext = true;
  
    // Função chamada ao clicar em um quadrado
    function handleClick(event) {
      const index = event.target.getAttribute('data-index');
      // Verifica se o quadrado já foi clicado ou se há um vencedor
      if (boardState[index] || calculateWinner(boardState)) {
        return;
      }
  
      // Atualiza o estado do quadrado clicado
      boardState[index] = xIsNext ? 'X' : 'O';
      event.target.textContent = boardState[index];
      xIsNext = !xIsNext; // Alterna o jogador
  
      // Verifica se há um vencedor
      const winner = calculateWinner(boardState);
      if (winner) {
        statusDisplay.textContent = `Winner: ${winner}`;
        celebrateWinner(winner);
      } else {
        statusDisplay.textContent = `Next player: ${xIsNext ? 'X' : 'O'}`;
      }
    }
  
    // Função para calcular o vencedor
    function calculateWinner(squares) {
      const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    }
  
    // Função para comemorar o vencedor
    function celebrateWinner(winner) {
      winnerName.textContent = winner;
      celebration.classList.add('visible');
      setTimeout(() => {
        celebration.classList.remove('visible');
      }, 3000); // Mostra a mensagem de comemoração por 3 segundos
    }
  
    // Função para reiniciar o jogo
    function restartGame() {
      boardState = Array(9).fill(null); // Reseta o estado do tabuleiro
      xIsNext = true; // Reinicia com o jogador X
      squares.forEach(square => (square.textContent = '')); // Limpa os quadrados
      statusDisplay.textContent = 'Next player: X'; // Reseta o status
      celebration.classList.remove('visible'); // Esconde a mensagem de comemoração
    }
  
    // Adiciona ouvintes de eventos aos quadrados e ao botão de reinício
    squares.forEach(square => square.addEventListener('click', handleClick));
    restartButton.addEventListener('click', restartGame);
  });
  