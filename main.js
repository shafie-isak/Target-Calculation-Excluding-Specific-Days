function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
  function isValidWorkingDay(date) {
    const dayOfWeek = date.getDay(); 
    return dayOfWeek !== 5;
  }

  function getWorkingDaysInMonth(year, month) {
    const daysInMonth = new Date(year, month + 1, 0).getDate(); 
    let validWorkingDays = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      if (isValidWorkingDay(currentDate)) {
        validWorkingDays++;
      }
    }

    return validWorkingDays;
  }

 
  function getWorkingDaysInRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let workingDays = 0;

    for (let currentDate = new Date(start); currentDate <= end; currentDate.setDate(currentDate.getDate() + 1)) {
      if (isValidWorkingDay(currentDate)) {
        workingDays++;
      }
    }

    return workingDays;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  let daysExcludingFridays = [];
  let daysWorkedExcludingFridays = [];
  let monthlyTargets = [];
  let totalWorkingDaysInRange = 0;

  let currentDate = new Date(start);
  while (currentDate <= end) {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    if (lastDayOfMonth > end) lastDayOfMonth.setDate(end.getDate()); 

    const workingDaysInMonth = getWorkingDaysInMonth(currentYear, currentMonth);
    daysExcludingFridays.push(workingDaysInMonth);

    const startOfMonth = currentDate;
    const daysInThisMonthRange = Math.min(lastDayOfMonth, end);
    let workedDaysInMonthRange = 0;
    for (let date = new Date(startOfMonth); date <= daysInThisMonthRange; date.setDate(date.getDate() + 1)) {
      if (isValidWorkingDay(date)) {
        workedDaysInMonthRange++;
      }
    }
    daysWorkedExcludingFridays.push(workedDaysInMonthRange);

    totalWorkingDaysInRange += workedDaysInMonthRange;

    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  daysWorkedExcludingFridays.forEach((daysWorked, index) => {
    const proportion = daysWorked / totalWorkingDaysInRange;
    const targetForMonth = totalAnnualTarget * proportion;
    monthlyTargets.push(targetForMonth);
  });

  const totalTarget = monthlyTargets.reduce((acc, target) => acc + target, 0);

  return {
    daysExcludingFridays,
    daysWorkedExcludingFridays,
    monthlyTargets,
    totalTarget,
  };
}


const result = calculateTotalTarget('2024-01-01', '2024-03-31', 5220);
console.log(result);
