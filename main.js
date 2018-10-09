// The monsters and socks
var monsters = [
	'sock!',
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

// Array to hold shuffled monsters
var shuffledMonsters = shuffle(monsters);

// Load game before we start playing
var loadGame = function() {
  // Clear our appContent
  appContent.innerHTML = '';
  // Render initial markup on game load
  for (var i = 0; i < shuffledMonsters.length; i++) {
		monsterImage = '<img class="monster-img" src="/images/' + shuffledMonsters[i] + '" hidden>';
    appContent.innerHTML += '<div class="grid"><img class="door-img" src="/images/door.svg">' + monsterImage + '</div>';
  }
}

// Playing the game
var playGame = function(event) {
	if (event.target.classList.contains('door-img')) {
		event.target.setAttribute('hidden', true);
		event.target.nextSibling.removeAttribute('hidden');
	}
}

// Add event listener for window load -> Load game
window.addEventListener('load', loadGame, false);
// Listen for clicks once the game begins
document.addEventListener('click', playGame, false);
