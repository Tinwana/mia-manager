const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema(
    {
        name: { type: String, required:true},
        phone:{type: String, unique:true},
        address:{type: String},
        description:{type: String, default: ""}
    },
    {
        timestamps:true
    }
    );

    const Customer = mongoose.model("Customer",customerSchema);
    module.exports = Customer;
