let currentStep = 1;
const totalSteps = 5;

function showStep(step) {
  for (let i = 1; i <= totalSteps; i++) {
    document.getElementById(`step-${i}`).style.display =
      i === step ? "block" : "none";
    document
      .querySelectorAll(".sidebar li")
      [i - 1].classList.toggle("active", i === step);
  }
}

document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentStep < totalSteps) {
    currentStep++;
    showStep(currentStep);
  }
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
});

// Initialize
showStep(currentStep);
