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


const gameBoard = (function()
{
    const players = [];
    let goal = 3;
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

//testing
gameBoard.addPlayer(playermaker("Bob"))
gameBoard.addPlayer(playermaker("Bil"))

gameBoard.setPlayerScore("X")
gameBoard.setPlayerScore("X")
gameBoard.setPlayerScore("X")
