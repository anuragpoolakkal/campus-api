import jwt from "jsonwebtoken";
//Models
import userModel from "../models/User.js";
import adminModel from "../models/Admin.js";
import facultyModel from "../models/Faculty.js";
import studentModel from "../models/Student.js";
import parentModel from "../models/Parent.js";
import collegeModel from "../models/College.js";
import principalModel from "../models/Principal.js";

//Any user (admin, principal, faculty, student, parent) can access this route
//College details will be added to req.user.college
const validateUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (token == null) return res.status(401).send("Unauthorized");

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).send("Unauthorized");
        const userData = await userModel.findById(user.id).lean();
        if (!userData) {
            return res.status(401).send("Unauthorized");
        }

        req.user = userData;

        if (userData.role === "admin") {
            const admin = await adminModel.findOne({ userId: userData._id }).lean();
            req.user.college = await collegeModel.findOne({ _id: admin.collegeId }).lean();
        } else if (userData.role === "principal") {
            const principal = await principalModel.findOne({ userId: userData._id }).lean();
            req.user.college = await collegeModel.findOne({ _id: principal.collegeId }).lean();
        } else if (userData.role === "faculty") {
            const faculty = await facultyModel.findOne({ userId: userData._id }).lean();
            req.user.college = await collegeModel.findOne({ _id: faculty.collegeId }).lean();
        } else if (userData.role === "student") {
            const student = await studentModel.findOne({ userId: userData._id }).lean();
            req.user.college = await collegeModel.findOne({ _id: student.collegeId }).lean();
        } else if (userData.role === "parent") {
            const parent = await parentModel.findOne({ userId: userData._id }).lean();
            req.user.college = await collegeModel.findOne({ _id: parent.collegeId }).lean();
        }
        next();
    });
};

//Only admin can access this route
//Admin details will be added to req.user.admin
//College details will be added to req.user.college
const validateAdmin = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (token == null) return res.status(401).send("Unauthorized");

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).send("Unauthorized");
        const userData = await userModel.findById(user.id).lean();

        if (!userData || userData.role !== "admin") {
            return res.status(401).send("Unauthorized");
        }

        req.user = userData;
        req.user.admin = await adminModel.findOne({ userId: userData._id }).lean();
<<<<<<< HEAD

        if (req.admin) {
            req.user.college = await collegeModel.findById(req.admin.collegeId).lean();
=======
        if (req.user.admin) {
            req.user.college = await collegeModel.findById(req.user.admin.collegeId).lean();
>>>>>>> 7cbbb3c080c9d6c327a7133c187cecc597559f14
        }
        next();
    });
};

//Only principal can access this route
//Principal details will be added to req.user.principal
//College details will be added to req.user.college
const validatePrincipal = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (token == null) return res.status(401).send("Unauthorized");

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).send("Unauthorized");
        const userData = await userModel.findById(user.id).lean();
        if (!userData || userData.role !== "principal") {
            return res.status(401).send("Unauthorized");
        }

        req.user = userData;
        req.user.principal = await principalModel.findOne({ userId: userData._id }).lean();
        if (req.user.principal) {
            req.user.college = await collegeModel.findById(req.principal.collegeId).lean();
        }
        next();
    });
};

//Only faculty can access this route
//Faculty details will be added to req.user.faculty
//College details will be added to req.user.college
const validateFaculty = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (token == null) return res.status(401).send("Unauthorized");

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).send("Unauthorized");
        const userData = await userModel.findById(user.id).lean();

        if (!userData || userData.role !== "faculty") {
            return res.status(401).send("Unauthorized");
        }

        req.user = userData;
        req.user.faculty = await facultyModel.findOne({ userId: userData._id }).lean();
        if (req.user.faculty) {
            req.user.college = await collegeModel.findOne({ _id: req.faculty.collegeId }).lean();
        }
        next();
    });
};

//Only student can access this route
//Student details will be added to req.user.student
//College details will be added to req.user.college
const validateStudent = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (token == null) return res.status(401).send("Unauthorized");

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).send("Unauthorized");
        const userData = await userModel.findById(user.id).lean();
        if (!userData || userData.role !== "student") {
            return res.status(401).send("Unauthorized");
        }

        req.user = userData;
        req.user.student = await studentModel.findOne({ userId: userData._id }).lean();
        if (req.user.student) {
            req.user.college = await collegeModel.findById(req.student.collegeId).lean();
        }
        next();
    });
};

//Only parent can access this route
//Parent details will be added to req.user.parent
//Student details will be added to req.user.parent.student
//College details will be added to req.user.college
const validateParent = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (token == null) return res.status(401).send("Unauthorized");

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).send("Unauthorized");
        const userData = await userModel.findById(user.id).lean();
        if (!userData || userData.role !== "parent") {
            return res.status(401).send("Unauthorized");
        }

        req.user = userData;
        req.user.parent = await parentModel.findOne({ userId: userData._id }).lean();
        if (req.user.parent) {
            req.user.parent.student = await studentModel
                .findOne({ _id: req.parent.studentId })
                .lean();
        }
        if (req.user.parent.student) {
            req.user.college = await collegeModel
                .findOne({ _id: req.parent.student.collegeId })
                .lean();
        }
        next();
    });
};

export {
    validateUser,
    validateAdmin,
    validatePrincipal,
    validateFaculty,
    validateStudent,
    validateParent,
};
