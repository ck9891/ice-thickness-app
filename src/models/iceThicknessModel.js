const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addIceThicknessData = async (userId, latitude, longitude, thickness, timestamp) => {
  return await prisma.iceThicknessData.create({
    data: {
      user_id: userId,
      latitude,
      longitude,
      thickness,
      timestamp,
    },
  });
};

const getIceThicknessData = async () => {
  return await prisma.iceThicknessData.findMany();
};

const getAggregatedIceThicknessData = async (timePeriod) => {
  return await prisma.aggregatedIceThicknessData.findMany({
    where: { time_period: timePeriod },
  });
};

module.exports = {
  addIceThicknessData,
  getIceThicknessData,
  getAggregatedIceThicknessData,
};
