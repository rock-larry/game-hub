document.addEventListener("DOMContentLoaded", () => {
  fetch("/game-hub/header.html")
    .then(res => res.text())
    .then(data => document.getElementById("header").innerHTML = data);

  fetch("/game-hub/footer.html")
    .then(res => res.text())
    .then(data => document.getElementById("footer").innerHTML = data);
});
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const gameList = document.querySelectorAll(".game-list li");

  if (searchInput) {
    searchInput.addEventListener("keyup", () => {
      let filter = searchInput.value.toLowerCase();

      gameList.forEach(item => {
        let text = item.textContent.toLowerCase();
        if (text.includes(filter)) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    });
  }
});
