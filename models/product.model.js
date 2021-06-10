const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    Category: {
        type: String,
        minlength: 3,
        require: true
    },
    ImageURL: {
        type: String,
        minlength: 3,
        require: true
    },
    Brand : {
        type: String,
        minlength: 3,
        require: true
    },
    Model: {
        type: String,
        minlength: 3,
        require: true
    },
    Price: {
        type: Number,
        minlength: 3,
        require: true
    },
    Battery_life: {
        type: Number,
        minlength: 1,
        require: false
    },
    Battery_cell: {
        type: Number,
        minlength: 1,
        require: false
    },
    Processor: {
        type: String,
        minlength: 3,
        require: true
    },
    RAM: {
        type: String,
        minlength: 3,
        require: true
    },
    Graphics_Processor: {
        type: String,
        minlength: 3,
        require: true
    },
    Storage: {
        type: String,
        minlength: 3,
        require: true
    },
    Wi_Fi: {
        type: String,
        minlength: 3,
        require: true
    },
    Bluetooth: {
        type: Number,
        minlength: 3,
        require: false
    },
    WebCamera: {
        type: String,
        minlength: 1,
        require: false
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Product", productSchema);