document.addEventListener("DOMContentLoaded", () => {
  const basePath = window.location.pathname.includes("/html/") ? ".." : ".";
  
  const loadPart = async (id, file) => {
    try {
      const response = await fetch(`${basePath}/${file}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const html = await response.text();
      document.getElementById(id).innerHTML = html;
    } catch (error) {
      console.error(`Failed to load ${file}:`, error);
    }
  };

  loadPart("header", "header.html");
  loadPart("footer", "footer.html");
});
