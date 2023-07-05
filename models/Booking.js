const mongoose = require('mongoose')
const {Schema} = mongoose

const BookingSchema = new Schema({
  accommodationId: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Accommodation'},
  userId: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'User'},
  checkIn: {type:Date, required:true},
  checkOut: {type:Date, required:true},
  name: {type:String, required:true},
  mobileNumber: {type:String, required:true},
  price: Number
})

module.exports = mongoose.model('Booking', BookingSchema)