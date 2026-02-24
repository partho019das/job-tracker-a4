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


// EMPTY MESSAGE SYSTEM


function createEmptyMessage() {
    const msg = document.createElement("div");
    msg.innerHTML = `
        <div class="text-center py-10 text-gray-500 col-span-full">
            <p class="text-lg font-medium">No Data Found</p>
        </div>
    `;
    msg.style.display = "none";
    return msg;
}

const emptyAll = createEmptyMessage();
const emptyInterview = createEmptyMessage();
const emptyRejected = createEmptyMessage();

allSection.appendChild(emptyAll);
interviewSection.appendChild(emptyInterview);
rejectedSection.appendChild(emptyRejected);


// UPDATE COUNTER


function updateCounts() {

    const allCards = allSection.querySelectorAll(":scope > div:not(:last-child)");
    const interviewCards = interviewSection.querySelectorAll(":scope > div:not(:last-child)");
    const rejectedCards = rejectedSection.querySelectorAll(":scope > div:not(:last-child)");

    const allCount = allCards.length;
    const interviewCount = interviewCards.length;
    const rejectedCount = rejectedCards.length;

    totalCounter.innerText = allCount;
    interviewCounter.innerText = interviewCount;
    rejectedCounter.innerText = rejectedCount;

    jobCountText.innerText = allCount + " jobs";

    // SHOW / HIDE EMPTY MESSAGE
    emptyAll.style.display = allCount === 0 ? "block" : "none";
    emptyInterview.style.display = interviewCount === 0 ? "block" : "none";
    emptyRejected.style.display = rejectedCount === 0 ? "block" : "none";
}

// MOVE CARD


function moveCard(card, targetSection, statusText) {

    targetSection.insertBefore(
        card,
        targetSection.lastElementChild
    );

    const notAppliedBtn = card.querySelector("button:nth-of-type(1)");
    if (notAppliedBtn) {
        notAppliedBtn.innerText = statusText;
    }

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

    // DELETE
    addDeleteFunctionality(card);

    // NOT APPLIED BUTTON
    const notAppliedBtn = card.querySelector("button:nth-of-type(1)");
    if (notAppliedBtn) {
        notAppliedBtn.addEventListener("click", () => {
            moveCard(card, allSection, "Not Applied");
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
