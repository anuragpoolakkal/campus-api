import collegeModel from "../models/College.js";
import courseModel from "../models/Course.js";
import semesterModel from "../models/Semester.js";
import programModel from "../models/Program.js";
import facultyModel from "../models/Faculty.js";
import userModel from "../models/User.js";

//Check if the course and user belongs to the same college
const checkCourseUserCollege = async (courseCollegeId, userCollegeId) => {
    if (courseCollegeId != userCollegeId) {
        throw { status: 401, message: "Unauthorized" };
    }
};

const getById = async (courseId) => {
    const course = await courseModel.findById(courseId).lean();
    if (!course) {
        throw { status: 404, message: "Course not found" };
    }

    course.program = await programModel.findById(course.programId).select("name").lean();
    course.semester = await semesterModel.findById(course.semesterId).select("name number").lean();
    var faculties = [];
    for (const facultyId of course.faculties) {
        const faculty = await facultyModel.findById(facultyId).lean();
        const user = await userModel.findById(faculty.userId).lean();
        faculties.push({
            name: user.name,
            email: user.email,
            role: faculty.role,
        });
    }
    course.faculties = faculties;

    return course;
};

const getByCourseCode = async (courseCode) => {
    const course = await courseModel.findOne({ courseCode: courseCode });
    if (!course) {
        throw { status: 404, message: "Course not found" };
    }

    return course;
};

const getAll = async (collegeId) => {
    const college = await collegeModel.findById(collegeId);
    if (!college) {
        throw { status: 404, message: "College not found" };
    }

    const courses = await courseModel.find({ collegeId: collegeId });
    var coursesData = [];
    for (const course of courses) {
        coursesData.push(await getById(course._id));
    }

    return coursesData;
};

const getAllBySemester = async (semesterId, collegeId) => {
    const semester = await semesterModel.findOne({ semesterId: semesterId, collegeId: collegeId });
    if (!semester) {
        throw { status: 404, message: "Semester not found" };
    }

    const courses = await courseModel.find({ semesterId: semesterId });

    return courses;
};

const getAllBySemesterAndCollege = async (semesterId, collegeId) => {
    const semester = await semesterModel.findOne({ semesterId: semesterId, collegeId: collegeId });

    if (!semester) {
        throw { status: 404, message: "Semester not found" };
    }

    const courses = await courseModel.find({ semesterId: semesterId, collegeId: collegeId });

    return courses;
};

const create = async (data, userId, collegeId) => {
    const semester = await semesterModel.findById(data.semesterId);
    if (!semester) {
        throw { status: 404, message: "Semester not found" };
    }

    const course = new courseModel({
        name: data.name,
        courseCode: data.courseCode,
        programId: data.programId,
        semesterId: data.semesterId,
        collegeId: collegeId,
        faculties: data.faculties,
        createdBy: userId,
    });

    await course.save();

    return course;
};

const update = async (courseId, data, collegeId) => {
    const course = getById(courseId);
    if (!course) {
        throw { status: 404, message: "Course not found" };
    }

    const semester = await semesterModel.findById(data.semesterId);
    if (!semester) {
        throw { status: 404, message: "Semester not found" };
    }

    const program = await programModel.findById(data.programId);
    if (!program) {
        throw { status: 404, message: "Program not found" };
    }

    await courseModel.findOneAndUpdate({ _id: courseId, collegeId: collegeId }, {
        name: data.name,
        courseCode: data.courseCode,
        programId: data.programId,
        semesterId: data.semesterId,
        faculties: data.faculties,
    });

    return getById(courseId);
};

const remove = async (courseId, collegeId) => {
    const course = await getById(courseId);
    if (!course) {
        throw { status: 404, message: "Course not found" };
    }

    await courseModel.findOneAndDelete({ _id: courseId, collegeId: collegeId });

    return course;
};

export default {
    getById,
    getAll,
    getByCourseCode,
    getAllBySemester,
    getAllBySemesterAndCollege,
    create,
    update,
    remove,
    checkCourseUserCollege,
};
