import { string } from "zod";

const timeToMinutes = (timeString: string) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  return {
    hours,
    minutes,
    totalMinutes: hours * 60 + minutes,
  };
};

const minutesToTime = (mintues: number) => {
  let h = (Math.floor(mintues / 60));
  let hours = h.toString();
  if(hours.length==1){
    hours = `0${hours}`;
  }
  let mins = (mintues % 60).toString();
  if(mins.length==1){
    mins = `0${mins}`;
  }
  return `${hours}:${mins}`;
};

export const timeRelated = {
  timeToMinutes,
  minutesToTime,
};
