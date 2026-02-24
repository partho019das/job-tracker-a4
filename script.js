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
    // total jobs is all + interview + rejected
    const totalJobs = allSection.children.length + interviewSection.children.length + rejectedSection.children.length;

    // Remaining jobs = not applied only
    const remainingJobs = allSection.children.length;

    totalCounter.innerText = remainingJobs; // Right side counter
    interviewCounter.innerText = interviewSection.children.length;
    rejectedCounter.innerText = rejectedSection.children.length;

    jobCountText.innerText = remainingJobs + " jobs";
}

// MOVE CARD
function moveCard(card, targetSection, statusText) {
    targetSection.appendChild(card);

    // Update Not Applied button text
    const notAppliedBtn = card.querySelector("button:nth-of-type(1)");
    if (notAppliedBtn) {
        notAppliedBtn.innerText = statusText;
    }

    updateCounts(); // Always update after move
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

// HANDLE CARD BUTTONS
function addCardButtonFunctionality(card) {
    const buttons = card.querySelectorAll("div.flex.flex-wrap > button");
    buttons.forEach((btn) => {
        const text = btn.innerText.toLowerCase();
        if (text === "interview") {
            btn.addEventListener("click", () => {
                moveCard(card, interviewSection, "Interview");
            });
        }
        if (text === "rejected") {
            btn.addEventListener("click", () => {
                moveCard(card, rejectedSection, "Rejected");
            });
        }
    });

    // DELETE FUNCTIONALITY
    addDeleteFunctionality(card);

    // NOT APPLIED BUTTON FUNCTIONALITY
    const notAppliedBtn = card.querySelector("button:nth-of-type(1)");
    if (notAppliedBtn) {
        notAppliedBtn.addEventListener("click", () => {
            moveCard(card, allSection, "Not Applied"); // Back to main
        });
    }
}

// Apply to existing cards
document.querySelectorAll("#allcard > div").forEach((card) => {
    addCardButtonFunctionality(card);
});

// FILTER BUTTON SYSTEM
function resetBtn() {
    btnAll.className = "text-white bg-[#3B82F6] px-6 py-2 rounded";
    btnInterview.className = "text-[#64748B] bg-[#F1F2F4] px-6 py-2 rounded";
    btnRejected.className = "text-[#64748B] bg-[#F1F2F4] px-6 py-2 rounded";
}

btnAll.addEventListener("click", () => {
    resetBtn();
    btnAll.className = "text-white bg-[#3B82F6] px-6 py-2 rounded";
    allSection.style.display = "grid";
    interviewSection.style.display = "none";
    rejectedSection.style.display = "none";
});

btnInterview.addEventListener("click", () => {
    resetBtn();
    btnInterview.className = "text-white bg-[#10B981] px-6 py-2 rounded";
    allSection.style.display = "none";
    interviewSection.style.display = "grid";
    rejectedSection.style.display = "none";
});

btnRejected.addEventListener("click", () => {
    resetBtn();
    btnRejected.className = "text-white bg-[#EF4444] px-6 py-2 rounded";
    allSection.style.display = "none";
    interviewSection.style.display = "none";
    rejectedSection.style.display = "grid";
});

// Initial count
updateCounts();
