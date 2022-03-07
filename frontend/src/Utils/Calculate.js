import React from "react";
import { secondsToHours, secondsToMinutes } from "date-fns";

function Calculate(totalSum, fdSum) {
  let totalMinutes = 0;
  let fdMinutes = 0;
  let totalHours = 0;
  let fdHours = 0;

  if (totalSum >= 60) {
    totalMinutes = secondsToMinutes(totalSum);
    if (totalMinutes >= 60) {
      totalHours = secondsToHours(totalSum);
    }
  }
  if (fdSum >= 60) {
    fdMinutes = secondsToMinutes(fdSum);
    if (fdMinutes >= 60) {
      fdHours = secondsToHours(fdSum);
    }
  }

  const sums = {
    totalSums: {
      totalSum: totalSum,
      totalMinutes: totalMinutes,
      totalHours: totalHours,
    },
    fdSums: { fdSum: fdSum, fdMinutes: fdMinutes, fdHours: fdHours },
  };

  return sums;
}

export default Calculate;
