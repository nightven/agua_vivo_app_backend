const amountMonthly = (amountOfMonth, dailyNorm) => {
  const groupedAmountOfDay = amountOfMonth.reduce((acc, obj) => {
    const foundIndex = acc.findIndex((item) => item[0].day === obj.day);

    if (foundIndex !== -1) {
      acc[foundIndex].push(obj);
    } else {
      acc.push([obj]);
    }

    return acc;
  }, []);

  const groupedOfMeals = groupedAmountOfDay.map((group) => ({
    day: group[0].day,
    dailyNorm,
    percentage: Math.floor((group.reduce((total, obj) => total + obj.waterVolume, 0) / dailyNorm) * 100),
    numberOfMeals: group.length,
  
  }));
  return groupedOfMeals ;
};

module.exports = amountMonthly;
