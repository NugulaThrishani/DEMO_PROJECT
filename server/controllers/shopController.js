const Shop = require('../models/Shop');

async function getNearbyShops(req, res, next) {
  try {
    const lat = Number(req.query.lat);
    const lng = Number(req.query.lng);

    if (!Number.isFinite(lat) || !Number.isFinite(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      res.status(400);
      throw new Error('Valid lat and lng query parameters are required');
    }

    const shops = await Shop.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [lng, lat] },
          key: 'location',
          distanceField: 'distanceMeters',
          spherical: true
        }
      },
      { $limit: 5 },
      {
        $addFields: {
          distanceKm: { $round: [{ $divide: ['$distanceMeters', 1000] }, 1] }
        }
      },
      {
        $project: {
          name: 1,
          address: 1,
          phone: 1,
          hours: 1,
          distanceKm: 1
        }
      }
    ]);

    res.json(shops);
  } catch (error) {
    next(error);
  }
}

module.exports = { getNearbyShops };
