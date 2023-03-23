
let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')

// ** Check if either players health is  0 and if it is, then update isOver to true **
const updateGame = (p1,p2,gameState) => {
  // Update the DOM with the names and the latest health of players
  p1NameDiv.innerText = p1.name
  p2NameDiv.innerText = p2.name
  p1HealthDiv.innerText = p1.health
  p2HealthDiv.innerText = p2.health

  // Condition IF either player health is <= 0 then set isOver to true and declareWinner
  if(p1.health<=0 || p2.health<=0){
    game.isOver = true
    gameState = game.isOver
    resultDiv.innerText = 
    game.declareWinner(game.isOver,p1, p2)
    return gameState
  }

}

class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }
  // ** Attack an enemy with a random number from 0 to YOUR attackDmg bonus **
  strike (player, enemy, attackDmg) {
    
    // Get random number between 1 - 10 and that is damageAmount
    let damageAmount = Math.ceil(Math.random() * attackDmg)
    // console.log(damageAmount)
    // Subtract the enemy health with the damageAmount
    enemy.health -= damageAmount
    //  Update the game and DOM with updateGame()
    updateGame(p1,p2,gameState)
    //  Return a message of 'player name attacks enemy name for damageAmount'
    return `${player.name} attacks ${enemy.name} for ${damageAmount}`

  }
  // ** Heal the player for random number from  1 to 5 **
  heal (player) {

    let hpAmount = Math.ceil(Math.random() * 5)

    player.health += hpAmount

    updateGame(p1,p2,gameState)

      return `${player.name} name heals for ${hpAmount} HP`

  }
}

class Game {
  constructor() {
    this.isOver = false;
  }


  declareWinner(isOver,p1, p2) {
  
    let message = "TIE!"
    if(isOver==true && p1.health<=0){
      message = `${p2.name} WINS!`
    }
    else if(isOver==true && p2.health<=0){
        message = `${p1.name} WINS!`
      }

    // Play victory sound
    document.getElementById('victory').play()

    return message

  }

  reset(p1,p2) {
   
    p1.health = 100
    p2.health = 100
    this.isOver = false
    resultDiv.innerText = ""
    updateGame(p1,p2)

  }
  
  // ** Simulates the whole match untill one player runs out of health **
  play(p1, p2) {
    this.reset(p1,p2);

    // the players take turns untill isOver is TRUE
    while (!this.isOver) {
      //both players get strike() and heal() once each loop
      
      p1.strike (p1, p2, p1.attackDmg)
      p1.heal(p1)
      p2.strike (p2, p1, p2.attackDmg)
      p2.heal(p2)
    }
    
    return this.declareWinner(this.isOver,p1, p2)
  }

}

let player1 = new Player('player1', 100, 10)
let player2 = new Player('player2', 100, 10)

let p1 = player1;
let p2 = player2;

let game = new Game;

updateGame(p1,p2)

let gameState = game.isOver;

play.onclick = () => result.innerText = game.play(p1,p2)

// console.log(p1.strike(p1, p2, p1.attackDmg))
// ** Player 1 Controls **
document.addEventListener('keydown', function(e) {
  // if you press Q AND the enemy health is greater than 0 AND isOver is still false then strike()
  
  if (e.key == "q" && p2.health > 0 && game.isOver == false){
    p1.strike(p1, p2, p1.attackDmg)
    document.getElementById('p1attack').play();
  }

});

document.addEventListener('keydown', function(e) {
  
  // if you press a AND the player health is greater than 0 AND isOver is still false then strike()
  if(e.key == "a" && p1.health>0 && game.isOver == false){
    p1.heal(p1)
    document.getElementById('p1heal').play()
  }
});

// ** Player 2 Controls **
document.addEventListener('keydown', function(e) {
  
  // if you press p AND enemy health is greater than 0 AND isOver is still false then stike()
  if (e.key == "p" && p1.health > 0 && game.isOver == false){
    p2.strike(p2, p1, p2.attackDmg)
    document.getElementById('p2attack').play();
  }
});

document.addEventListener('keydown', function(e) {
  // if you press l AND the player health is greater than 0 AND isOver is still false then heal()
  if(e.key == "l" && p2.health>0 && game.isOver == false){
    p2.heal(p2)
    document.getElementById('p2heal').play()
  }
});



