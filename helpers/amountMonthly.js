const amountMonthly = (waterOfMonth) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  console.log(waterOfMonth);
  const groupedOfMeals = waterOfMonth.map((waterDay) => {
    const month = waterDay.date.getMonth();
    const day = waterDay.date.getDate();
    return {
      id: waterDay._id,
      date: `${months[month]}, ${day}`,
      amountOfWater: waterDay.entries.length,
      dailyNorma: waterDay.dailyNorma,
      percentage: Math.floor(
        (waterDay.totalVolume / (waterDay.dailyNorma * 1000)) * 100
      ),
    };
  });
  return groupedOfMeals;
};

module.exports = amountMonthly;
