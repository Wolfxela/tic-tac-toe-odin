const playermaker = function(inputPlayerName)
{
    let playerName = inputPlayerName;
    let sign = ""

    //methods to set and get player details
    const getSign = function(){return sign}
    const getPlayerName = function(){return playerName}
    const setSign = function(inputSign)
    {
        if(sign != "X" && sign != "O")
        {
        sign = inputSign
        }
    }

   return{getSign,getPlayerName,setSign}
}


const ai = function(inputrobotName)
{
    let robotName = inputrobotName
    let sign = ""
    const getPlayerName = function(){return robotName}
    const {getSign} = playermaker("ai")
    const {setSign} = playermaker("ai")
    const getInputOnBoard = function(currentBoard)
    {
        let tempBoard = [...currentBoard]
        let answer = 0;
        
        for(let i = 0; i < tempBoard.length;i++)
        {
            
            let tempBoard = [...currentBoard]
              //if it finds out that he can win, he will place it on that spot
            if(tempBoard[i] != "X" && tempBoard[i] != "O")
            {
                tempBoard[i] = "O"
            }
            if(gameBoard.checkBoard(tempBoard) == true)
            {
                return i + 1
            }
            //if it finds that the player can win if he chooses a spot, it will place it in that spot if he can't win this turn
            if(tempBoard[i] != "X" && tempBoard[i] != "O")
            {
                tempBoard[i] = "X"
            }
            if(gameBoard.checkBoard(tempBoard) == true)
            {
                return i + 1
            }
        }
        //if he can't win and there's no threat of losing, randomly choose an empty spot(possibly change later to make it smarter and have strategies)
        for(let i = 0; i < tempBoard.length;i++)
        {
            answer = Math.floor(Math.random() * 9)+1
            if(currentBoard[answer -1] != "X" && currentBoard[answer -1] != "O")
            {
                return answer
            }
        }
    }

    return{getInputOnBoard,getSign,setSign,getPlayerName}

}



const scoreBoard = (function()
{
    const players = [];
    let goal = 1;
    let player1Score = 0;
    let player2Score = 0;

    const addPlayer = function(player)
    {
        if(players.length < 2)
        {
            players.push(player)
            players[0].setSign("X")
            
        }
        else if(players.length >= 2)
        {
           
            players[1].setSign("O")
        }
    }
    const setPlayerScore = function(sign)
    {
        if(players[0].getSign() == sign)
        {
            player1Score += 1
        }
        else
        {
            player2Score += 1
        }
        checkWinner()

    }
    const checkWinner = function()
    {
        if(player1Score == goal)
        {
            win(players[0])
        }
        if(player2Score == goal)
        {
            win(players[1])
        }

    }
    const win = function(player)
    {
        //to be edited later
        console.log(player.getPlayerName()+ "won!")
    }
    const aiInput = function(board)
    {
       return players[1].getInputOnBoard(board)
    }
    
    return{addPlayer,setPlayerScore,aiInput}


})();

const gameBoard = (function()
{
    let tempNum = 0;
    let turns = 0;
    const board = ["","","","","","","","",""];
    //the arrays are -1 because of index, first one would be 1 2 3 but is instead 0 1 2
    const winningLines = [
        [0,1,2],
        [0,3,6],
        [0,4,8],
        [2,5,8],
        [3,4,5],
        [4,1,7],
        [6,4,2],
        [6,7,8]
    ]
    
    const placeMark = function(Spot)
    {
        placeSpot = Spot -1
       
    
        if(tempNum == 0 && board[placeSpot] == "")
        {

            board[placeSpot] = "X"
            tempNum += 1
            turns += 1;
            
            if(checkBoard(board) == true)
            {
                scoreBoard.setPlayerScore("X")
               
                
            }
            else
            {
                placeMark(scoreBoard.aiInput(board))
            }

        }
        else if(tempNum != 0 && board[placeSpot] == "")
        {
            board[placeSpot] = "O"
            tempNum = 0
            turns += 1;
            if(checkBoard(board) == true)
            {
                scoreBoard.setPlayerScore("O")
               
            }
        }

        if(turns == 10)
        {
            clearBoard();
        }
        

       
    }
    const checkBoard = function(inputBoard)
    {

        for(let i = 0; i < winningLines.length; i++)
        {
            if(inputBoard[winningLines[i][0]] != ""
                        &&
               inputBoard[winningLines[i][0]] == inputBoard[winningLines[i][1]]
                        &&
               inputBoard[winningLines[i][0]] == inputBoard[winningLines[i][2]]
               )
            {
                clearBoard(inputBoard);
                return true
            }
        }
    }
    const clearBoard = function(inputBoard)
    {

        for(let i = 0; i < inputBoard.length;i++)
        {
            inputBoard[i] = "";
        }

    }

    return{placeMark,checkBoard}

})();
scoreBoard.addPlayer(playermaker("bob"))
scoreBoard.addPlayer(ai("bill"))
//testing
gameBoard.placeMark(6)


