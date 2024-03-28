import jwt from "jsonwebtoken";
//Models
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import Faculty from "../models/Faculty.js";
import Student from "../models/Student.js";
import Parent from "../models/Parent.js";
import College from "../models/College.js";
import Principal from "../models/Principal.js";

//Any user (admin, principal, faculty, student, parent) can access this route
//College details will be added to req.user.college
const validateUser = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.status(401).send("Unauthorized");

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).send("Unauthorized");
        const userData = await User.findOne({ _id: user }).lean();
        if (!userData) {
            return res.status(401).send("Unauthorized");
        }

        req.user = userData;
        if (userData.role === "admin") {
            const admin = await Admin.findOne({ userId: userData._id }).lean();
            req.user.college = await College.findOne({ _id: admin.collegeId }).lean();
        }
        else if (userData.role === "principal") {
            const principal = await Principal.findOne({ userId: userData._id }).lean();
            req.user.college = await College.findOne({ _id: principal.collegeId }).lean();
        }
        else if (userData.role === "faculty") {
            const faculty = await Faculty.findOne({ userId: userData._id }).lean();
            req.user.college = await College.findOne({ _id: faculty.collegeId }).lean();
        }
        else if (userData.role === "student") {
            const student = await Student.findOne({ userId: userData._id }).lean();
            req.user.college = await College.findOne({ _id: student.collegeId }).lean();
        }
        else if (userData.role === "parent") {
            const parent = await Parent.findOne({ userId: userData._id }).lean();
            req.user.college = await College.findOne({ _id: parent.collegeId }).lean();
        }
        next();
    });
};

//Only admin can access this route
//Admin details will be added to req.user.admin
//College details will be added to req.user.college
const validateAdmin = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.status(401).send("Unauthorized");

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).send("Unauthorized");
        const userData = await User.findOne({ _id: user }).lean();
        if (!userData || userData.role !== "admin") {
            return res.status(401).send("Unauthorized");
        }

        req.user = userData;
        req.user.admin = await Admin.findOne({ userId: userData._id }).lean();
        req.user.college = await College.findOne({ _id: req.admin.collegeId }).lean();
        next();
    });
};

//Only principal can access this route
//Principal details will be added to req.user.principal
//College details will be added to req.user.college
const validatePrincipal = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.status(401).send("Unauthorized");

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).send("Unauthorized");
        const userData = await User.findOne({ _id: user }).lean();
        if (!userData || userData.role !== "principal") {
            return res.status(401).send("Unauthorized");
        }

        req.user = userData;
        req.user.principal = await Principal.findOne({ userId: userData._id }).lean();
        req.user.college = await College.findOne({ _id: req.principal.collegeId }).lean();
        next();
    });
};

//Only faculty can access this route
//Faculty details will be added to req.user.faculty
//College details will be added to req.user.college
const validateFaculty = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.status(401).send("Unauthorized");

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).send("Unauthorized");
        const userData = await User.findOne({ _id: user }).lean();
        if (!userData || userData.role !== "faculty") {
            return res.status(401).send("Unauthorized");
        }

        req.user = userData;
        req.user.faculty = await Faculty.findOne({ userId: userData._id }).lean();
        req.user.college = await College.findOne({ _id: req.faculty.collegeId }).lean();
        next();
    });
};

//Only student can access this route
//Student details will be added to req.user.student
//College details will be added to req.user.college
const validateStudent = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.status(401).send("Unauthorized");

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).send("Unauthorized");
        const userData = await User.findOne({ _id: user }).lean();
        if (!userData || userData.role !== "student") {
            return res.status(401).send("Unauthorized");
        }

        req.user = userData;
        req.user.student = await Student.findOne({ userId: userData._id }).lean();
        req.user.college = await College.findOne({ _id: req.student.collegeId }).lean();
        next();
    });
};

//Only parent can access this route
//Parent details will be added to req.user.parent
//Student details will be added to req.user.parent.student
//College details will be added to req.user.college
const validateParent = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.status(401).send("Unauthorized");

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).send("Unauthorized");
        const userData = await User.findOne({ _id: user }).lean();
        if (!userData || userData.role !== "parent") {
            return res.status(401).send("Unauthorized");
        }

        req.user = userData;
        req.user.parent = await Parent.findOne({ userId: userData._id }).lean();
        req.user.parent.student = await Student.findOne({ _id: req.parent.studentId }).lean();
        req.user.college = await College.findOne({ _id: req.parent.student.collegeId }).lean();
        next();
    });
};

export { validateUser, validateAdmin, validatePrincipal, validateFaculty, validateStudent, validateParent };