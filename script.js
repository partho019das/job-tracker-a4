
// ELEMENT SELECT

const totalCounter = document.getElementById("total-counter");
const interviewCounter = document.getElementById("Interview-counter");
const rejectedCounter = document.getElementById("Rejected-counter");

const allSection = document.getElementById("allcard");

const btnAll = document.getElementById("b-all");
const btnInterview = document.getElementById("b-interview");
const btnRejected = document.getElementById("b-rejected");

const jobCountText = document.querySelector("main > div.flex > p:last-child");


// CREATE NEW SECTIONS

const interviewSection = document.createElement("div");
const rejectedSection = document.createElement("div");

interviewSection.className = "grid gap-5";
rejectedSection.className = "grid gap-5";

interviewSection.style.display = "none";
rejectedSection.style.display = "none";

allSection.after(interviewSection);
interviewSection.after(rejectedSection);


// UPDATE COUNTER

function updateCounts() {
  totalCounter.innerText = allSection.children.length;
  interviewCounter.innerText = interviewSection.children.length;
  rejectedCounter.innerText = rejectedSection.children.length;

  const totalJobs = allSection.children.length + interviewSection.children.length + rejectedSection.children.length;
  jobCountText.innerText = totalJobs + " jobs";
}


// MOVE CARD

function moveCard(card, targetSection) {
  targetSection.appendChild(card);
  updateCounts();
}


// DELETE CARD

function addDeleteFunctionality(card) {
  const deleteBtn = card.querySelector(".fa-trash-can");
  if (deleteBtn) {
    deleteBtn.parentElement.addEventListener("click", () => {
      card.remove();
      updateCounts();
    });
  }
}



