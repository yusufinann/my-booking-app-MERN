import mongoose from "mongoose";
const { Schema } = mongoose;

const bookingSchema = new Schema({
  place: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Place'},
  user: {type:mongoose.Schema.Types.ObjectId, required:true},
  checkIn: {type:Date, required:true},
  checkOut: {type:Date, required:true},
  name: {type:String, required:true},
  phone: {type:String, required:true},
  price: Number,
});

const BookingModel = mongoose.model('Booking', bookingSchema);

export default BookingModel;