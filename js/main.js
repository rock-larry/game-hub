document.addEventListener("DOMContentLoaded", () => {
  let games = [];

  fetch('/game-hub/js/games.json')
    .then(response => response.json())
    .then(data => {
      games = data;
      displayGames(games);
    })
    .catch(err => console.error("Error loading games:", err));

  function displayGames(gameList) {
    const container = document.getElementById('gamesContainer');
    if (!container) {
      console.error("gamesContainer element not found");
      return;
    }

    container.innerHTML = '';
    gameList.forEach(game => {
      const div = document.createElement('div');
      div.innerHTML = `<a href="${game.link}" target="_blank">${game.title}</a>`;
      container.appendChild(div);
    });
  }
});
