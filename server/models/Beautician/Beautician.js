import mongoose from "mongoose";

const beauticianSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phone: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    beauticianVerified: {
        email: {
            type: Boolean,
            default: false,
        },
        phone: {
            type: Boolean,
            default: false,
        }
    },
    beauticianVerifyToken: {
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
    }
},
{
    timestamps: true,
})

const beauticianModel = mongoose.model("beauticians", beauticianSchema, "beautician")
export default beauticianModel