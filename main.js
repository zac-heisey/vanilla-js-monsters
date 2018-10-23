// The monsters and sock
var monsters = [
	'socks.svg',
	'monster1.svg',
	'monster2.svg',
	'monster3.svg',
	'monster4.svg',
	'monster5.svg',
	'monster6.svg',
	'monster7.svg',
	'monster8.svg',
	'monster9.svg',
	'monster10.svg',
	'monster11.svg'
];

// Set user's monster count
var monsterCount = 0;

// Variable to hold shuffled monsters
var shuffledMonsters;

// Get user's collected monster count span field
var collectedMonsters = document.querySelector('#collected-monsters');

// Get the app div
var appContent = document.getElementById('app');

/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
var shuffle = function (array) {

  var currentIndex = array.length;
  var temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;

};

// Load game before we start playing
var loadGame = function() {
  // Clear our appContent
  appContent.innerHTML = '';
	// Reset monsterCount to 0
	monsterCount = 0;
	// Array to hold shuffled monsters
	shuffledMonsters = shuffle(monsters);
  // Render initial markup on game load
  for (var i = 0; i < shuffledMonsters.length; i++) {
		var monsterImage = '<img class="monster-img" src="images/' + shuffledMonsters[i] + '" hidden>';
    appContent.innerHTML += '<div class="grid"><img class="door-img" src="images/door.svg">' + monsterImage + '</div>';
  }
}

// Playing the game
var playGame = function(event) {
	// Bail if click is not on a door image
	if (!event.target.classList.contains('door-img')) return;
	// When a user clicks on a door, hide the door image & reveal a monster or socks image
	event.target.setAttribute('hidden', true);
	event.target.nextSibling.removeAttribute('hidden');
	// If monster image is shown, add to monsterCount
	if (event.target.nextSibling.src.includes('images/monster')) {
		monsterCount++;
		collectedMonsters.textContent = monsterCount;
		// Show WIN message if user collects 11 monsters
		if (monsterCount === 11) {
			setTimeout(function() {
				var playAgain = confirm('WINNER! You are a Master Monster Wrangler! Want to play again?');
				// Reload page if user wants to play again
				if (playAgain === true) {
					window.location.reload(true);
				} else {
					// Show Bye Boo GIF
					appContent.innerHTML = '<img src="images/bye-boo.gif">';
				}
			}, 500);
		}
	} else {
		// Show LOSE message if user select the socks
		setTimeout(function() {
			var playAgain = confirm('MUAHAHAHA! You\'ve been socked! Want to try again?');
			if (playAgain === true) {
				// Reload page if user wants to play again
				window.location.reload(true);
			} else {
				// Show Bye Boo GIF
				appContent.innerHTML = '<img src="images/bye-boo.gif">';
			}
		}, 500);
	}
}

// Load game
loadGame();
// Listen for clicks once the game begins
document.addEventListener('click', playGame, false);
