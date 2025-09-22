// main.js (replace your existing search-related bits with this)

document.addEventListener("DOMContentLoaded", () => {
  // Load header + footer and only init search after both are injected.
  Promise.all([
    fetch("/game-hub/header.html").then(r => r.text()).then(html => document.getElementById("header").innerHTML = html),
    fetch("/game-hub/footer.html").then(r => r.text()).then(html => document.getElementById("footer").innerHTML = html)
  ])
  .then(() => {
    // small delay won't hurt if browser is still parsing inserted HTML
    setTimeout(() => initSearchBar(), 20);
  })
  .catch(err => console.error("Header/footer load error:", err));
});

function initSearchBar() {
  // debug checks
  console.log("initSearchBar running");
  if (!window.gamesData) {
    console.warn("gamesData not found. Make sure games.js is loaded BEFORE main.js on the page.");
    // continue anyway (empty list) to avoid breaking
    window.gamesData = window.gamesData || [];
  }

  const searchBox = document.querySelector(".search-box");
  let searchInput = document.getElementById("searchInput");
  let suggestionsBox = document.getElementById("searchSuggestions");
  const searchBtn = document.getElementById("searchBtn");

  // If suggestions container missing, create it and append to .search-box
  if (!suggestionsBox && searchBox) {
    suggestionsBox = document.createElement("div");
    suggestionsBox.id = "searchSuggestions";
    suggestionsBox.className = "suggestions";
    searchBox.appendChild(suggestionsBox);
    console.log("Created suggestions container dynamically.");
  }

  // If input missing, try to find first input inside searchBox
  if (!searchInput && searchBox) {
    searchInput = searchBox.querySelector("input[type='text'], input");
  }

  if (!searchInput) {
    console.warn("searchInput not found. Aborting search init.");
    return;
  }
  if (!suggestionsBox) {
    console.warn("suggestionsBox not found. Aborting search init.");
    return;
  }

  // Helper: render suggestions
  function renderSuggestions(matches) {
    suggestionsBox.innerHTML = "";
    if (!matches.length) {
      suggestionsBox.style.display = "none";
      suggestionsBox.setAttribute("aria-hidden", "true");
      return;
    }

    matches.forEach(game => {
      const item = document.createElement("div");
      item.className = "suggestion-item";
      item.textContent = game.name;
      // clicking a suggestion navigates
      item.addEventListener("click", () => {
        window.location.href = game.url;
      });
      suggestionsBox.appendChild(item);
    });

    suggestionsBox.style.display = "block";
    suggestionsBox.setAttribute("aria-hidden", "false");
  }

  // Input handler
  searchInput.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase().trim();
    suggestionsBox.innerHTML = "";

    if (!q) {
      suggestionsBox.style.display = "none";
      return;
    }

    const matches = window.gamesData
      .filter(g => g.name.toLowerCase().includes(q))
      .slice(0, 6); // cap to 6 suggestions

    renderSuggestions(matches);
  });

  // Enter should go to first match
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const q = searchInput.value.toLowerCase().trim();
      if (!q) return;
      const matches = window.gamesData.filter(g => g.name.toLowerCase().includes(q));
      if (matches.length) window.location.href = matches[0].url;
      else alert("No game found.");
    }
    // Escape hides suggestions
    if (e.key === "Escape") {
      suggestionsBox.style.display = "none";
    }
  });

  // Optional search button
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const q = searchInput.value.toLowerCase().trim();
      if (!q) return;
      const matches = window.gamesData.filter(g => g.name.toLowerCase().includes(q));
      if (matches.length) window.location.href = matches[0].url;
      else alert("No game found.");
    });
  }

  // Click outside to hide suggestions
  document.addEventListener("click", (e) => {
    if (!searchBox.contains(e.target)) {
      suggestionsBox.style.display = "none";
    }
  });

  console.log("Search initialized. gamesData length:", window.gamesData.length);
}
