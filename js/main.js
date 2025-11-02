// Load games from JSON file
let games = [];

fetch('/game-hub/js/games.json')
  .then(response => response.json())
  .then(data => {
    games = data;
    displayGames(games);
  })
  .catch(error => console.error("Error loading games:", error));
// Display function
function displayGames(gameList) {
  const container = document.getElementById('gamesContainer');
  container.innerHTML = ''; // clear existing
  gameList.forEach(game => {
    const div = document.createElement('div');
    div.innerHTML = `<a href="${game.link}" target="_blank">${game.title}</a>`;
    container.appendChild(div);
  });
}

// Search function
document.getElementById('searchGames()').addEventListener('click', () => {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const filtered = games.filter(game => game.title.toLowerCase().includes(searchTerm));
  displayGames(filtered);
});
