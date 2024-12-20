"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeRelated = void 0;
const timeToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return {
        hours,
        minutes,
        totalMinutes: hours * 60 + minutes,
    };
};
const minutesToTime = (mintues) => {
    const h = (Math.floor(mintues / 60));
    let hours = h.toString();
    if (hours.length == 1) {
        hours = `0${hours}`;
    }
    let mins = (mintues % 60).toString();
    if (mins.length == 1) {
        mins = `0${mins}`;
    }
    return `${hours}:${mins}`;
};
exports.timeRelated = {
    timeToMinutes,
    minutesToTime,
};
