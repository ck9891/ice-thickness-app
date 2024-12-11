const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addAggregatedIceThicknessData = async (latitude, longitude, average_thickness, time_period) => {
  return await prisma.aggregatedIceThicknessData.create({
    data: {
      latitude,
      longitude,
      average_thickness,
      time_period,
    },
  });
};

const getAggregatedIceThicknessData = async (timePeriod) => {
  return await prisma.aggregatedIceThicknessData.findMany({
    where: { time_period: timePeriod },
  });
};

module.exports = {
  addAggregatedIceThicknessData,
  getAggregatedIceThicknessData,
};
