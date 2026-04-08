function searchTemplates() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const templates = document.querySelectorAll("#templateList .card");

  templates.forEach((template) => {
    if (template.textContent.toLowerCase().includes(input)) {
      template.style.display = "block";
    } else {
      template.style.display = "none";
    }
  });
}
// Example: Create a new user
fetch("http://127.0.0.1:5000/user", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Akshatha", email: "akshatha@example.com" })
})
.then(res => res.json())
.then(data => console.log(data));

