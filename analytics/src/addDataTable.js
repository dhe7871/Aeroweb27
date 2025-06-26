import { tbody } from "./script.js";
import { totalTimeSpent } from "./totalTimeSpent.js";

export const addDataTable = (keys, data) => {
    const dataDiv = document.querySelector(".dataDiv");

    let ttSpent = totalTimeSpent(data);
    keys.forEach((key) => {
        let semesterVisits = Object.values(data[key]["semestersvisited"]);
        let visits = Object.values(data[key]["visits"]);

        let tr = document.createElement("tr");
        tr.setAttribute("style", "height: 5vh;");
        tr.innerHTML = `
            <td><a class="uname">${key}</a></td>
            <td>${data[key]["visitcount"]}</td>
            <td>${ttSpent[key] ? ttSpent[key] : "-"}</td>
            <td>${
                Math.max(...semesterVisits)
                    ? semesterVisits.indexOf(Math.max(...semesterVisits))
                    : "-"
            }</td>
            <td>${visits[visits.length - 1]["entry"]}</td>
        `;
        tr.classList.add("dataLine");
        tbody.appendChild(tr, "beforeend");
    });

    dataDiv.style.opacity = "1";
    dataDiv.style.transform = "translateY(0)";
};

function whatsapp(){
    console.log("hello chatgpt")
}