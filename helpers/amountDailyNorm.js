const amountDailyNorm = ({ amountOfDay, dailyNorm }) => {
  // Повертаємо 0, якщо масив порожній
  if (amountOfDay.length === 0) {
    return 0;
  }

  const norm = dailyNorm === "" ? 1.8 : norm;

  const amount = amountOfDay.reduce(
    (acc, { waterVolume }) => acc + waterVolume,
    0
  );

  return Math.floor((amount / (norm * 1000)) * 100);
};

module.exports = amountDailyNorm;
