const positions = document.querySelectorAll('.game-board-position');
const resetGameBtn = document.querySelector('.reset-game');



const Player = (marker) => {

    const getMarker =  () => marker;

    return { getMarker }
};

const playerX = Player('X');
const playerO = Player('O');

const gameBoard = (function(){
        
    let board = Array(9).fill(null);

    const getBoard = () => board;

    const resetBoard = () => {
        board = Array(9).fill(null);
    };

    const markPosition = (marker, index) =>{
            if(board[index] == null){
                board[index] = marker;
                game.checkWin(marker);
            }else{
                console.log('This sit been taken');
            }
    };

    return {getBoard, resetBoard, markPosition};
})();

const game = (function(){

    let currentPlayer = playerX.getMarker();

    const getCurrentPlayer = () => currentPlayer;

    const switchCurrentPlayer = () => {
        if(currentPlayer === playerX.getMarker()){
            currentPlayer = playerO.getMarker();
        }else{
            currentPlayer = playerX.getMarker();
        }

    }


    function winConditions (marker){
        
        //linhas
        if((gameBoard.getBoard()[0] === marker && gameBoard.getBoard()[1] === marker && gameBoard.getBoard()[2] === marker) ||
            (gameBoard.getBoard()[3] === marker && gameBoard.getBoard()[4] === marker && gameBoard.getBoard()[5] === marker)||
            (gameBoard.getBoard()[6] === marker && gameBoard.getBoard()[7] === marker && gameBoard.getBoard()[8] === marker)){
                return true;
        }

          //colunas
          if((gameBoard.getBoard()[0] === marker && gameBoard.getBoard()[3] === marker && gameBoard.getBoard()[6] === marker) ||
          (gameBoard.getBoard()[1] === marker && gameBoard.getBoard()[4] === marker && gameBoard.getBoard()[7] === marker)||
          (gameBoard.getBoard()[2] === marker && gameBoard.getBoard()[5] === marker && gameBoard.getBoard()[8] === marker)){ 
                return true;
        }

         //diagonais
         if((gameBoard.getBoard()[0] === marker && gameBoard.getBoard()[4] === marker && gameBoard.getBoard()[8] === marker) ||
         (gameBoard.getBoard()[2] === marker && gameBoard.getBoard()[4] === marker && gameBoard.getBoard()[6] === marker)){ 
               return true;
        }
        return false
    }

    const checkWin = (marker)=>{
        if (winConditions(marker) === true){
            console.log(`Player ${marker} wins!`);
            alert(`Player ${marker} wins!`);
            gameBoard.resetBoard();
            displayController.displayElements();
        }else if(gameBoard.getBoard().every(position => position !== null)) {
            alert('It\'s a draw!');
            gameBoard.resetBoard();
            displayController.displayElements();
        }
        else{
            console.log('no one win')
        }
    }

    positions.forEach(position => {
        position.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            gameBoard.markPosition(currentPlayer, index);
            displayController.displayElements();
            game.switchCurrentPlayer();
            console.log(index);
        });
    });

    positions.forEach(position => {
        position.addEventListener('mouseenter', (event) => {
            const index = event.target.getAttribute('data-index');
            // Adiciona a classe do turno atual se a posição estiver vazia
            if (!gameBoard.getBoard()[index]) {
                if (game.getCurrentPlayer() === playerX.getMarker()) {
                    event.target.classList.add('marker-preview-x');
                } else {
                    event.target.classList.add('marker-preview-o');
                }
            }
        });
        position.addEventListener('mouseleave', (event) => {
            // Remove todas as classes de pré-visualização
            event.target.classList.remove('marker-preview-x', 'marker-preview-o');
        });
    });
    
    
    resetGameBtn.addEventListener('click', () => {
        gameBoard.resetBoard();
        displayController.displayElements();
    });

    return {checkWin, getCurrentPlayer, switchCurrentPlayer}
}());

const displayController = (function(){
    
   const displayElements = () => positions.forEach(element => {
        const marker = gameBoard.getBoard()[element.getAttribute('data-index')];
        element.classList.remove('marker-preview-x', 'marker-preview-o');
        if(marker==='X'){
            element.classList.add('marker-x');
        }else if(marker==='O'){
            element.classList.add('marker-o');
        }else{
            element.classList.remove('marker-o');
            element.classList.remove('marker-x');
        }
    });
    
    return { displayElements }
    
})();




  



//game, player e gameboard objects