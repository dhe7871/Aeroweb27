let uaDisplayed = 2;
let visitsDisplayed = 2;

const controlArrow = document.querySelectorAll(".controlArrow");
console.log(controlArrow);

Array.from(controlArrow).forEach((arrow, idx) => {
    arrow.addEventListener("click", () => {
        switch (idx) {
            case 0:
                if (uaDisplayed + 2 <= Object.keys(data.useragent).length) {
                    uaDisplayed += 2;
                } else {
                    uaDisplayed = Object.keys(data.useragent).length;
                }
                console.log(uaDisplayed);
                break;
            case 1:
                if (visitsDisplayed + 2 <= visitcount) {
                    visitsDisplayed += 2;
                } else {
                    visitsDisplayed = visitcount;
                }
                console.log(visitsDisplayed);

                break;
        }
    });
});

const mapUAList = (data) => {
    return Object.values(data.useragent).map((ua, idx) => {
        return `<div style="padding-top: 1rem; padding-bottom: 1rem; ${
            idx !== Object.keys(data.useragent).length - 1
                ? `border-bottom: 1px dashed grey;`
                : ``
        }"><b>User-Agent ${idx + 1}: </b>${ua}</div>`;
    });
    // ;
};

export const addUserCard = (user, data) => {
    const userCard = document.querySelector(".userCard");
    userCard.innerHTML = `
            <div>
                <h3>User ${user.slice(4)}</h3>
                <h5>UID: <i>${data.uid}</i></h5>
            </div>
            <div>
                ${mapUAList(data)
                    .slice(0, uaDisplayed + 2)
                    .join("\n")}
                ${
                    Object.keys(data.useragent).length > 1
                        ? `<p style="text-align: center;"><span class="material-symbols-outlined controlArrow">${`arrow_downward`}</span></p>`
                        : ""
                }
            </div>
            <div>
                <p><b>Website Visit Count: </b>${data.visitcount}</p>
                <p><u><b>Visits</b></u></p>
                <div class="lastVisit" ${
                    data.visitcount > 1
                        ? `style="border-bottom: 1px dashed grey;"`
                        : ``
                }>
                    <p style="text-align: center;"><u>Visit-${Math.max(
                        ...Object.keys(data.visits)
                    )}</u></p>
                    <p>Entry: <i>${
                        data.visits[Math.max(...Object.keys(data.visits))].entry
                    }</i></p>
                    <p>Exit: <i>${
                        data.visits[Math.max(...Object.keys(data.visits))]
                            .exit || "-"
                    }</i></p>
                </div>
                ${
                    Object.keys(data.visits).length > 1
                        ? `<p style="text-align: center;"><span class="material-symbols-outlined controlArrow">arrow_downward</span></p>`
                        : ""
                }            
            </div>
            <div>
                <p style="text-align: center;"><b>Visited Semesters</b></p>
                ${
                    Object.values(data.semestersvisited).reduce((acc, cval) => {
                        return acc + cval;
                    }, 0)
                        ? Object.keys(data.semestersvisited)
                              .map((key) => {
                                  return Number(data.semestersvisited[key])
                                      ? `<p>${
                                            Number(key)
                                                ? `Semester ${key}`
                                                : `Books`
                                        }: ${
                                            data.semestersvisited[key]
                                        } times</p>`
                                      : "";
                              })
                              .join("\n")
                        : `<p>No Semester is Visited Yet...</p>`
                }
            </div>
    `;
};