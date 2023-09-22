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
        if(players.length >= 2)
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
    
    return{addPlayer,setPlayerScore}


})();

const gameBoard = (function()
{
    let tempNum = 0;
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
            if(checkBoard() == true)
            {
                scoreBoard.setPlayerScore("X")
            }
        }
        else if(tempNum != 0 && board[placeSpot] == "")
        {
            board[placeSpot] = "O"
            tempNum = 0
            if(checkBoard() == true)
            {
                scoreBoard.setPlayerScore("O")
            }
        }

       
    }
    const checkBoard = function()
    {

        for(let i = 0; i < winningLines.length; i++)
        {
            if(board[winningLines[i][0]] != "" && board[winningLines[i][0]] == board[winningLines[i][1]] && board[winningLines[i][0]] == board[winningLines[i][2]])
        {
            return true
        }
        }
    }

    return{placeMark}

})();
scoreBoard.addPlayer(playermaker("bob"))
scoreBoard.addPlayer(playermaker("bill"))
//testing
gameBoard.placeMark(9)
gameBoard.placeMark(1)
gameBoard.placeMark(8)
gameBoard.placeMark(2)
gameBoard.placeMark(6)
gameBoard.placeMark(3)

