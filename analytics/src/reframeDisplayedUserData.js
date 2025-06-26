import { dataTogBtns, tbody } from "./script.js";
import { userdata } from "./fetchUserData.js";
import { addDataTable } from "./addDataTable.js";
import { totalTimeSpent } from "./totalTimeSpent.js";

export const reframeDisplayedUserData = () => {
    dataTogBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const dataDiv = document.querySelector('.dataDiv');
            let len = Object.keys(userdata).length;
            
            dataDiv.style.opacity = "0";
            dataDiv.style.transform = "translateY(-10vh)";
            setTimeout(()=>{
                if (btn.classList.contains("recVis")) {
                    tbody.innerHTML = "";
                    let keys;
                    let tmp = Array.from(
                        { length: len },
                        (_, i) =>
                            Object.values(
                                userdata[`user${i + 1}`]["visits"]
                            ).at(-1)["entryepoch"]
                    );
                    let lastEpoch = [...tmp].sort();

                    keys = Array.from(
                        { length: tmp.length },
                        (_, i) => `user${tmp.indexOf(lastEpoch[i]) + 1}`
                    ).reverse();

                    addDataTable(keys, userdata);
                } else if (btn.classList.contains("mtSpent")) {
                    tbody.innerHTML = "";
                    let keys = [];
                    let ttSpentObj = totalTimeSpent(userdata);
                    let ttSpent = Array.from(
                        { length: len },
                        (_, i) => ttSpentObj[`user${i + 1}`]
                    );
                    let tmp = [...ttSpent].sort((a, b) => a - b);

                    while (tmp.length) {
                        const index = ttSpent.indexOf(tmp.pop());
                        keys.push(`user${index + 1}`);
                        delete ttSpent[index]; //makes the value at particular index undefined
                    }

                    addDataTable(keys, userdata);
                } else {
                    tbody.innerHTML = "";
                    let keys = Array.from(
                        { length: len },
                        (_, i) => `user${i + 1}`
                    );
                    addDataTable(keys, userdata);
                }
            }, 800); 
        });
    });
};