import express from "express";
import config from "config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import userModel from "../models/Users/Users.js";
import beauticianModel from "../models/Beautician/Beautician.js";
import sendSMS from "../utils/sendSMS.js";
import sendEmail from "../utils/sendEmail.js";
import authMiddleware from "../middleware/auth.js";


let jwt_secret = config.get("JWT_SECRET");
let URL = config.get("SERVER_URL");

const router = express.Router()

router.post("/signup", async(req, res) => {
    try {
        const { fullname, email,password, phone, bookingDate, address } = req.body
        console.log( fullname, email,password, phone, bookingDate, address);

        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(200).json({msg: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        const emailToken = Math.random().toString(36).substring(2)
        const phoneToken = Math.random().toString(36).substring(2)

        const newUser = {
            fullname,
            email,
            password: hashedPassword,
            phone,
            bookingDate,
            address
        }

        await userModel.create(newUser)

        let emailData = {
            from: "Beautician",
            to: email,
            subject: "Email Verification",
            html: "<h1> Beautician <h1/> \n <p> Dear user, please verify your email by clicking on below link</p>\n",
            text: `${URL}/api/public/emailverify/${emailToken}`
        }

        sendEmail(emailData)
        let smsData = {
                body: `dear user, please verify your email here, ${URL}/api/public/phoneverify/${phoneToken}`,
                to: phone
        }

        sendSMS(smsData);
        console.log(`${URL}/api/public/emailverify/${emailToken}`);
        console.log(`${URL}/api/public/phoneverify/${phoneToken}`);
        res.status(200).json({ msg: `You will be registered as new customer once your verify your email and mobile via link provided on your email and phone number!🙌`}) 

    } catch (error) {
        console.log(error);
        
        res.status(500).json(error)
    }
})


router.get("/emailverify/:token", async (req, res) => {
    try {
        const  token  = req.params.token
        const user = await userModel.findOne({ "userVerifyToken.email": token });

        if (!user) {
            return res.status(400).json({ msg: "Invalid token." });
        }

        if (user.userVerified.email == true) {
            return res.status(400).json({ msg: "User email is already verified" })
        }

        user.userVerified.email = true
        user.userVerifyToken.email = null

        await user.save()

        res.status(200).json({ msg: "Email verified successfully"})

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})



router.get("/phoneverify/:token", async (req, res) => {
    try {

        const  token = req.params.token
        const user = await userModel.findOne({ "userVerifyToken.phone": token })

        if (!user) {
            return res.status(400).json({ msg: "Invalid phone verificationtoken" })
        }

        if (user.userVerified.phone == true) {
            return res.status(400).json({ msg: "User phone is already verified" })
        }
        user.userVerified.phone = true
        user.userVerifyToken.phone = null
        await user.save()
        res.status(200).json({ msg: "Phone verified successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})



router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        if (!user.userVerified.email == true) {
            return res.status(400).json({ msg: "Please verify your email before logging in." });
        }

        if (!user.userVerified.phone == true) {
            return res.status(400).json({ msg: "Please verify your phone before logging in." });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        const token = jwt.sign({ user }, jwt_secret, { expiresIn: "1d" });
        res.status(200).json({ msg: "User LoggedIn Successfully", token});

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})















router.post("/signup", async(req, res) => {
    try {
        const { fullname, email, password, phone, beauticianVerified, beauticianVerifyToken } = req.body
        console.log( fullname, email,password, phone, beauticianVerified, beauticianVerifyToken);

        const existingBeautician = await beauticianModel.findOne({email})
        if(existingBeautician){
            return res.status(200).json({msg: "Beautician already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        const emailToken = Math.random().toString(36).substring(2)
        const phoneToken = Math.random().toString(36).substring(2)

        const newBeautician = {
            fullname,
            email,
            password: hashedPassword,
            phone,
            beauticianVerified,
            beauticianVerifyToken: {
                email: emailToken,
                phone: phoneToken
            }
        }

        await beauticianModel.create(newBeautician)

        let emailData = {
            from: "Beautician",
            to: email,
            subject: "Email Verification",
            html: "<h1> Beautician <h1/> \n <p> Dear user, please verify your email by clicking on below link</p>\n",
            text: `${URL}/api/public/emailverify/${emailToken}`
        }

        sendEmail(emailData)
        let smsData = {
                body: `dear user, please verify your email here, ${URL}/api/public/phoneverify/${phoneToken}`,
                to: phone
        }

        sendSMS(smsData);
        console.log(`${URL}/api/public/emailverify/${emailToken}`);
        console.log(`${URL}/api/public/phoneverify/${phoneToken}`);
        res.status(200).json({ msg: `You will be registered as new customer once your verify your email and mobile via link provided on your email and phone number!🙌`}) 

    } catch (error) {
        console.log(error);
        
        res.status(500).json(error)
    }
})


router.get("/emailverify/:token", async (req, res) => {
    try {
        const  token  = req.params.token
        const beautician = await beauticianModel.findOne({ "beauticianVerifyToken.email": token });

        if (!beautician) {
            return res.status(400).json({ msg: "Invalid token." });
        }

        if (user.beauticianVerified.email == true) {
            return res.status(400).json({ msg: "Beautician email is already verified" })
        }

        user.beauticianVerified.email = true
        user.beauticianVerifyToken.email = null

        await beautician.save()

        res.status(200).json({ msg: "Email verified successfully"})

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})



router.get("/phoneverify/:token", async (req, res) => {
    try {

        const  token = req.params.token
        const beautician = await beauticianModel.findOne({ "userVerifyToken.phone": token })

        if (!beautician) {
            return res.status(400).json({ msg: "Invalid phone verificationtoken" })
        }

        if (beautician.beauticianVerified.phone == true) {
            return res.status(400).json({ msg: "Beautician phone is already verified" })
        }
        beautician.beauticianVerified.phone = true
        beautician.beauticianVerifyToken.phone = null
        await beautician.save()
        res.status(200).json({ msg: "Phone verified successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})



router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body
        const beautician = await beauticianModel.findOne({ email })
        if (!beautician) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        if (!beautician.beauticianVerified.email == true) {
            return res.status(400).json({ msg: "Please verify your email before logging in." });
        }

        if (!beautician.beauticianVerified.phone == true) {
            return res.status(400).json({ msg: "Please verify your phone before logging in." });
        }
        const isMatch = await bcrypt.compare(password, beautician.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        const token = jwt.sign({ beautician }, jwt_secret, { expiresIn: "1d" });
        res.status(200).json({ msg: "Beautician LoggedIn Successfully", token});

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})

export default router;




// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJWZXJpZmllZCI6ey
// JlbWFpbCI6dHJ1ZSwicGhvbmUiOnRydWV9LCJfaWQiOiI2N2I2YjVjOWJmODM0MzYzODZkMTI
// zZGUiLCJmdWxsbmFtZSI6InNuZWhhIiwiZW1haWwiOiJzbmVoYUBnbWFpbC5jb20iLCJwYXNzd29
// yZCI6IiQyYiQxMCR1UXNSc0tUVEpjQnVINHJIbFFzVzF1Qmw4ZFVFNXhBU3puTVROTERjMm5zSHdwL0t
// CNWZacSIsInBob25lIjoiKzkxNDc2NDM5ODIzNCIsImNyZWF0ZWRBdCI6IjIwMjUtMDItMjBUMDQ6NTU6MzcuOTA4
// WiIsInVwZGF0ZWRBdCI6IjIwMjUtMDItMjBUMDQ6NTU6MzcuOTA4WiIsIl9fdiI6MH0sImlhdCI6MTc0MDAyNzQ2NS
// wiZXhwIjoxNzQwMTEzODY1fQ.4vLNb2rRRoHN1ZkCJfHf_czVwW1b-1aenSoBCSAt0yk"