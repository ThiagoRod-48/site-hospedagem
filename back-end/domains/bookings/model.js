import { model, Schema } from "mongoose";

const bookingSchema = new Schema({
  place: { type: Schema.Types.ObjectId, ref: "place" },
  user: { type: Schema.Types.ObjectId, ref: "user" },
  price: Number,
  total: Number,
  checkin: String,
  checkout: String,
  guests: Number,
  nights: Number,
});

export default model("booking", bookingSchema);
