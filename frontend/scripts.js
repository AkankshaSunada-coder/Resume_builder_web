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
  body: JSON.stringify({ name: "Akshatha", email: "akshatha@example.com" }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));

function openTemplate(templateName) {
  // Example: redirect to editor page
  window.location.href = `editor.html?template=${templateName}`;
}

function openTemplate(templateName) {
  // Track usage counts
  let usage = JSON.parse(localStorage.getItem("templateUsage")) || {};
  usage[templateName] = (usage[templateName] || 0) + 1;
  localStorage.setItem("templateUsage", JSON.stringify(usage));

  // Track recent draft
  localStorage.setItem("recentDraft", templateName);

  // Redirect to editor page
  window.location.href = `editor.html?template=${templateName}`;
}

function updateSections() {
  // Drafts
  let recentDraft = localStorage.getItem("recentDraft");
  let draftsContainer = document.getElementById("drafts-container");
  draftsContainer.innerHTML = recentDraft
    ? `<div class="recent-card" onclick="openTemplate('${recentDraft}')">
         <h3>${recentDraft} (Draft)</h3>
         <p>Last used template</p>
       </div>`
    : `<div class="recent-card"><p>No drafts available</p></div>`;

  // Popular
  let usage = JSON.parse(localStorage.getItem("templateUsage")) || {};
  let popularTemplate = Object.keys(usage).reduce(
    (a, b) => (usage[a] > usage[b] ? a : b),
    null,
  );
  let popularContainer = document.getElementById("popular-container");
  popularContainer.innerHTML = popularTemplate
    ? `<div class="a4-card" onclick="openTemplate('${popularTemplate}')">
         <h3>${popularTemplate} (Popular)</h3>
         <p>Most used template</p>
       </div>`
    : `<div class="a4-card"><p>No popular templates yet</p></div>`;
}

// Run on page load
window.onload = updateSections;
