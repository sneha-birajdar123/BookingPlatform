import express from "express"
import beauticianModel from "../../models/Beautician/Beautician.js"

const router = express.Router()

router.get("/getallbeauticians", async(req, res) => {
    try {
        const beauticians = await beauticianModel.find({})
        res.status(200).json({msg: "beauticians retrieved successfully", beauticians})
    } catch (error) {
        res.status(500).json({msg: error})
    }
})

router.get("/getone/:id", async(req, res) => {
    try {
        const beauticianId = req.params.id
        let getOne = await beauticianModel.find({_id: beauticianId})
        res.status(200).json({msg: getOne})
    } catch (error) {
        res.status(500).json({msg: error})
    }
})

router.put("/update/:id", async(req, res) => {
    try {
        const beauticianId = req.params.id
        let beauticianData = req.body
        await beauticianModel.updateOne({_id: beauticianId}, {$set: beauticianData})
        res.status(200).json({msg: "Beautician updated successfully"})
    } catch (error) {
        res.status(500).json({msg: error})
    }
})



router.delete("/deleteone/:id", async (req, res) => {
    try {
        let beauticianId = req.params.id
        await beauticianModel.deleteOne({ _id: beauticianId })
        res.status(200).json({ msg: "Beautician deleted successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})

router.delete("/deleteall", async (req, res) => {
    try {
        await beauticianModel.deleteMany()
        res.status(200).json({ msg: "Deleted all beauticians" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})

export default router