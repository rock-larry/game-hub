document.addEventListener("DOMContentLoaded", () => {
  fetch("html/header.html")
    .then(res => res.text())
    .then(data => document.getElementById("header").innerHTML = data);

  fetch("html/footer.html")
    .then(res => res.text())
    .then(data => document.getElementById("footer").innerHTML = data);
});
