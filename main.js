var initalData = {
   name: " ",
   townName: " ",
   gameStarted: false,
   yearsArePassing: true,
   years: 0,
   // Prosperity Marks
   wealth: 50,
   population: 50,
   land: 50,
   happiness: 50,
   military: 50,
   diplomacy: 50,
}
var data = initalData;

let saveLoop = window.setInterval(function() { localStorage.setItem("data", JSON.stringify(data)); }, 1000);
data = JSON.parse(localStorage.getItem("data"));

/*
document.querySelector(".import-save").addEventListener("keydown", function (e) {
   if (e.keyCode === 13) {
      data = document.querySelector(".import-save").value;
   }
});
*/

clearIssue();
landing();
function landing() {
   if (data.gameStarted === true) {
      document.querySelector(".start").remove();
      document.querySelector(".game").style.display = "grid";
   }
}

function startGame() {
   data.townName = prompt("What shall your town be called?");
   data.name = prompt("What shall your people call you?");
   alert(`Hail ${data.name}, Mayor of ${data.townName}!`);
   data.gameStarted = true;
   document.querySelector(".start").remove();
   document.querySelector(".game").style.display = "grid";
}

function restart() {
   let areYouSure = confirm("Are you sure you want to restart?");
   if (areYouSure === true) {
      let areYouReallySure = confirm("Positive?");
      if (areYouReallySure === true) {
         // Save
         localStorage.setItem("data", JSON.stringify(initalData));
         data = JSON.parse(localStorage.getItem("data"));
         // Reload
         location.reload();
      }
   }
}

setInterval(() => {
   data.years++;
   let newPeople = parseInt((data.population * .01).toFixed(0));
   data.population += newPeople;
   let newWealth = parseInt((data.land * .01).toFixed(0));
   data.wealth += newWealth;
   let lostWealth = parseInt((data.military * .01).toFixed(0));
   data.wealth -= lostWealth;
   let newHappiness = parseInt((data.wealth * .01).toFixed(0));
   data.happiness += newHappiness;
   // if (data.yearsArePassing === true) { }
}, 30000)

function createIssue(issue, option1, option1Details, option1Effect, option2, option2Details, option2Effect, option3, option3Details, option3Effect, option4, option4Details, option4Effect) {
   document.querySelector(".current-issue").textContent = issue;
   document.querySelector(".option-1-button").textContent = option1;
   document.querySelector(".option-1-button").setAttribute("onclick", `${option1Effect}; clearIssue();`);
   document.querySelector(".option-1-effects").textContent = option1Details;
   document.querySelector(".option-2-button").textContent = option2;
   document.querySelector(".option-2-button").setAttribute("onclick", `${option2Effect}; clearIssue();`);
   document.querySelector(".option-2-effects").textContent = option2Details;
   document.querySelector(".option-3-button").textContent = option3;
   document.querySelector(".option-3-button").setAttribute("onclick", `${option3Effect}; clearIssue();`);
   document.querySelector(".option-3-effects").textContent = option3Details;
   document.querySelector(".option-4-button").textContent = option4;
   document.querySelector(".option-4-button").setAttribute("onclick", `${option4Effect}; clearIssue();`);
   document.querySelector(".option-4-effects").textContent = option4Details;
   data.yearsArePassing = false;
}

function clearIssue() {
   document.querySelector(".current-issue").textContent = " ";
   document.querySelector(".option-1-button").textContent = " ";
   document.querySelector(".option-1-button").setAttribute("onclick", ` `);
   document.querySelector(".option-1-effects").textContent = " ";
   document.querySelector(".option-2-button").textContent = " ";
   document.querySelector(".option-2-button").setAttribute("onclick", ` `);
   document.querySelector(".option-2-effects").textContent = " ";
   document.querySelector(".option-3-button").textContent = " ";
   document.querySelector(".option-3-button").setAttribute("onclick", ` `);
   document.querySelector(".option-3-effects").textContent = " ";
   document.querySelector(".option-4-button").textContent = " ";
   document.querySelector(".option-4-button").setAttribute("onclick", ` `);
   document.querySelector(".option-4-effects").textContent = " ";
   data.yearsArePassing = true;
}

setInterval(() => {
   document.querySelector(".years").textContent = `${data.name} has been Mayor of ${data.townName} for ${data.years} Years.`;
   document.querySelector("#wealth").textContent = data.wealth;
   document.querySelector("#population").textContent = data.population;
   document.querySelector("#land").textContent = data.land;
   document.querySelector("#happiness").textContent = data.happiness;
   document.querySelector("#military").textContent = data.military;
   document.querySelector("#diplomacy").textContent = data.diplomacy;
}, 250)

function openInfo(obj) {
   let modalID = "#info" + obj;
   if (document.querySelector(modalID).style.opacity === "1") { hideObj(modalID); }
   else { showObj(modalID); }
}

function hideObj(objId) {
   document.querySelector(objId).style.opacity = "0";
   document.querySelector(objId).style.pointerEvents = "none";
   document.querySelector(objId).style.zIndex = "0";
}

function showObj(objId) {
   document.querySelector(objId).style.opacity = "1";
   document.querySelector(objId).style.pointerEvents = "auto";
   document.querySelector(objId).style.zIndex = "1";
}

var possibleIssues = ["i1", "i2"]
var issueToRun = possibleIssues[Math.floor(Math.random() * possibleIssues.length)];

switch (issueToRun) {
	case "i1": createIssue("A foreign nation is looking at you funny! What shall you do!", "Declare War", "Wealth -25, Population -50, Happiness -25, Diplomacy -25, Land +50, Millitary +50", "data.wealth -= 25; data.population -= 50; data.happiness -= 25; data.diplomacy -= 25; data.land += 50; data.military += 50;", "Denounce", "Happiness -10, Military +10, Diplomacy -50", "data.happiness -= 10; data.military += 10; data.diplomacy -= 50;", "Improve Relations", "Diplomacy +50, Military -25, Happiness +25", "data.diplomacy += 50; data.military -= 25; data.happiness += 25;", "Pay for Peace", "Land -10, Diplomacy + 10, Wealth -50", "data.land -= 10; data.diplomacy += 10; data.wealth -= 50;"); break;
	case "i2": createIssue("The people are revolting!", "Kill them", "Wealth +10, Population -50, Happiness -50, Millitary +50", "data.wealth += 10; data.population -= 50; data.happiness -= 50; data.military += 50;", "Run", "Leave Town", "restart()", "Negotiate Terms", "Diplomacy +10, Military -10, Happiness +10, Wealth -25", "data.diplomacy += 10; data.military -= 10; data.happiness += 10; data.wealth -= 25'", "Break off Country", "Land -50, Wealth -25, Population -50", "data.land -= 50; data.wealth -= 25; data.population -= 50"); break;
}

// Show town name and player name on main page


createIssue("Descrition of issue", "Option 1", "Option 1 Effect", "Option 1 Code data.wealth -= 25; data.population -= 50;", "Denounce", "Happiness -10, Military +10, Diplomacy -50", "Option 2", "Option 2 Effect", "Option 2 Code data.wealth -= 25; data.population -= 50;", "Denounce", "Happiness -10, Military +10, Diplomacy -50", "Option 3", "Option 3 Effect", "Option 3 Code data.wealth -= 25; data.population -= 50;", "Denounce", "Happiness -10, Military +10, Diplomacy -50", "Option 4", "Option 4 Effect", "Option 4 Code data.wealth -= 25; data.population -= 50;", "Denounce", "Happiness -10, Military +10, Diplomacy -50");
