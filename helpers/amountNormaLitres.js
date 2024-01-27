const amountNormaLitres = (gender, weight, sportTime) => {
  const waterNorm =
    gender === "Woman"
      ? weight * 0.03 + sportTime * 0.4
      : weight * 0.04 + sportTime * 0.6;

  return waterNorm.toFixed(1);
};

module.exports = amountNormaLitres;
