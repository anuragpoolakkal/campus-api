import joi from "joi";
import Admin from "../models/Admin";
import College from "../models/College";

// Get college by collegeId
const getCollegeById = async (req, res) => {
    const schema = joi.object({
        collegeId: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const college = await College.findById(data.collegeId);
        if (!college) {
            return res.status(404).json({ message: "College not found", success: false });
        }

        //Check if the college belongs to the user
        if (college._id != req.user.college._id) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        return res.status(200).json({ data: college, success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

// Create a new college and assign it to the admin
const createCollege = async (req, res) => {
    const schema = joi.object({
        name: joi.string().required(),
        address: joi.string().required(),
        phone: joi.string().required(),
        email: joi.string().email(),
        vision: joi.string(),
        mission: joi.string(),
        adminId: joi.string().required(),
    });

    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);

        // Check if the admin already has a college
        if (req.user.admin || req.user.college) {
            return res.status(401).json({ message: "Admin already has a college", success: false })
        }

        const college = new College({
            name: data.name,
            address: data.address,
            phone: data.phone,
            email: data.email,
            vision: data.vision,
            mission: data.mission,
            adminId: data.adminId,
        });

        await college.save();

        //Assign college to admin
        const newAdmin = await Admin({
            userId: req.user._id,
            collegeId: college._id,
        });

        await newAdmin.save();

        return res.status(201).json({
            message: "College registered successfully",
            data: college,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

// Update college details
const updateCollege = async (req, res) => {
    const schema = joi.object({
        collegeId: joi.string().required(),
        name: joi.string().required(),
        address: joi.string().required(),
        phone: joi.string().required(),
        email: joi.string().email(),
        vision: joi.string(),
        mission: joi.string(),
    });

    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);

        const college = await College.findById(data.collegeId);
        if (!college) {
            return res.status(404).json({ message: "College not found", success: false });
        }

        //Check if the college belongs to the admin
        if (college._id != req.user.college._id) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        await College.findByIdAndUpdate(data.collegeId, {
            name: data.name,
            address: data.address,
            phone: data.phone,
            email: data.email,
            vision: data.vision,
            mission: data.mission,
        });

        await college.save();

        return res.status(201).json({
            message: "College updated successfully",
            data: college,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

// Delete college
const deleteCollege = async (req, res) => {
    const schema = joi.object({
        collegeId: joi.string().required(),
    });

    try {
        //Validate request body
        const data = await schema.validateAsync(req.body);

        const college = await College.findById(data.collegeId);
        if (!college) {
            return res.status(404).json({ message: "College not found", success: false });
        }

        //Check if the college belongs to the admin
        if (college._id != req.user.college._id) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        await College.findByIdAndDelete(data.collegeId);

        //Unassign college from admin
        await Admin.findOneAndDelete({ collegeId: data.collegeId });

        return res.status(200).json({ message: "College deleted successfully", success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

export {
    getCollegeById,
    createCollege,
    updateCollege,
    deleteCollege
}