let interviewlist=[];
let rejectedlist=[];


let all = document.getElementById("total-counter");
let interview = document.getElementById("Interview-counter");
let rejected = document.getElementById("Rejected-counter");

const AllCardSection = document.getElementById("allcard");

const mainContainer=document.querySelector(`main`);


function CalculateCount() {
    all.innerText = AllCardSection.children.length;
   interview.innerText = interviewlist.length
   rejected.innerText = rejectedlist.length
}

CalculateCount();

                                // button color change and click function

const allB=document.getElementById("b-all");
const interviewB=document.getElementById("b-interview");
const rejectedB=document.getElementById("b-rejected");

allB.addEventListener("click", handleClick);
interviewB.addEventListener("click", handleClick);
rejectedB.addEventListener("click", handleClick);

function handleClick(e) {
    toggleStyle(e.target);
}

function toggleStyle(selected) {
   allB.classList.remove(`bg-[#3B82F6]`,`text-white`)
   interviewB.classList.remove(`text-[#64748B]`,`bg-[#F1F2F4]`)
   rejectedB.classList.remove(`text-[#64748B]`,`bg-[#F1F2F4]`)

       allB.classList.add("text-[#64748B]", "bg-[#F1F2F4]");
    interviewB.classList.add("text-[#64748B]", "bg-[#F1F2F4]");
    rejectedB.classList.add("text-[#64748B]", "bg-[#F1F2F4]");


   selected.classList.remove("text-[#64748B]", "bg-[#F1F2F4]");
selected.classList.add("bg-[#3B82F6]");

}
