let currentStep = 1;
const totalSteps = 5;

document.getElementById("nextBtn").addEventListener("click", () => {
  console.log("Next button clicked");
  console.log("Current Step before increment:", currentStep);
  if (currentStep < totalSteps) {
    currentStep++;
    console.log("Current Step:", currentStep);
    showStep(currentStep);
  }
});

document.getElementById("prevBtn").addEventListener("click", () => {
  console.log("Previous button clicked");
  console.log("Current Step before decrement:", currentStep);
  if (currentStep > 1) {
    currentStep--;
    console.log("Current Step:", currentStep);
    showStep(currentStep);
  }
});

function showStep(step) {
  for (let i = 1; i <= totalSteps; i++) {
    document.getElementById(`step-${i}`).style.display =
      i === step ? "block" : "none";
  }

  if (step === totalSteps) {
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("previewBtn").style.display = "block";
  } else {
    document.getElementById("nextBtn").style.display = "block";
    document.getElementById("previewBtn").style.display = "none";
  }

  prevbtn = document.getElementById("prevBtn");
  if (step == 1) {
    prevbtn.disabled = true;
  } else {
    prevbtn.disabled = false;
  }
}

// Initialize
showStep(currentStep);

function openTemplate(templateName) {
  window.location.href = `details.html?template=${templateName}`;
}

// Handle form submission when Preview is clicked
document.getElementById("resumeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const resumeData = {};
  formData.forEach((value, key) => (resumeData[key] = value));

  // Get selected template from URL
  const params = new URLSearchParams(window.location.search);
  const template = params.get("template");

  // Save data + template choice
  localStorage.setItem("resumeData", JSON.stringify(resumeData));
  localStorage.setItem("selectedTemplate", template);

  // Redirect to preview page
  window.location.href = "preview.html";
});
