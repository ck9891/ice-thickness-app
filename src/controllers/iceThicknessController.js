const prisma = require('../prismaClient');

const addIceThicknessData = async (req, res) => {
  const { userId, latitude, longitude, thickness, timestamp } = req.body;

  try {
    const iceThicknessData = await prisma.iceThicknessData.create({
      data: {
        user_id: userId,
        latitude,
        longitude,
        thickness,
        timestamp,
      },
    });

    res.status(201).json({ message: 'Ice thickness data added successfully', iceThicknessData });
  } catch (error) {
    res.status(500).json({ message: 'Error adding ice thickness data', error });
  }
};

const getIceThicknessData = async (req, res) => {
  try {
    const iceThicknessData = await prisma.iceThicknessData.findMany();

    res.status(200).json({ iceThicknessData });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ice thickness data', error });
  }
};

const getAggregatedIceThicknessData = async (req, res) => {
  const { timePeriod } = req.query;

  try {
    const aggregatedData = await prisma.aggregatedIceThicknessData.findMany({
      where: { time_period: timePeriod },
    });

    res.status(200).json({ aggregatedData });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching aggregated ice thickness data', error });
  }
};

module.exports = {
  addIceThicknessData,
  getIceThicknessData,
  getAggregatedIceThicknessData,
};
