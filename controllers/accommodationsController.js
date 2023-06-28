const Accommodation = require('../models/Accommodation')
const asyncHandler = require('express-async-handler')

const getAllAccommodations = asyncHandler(async (req, res) => {
  res.json( await Accommodation.find())
})

const getAccommodation = asyncHandler( async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ 'message': 'Accomodation ID required.' });

  const accommodation = await Accommodation.findOne({ _id: req.params.id }).exec();
  if (!accommodation) {
    return res.status(204).json({ "message": `No accommodation matches ID ${req.params.id}.` });
  }
  res.json(accommodation);
})

module.exports = {
  getAllAccommodations,
  getAccommodation,
}