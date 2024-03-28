import collegeModel from "../models/College.js";
import courseModel from "../models/Course.js";
import semesterModel from "../models/Semester.js";

//Check if the course and user belongs to the same college
const checkCourseUserCollege = async (courseCollegeId, userCollegeId) => {
    if (courseCollegeId != userCollegeId) {
        throw { status: 401, message: "Unauthorized" };
    }
};

const fetchById = async (courseId) => {
    const course = await courseModel.findById(courseId);
    if (!course) {
        throw { status: 404, message: "Course not found" };
    }

    return course;
};

const fetchByCourseCode = async (courseCode) => {
    const course = await courseModel.findOne({ courseCode: courseCode });
    if (!course) {
        throw { status: 404, message: "Course not found" };
    }

    return course;
};

const fetchAllByCollege = async (collegeId) => {
    const college = await collegeModel.findById(collegeId);
    if (!college) {
        throw { status: 404, message: "College not found" };
    }

    const courses = await courseModel.find({ collegeId: collegeId });

    return courses;
};

const fetchAllBySemester = async (semesterId, collegeId) => {
    const semester = await semesterModel.findOne({ semesterId: semesterId, collegeId: collegeId });
    if (!semester) {
        throw { status: 404, message: "Semester not found" };
    }

    const courses = await courseModel.find({ semesterId: semesterId });

    return courses;
};

const fetchAllBySemesterAndCollege = async (semesterId, collegeId) => {
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
        semesterId: data.semesterId,
        courseCode: data.courseCode,
        collegeId: collegeId,
        createdBy: userId,
    });

    await course.save();

    return course;
};

const update = async (courseId, data, collegeId) => {
    const course = await courseModel.findById(courseId);
    if (!course) {
        throw { status: 404, message: "Course not found" };
    }

    const semester = await semesterModel.findById(data.semesterId);
    if (!semester) {
        throw { status: 404, message: "Semester not found" };
    }

    //Check if the course and user belongs to the same college
    checkCourseUserCollege(course.collegeId, collegeId);

    await courseModel.findByIdAndUpdate(courseId, {
        name: data.name,
        semesterId: data.semesterId,
        courseCode: data.courseCode,
    });

    return course;
};


const deleteCourse = async (courseId, collegeId) => {
    const course = await courseModel.findById(courseId);
    if (!course) {
        throw { status: 404, message: "Course not found" };
    }

    //Check if the course and user belongs to the same college
    checkCourseUserCollege(course.collegeId, collegeId);

    await courseModel.findByIdAndDelete(courseId);

    return course;
};

export default {
    checkCourseUserCollege,
    fetchById,
    fetchByCourseCode,
    fetchAllByCollege,
    fetchAllBySemester,
    fetchAllBySemesterAndCollege,
    create,
    update,
    deleteCourse,
};
