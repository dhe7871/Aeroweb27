import { tbody, attachEventListeners } from "./script.js";
import { addDataTable } from "./addDataTable.js";

let userdata;
async function getUserData() {
    try {
        const response = await fetch(
            "https://aerowebapi-g8e0crb4ekhsgddg.centralindia-01.azurewebsites.net/getUserData"
        );
        if (!response.ok) {
            console.error("Something gone wrong!");
        }
        const res = await response.json();
        return res;
    } catch (err) {
        console.error("Something again gone wrong!");
    }
}

getUserData().then((data) => {
    userdata = data;
    tbody.innerHTML = ``;
    let keys = Array.from(
        { length: Object.keys(data).length },
        (_, i) => `user${i + 1}`
    );
    addDataTable(keys, data);
    attachEventListeners();
});

export { userdata };