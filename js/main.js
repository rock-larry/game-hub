document.addEventListener("DOMContentLoaded", () => {
  fetch("/game-hub/header.html")
    .then(res => res.text())
    .then(data => document.getElementById("header").innerHTML = data);

  fetch("/game-hub/footer.html")
    .then(res => res.text())
    .then(data => document.getElementById("footer").innerHTML = data);
});
// main.js

function searchGames() {
  let input = document.getElementById("searchInput").value.toLowerCase().trim();
  if (!input) return;

  // Find all matches (not just the first one)
  const matches = gamesData.filter(game =>
    game.name.toLowerCase().includes(input)
  );

  if (matches.length === 1) {
    // If exactly one match, go straight to it
    window.location.href = matches[0].url;
  } else if (matches.length > 1) {
    // If multiple matches, show a list of results
    let resultsHtml = "<h2>Search Results</h2><ul>";
    matches.forEach(game => {
      resultsHtml += `<li><a href="${game.url}">${game.name}</a></li>`;
    });
    resultsHtml += "</ul>";

    // Replace the body content with results
    document.body.innerHTML = resultsHtml;
  } else {
    alert("❌ No game found! Try another title.");
  }
}

// Enable Enter key search
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        searchGames();
      }
    });
  }
});
