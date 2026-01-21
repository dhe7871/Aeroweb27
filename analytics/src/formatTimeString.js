const monthMap = new Map([
    ["January", "JAN"],
    ["February", "FEB"],
    ["March", "MAR"],
    ["April", "APR"],
    ["May", "MAY"],
    ["June", "JUN"],
    ["July", "JUL"],
    ["August", "AUG"],
    ["September", "SEP"],
    ["October", "OCT"],
    ["November", "NOV"],
    ["December", "DEC"],
]);

export const formatTimeString = (timeStr) => {
    const timeStrArr = timeStr.split(" ");
    const newTimeStrArr = timeStrArr.map((e) => e);
    newTimeStrArr[0] = newTimeStrArr[0].slice(0, 5);
    newTimeStrArr[3] = monthMap.get(newTimeStrArr[3]);
    newTimeStrArr[4] = "'" + newTimeStrArr[4].slice(2);
    return newTimeStrArr.join(" ");
};
