import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        // required: true
    },
    bookingDate: {
        date: Date
    },
    address: {
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String
        }
    },
    userVerified: {
        email: {
            type: Boolean,
            default: false,
        },
        phone: {
            type: Boolean,
            default: false,
        },
    },
    userVerifyToken: {
        email: {
            type: String,

        },
        phone: {
            type: String,

        },
    }
    
},
{
 timestamps: true
})

const userModel = mongoose.model("users", userSchema, "users");
export default userModel;