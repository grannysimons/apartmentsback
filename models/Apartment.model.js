const {Schema, model} = require("mongoose");

const apartmentSchema = new Schema({
    img: String,
    pricePerDay: Number,
    title: String
}, {
    timestamps: true
});

const Apartment = model("Apartment", apartmentSchema);

module.exports = Apartment;