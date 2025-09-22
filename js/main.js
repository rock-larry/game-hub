document.addEventListener("DOMContentLoaded", () => {
  // Load header
  fetch("/game-hub/header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;

      // Now init search bar logic AFTER header is loaded
      initSearchBar();
    });

  // Load footer
  fetch("/game-hub/footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    });
});

// 🔍 Search bar logic
function initSearchBar() {
  const searchInput = document.getElementById("searchInput");
  const suggestionsBox = document.getElementById("searchSuggestions");

  if (!searchInput || !suggestionsBox) return;

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();
    suggestionsBox.innerHTML = "";

    if (query.length === 0) {
      suggestionsBox.style.display = "none";
      return;
    }

    // Find matching games
    const matches = gamesData.filter(game =>
      game.name.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      suggestionsBox.style.display = "none";
      return;
    }

    // Show suggestions
    matches.forEach(game => {
      const suggestion = document.createElement("div");
      suggestion.classList.add("suggestion-item");
      suggestion.textContent = game.name;

      // Click → go to that game
      suggestion.onclick = () => {
        window.location.href = game.url;
      };

      suggestionsBox.appendChild(suggestion);
    });

    suggestionsBox.style.display = "block";
  });

  // Enter key = search
  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchGames();
    }
  });
}

// Redirect if only one match on Enter or button click
function searchGames() {
  const input = document.getElementById("searchInput").value.toLowerCase().trim();
  if (!input) return;

  const matches = gamesData.filter(game =>
    game.name.toLowerCase().includes(input)
  );

  if (matches.length > 0) {
    window.location.href = matches[0].url;
  } else {
    alert("❌ No game found! Try another title.");
  }
}
