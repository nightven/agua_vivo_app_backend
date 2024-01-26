const amountDailyNorm = (amountOfDay, dailyNorm = 2000) => {
  // Повертаємо 0, якщо масив порожній
  if (amountOfDay.length === 0) {
    return 0;
  }

  const amount = amountOfDay.reduce(
    (acc, { waterVolume }) => acc + waterVolume,
    0
  );

  return Math.floor((amount / dailyNorm) * 100);
};

module.exports = amountDailyNorm;
