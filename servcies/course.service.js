import College from "../models/College";
import Course from "../models/Course";
import Semester from "../models/Semester";

//Check if the course and user belongs to the same college
const checkCourseUserCollege = async (courseCollegeId, userCollegeId) => {
    if (courseCollegeId != userCollegeId) {
        throw { status: 401, message: "Unauthorized" };
    }
}

const fetchById = async (courseId) => {
    const course = await Course.findById(courseId);
    if (!course) {
        throw { status: 404, message: "Course not found" };
    }

    return course;
}

const fetchByCourseCode = async (courseCode) => {
    const course = await Course.findOne({ courseCode: courseCode });
    if (!course) {
        throw { status: 404, message: "Course not found" };
    }

    return course;
}

const fetchAllByCollege = async (collegeId) => {
    const college = await College.findById(collegeId);
    if (!college) {
        throw { status: 404, message: "College not found" };
    }

    const courses = await Course.find({ collegeId: collegeId });

    return courses;
}

const fetchAllBySemester = async (semesterId, collegeId) => {
    const semester = await Semester.findOne({ semesterId: semesterId, collegeId: collegeId });
    if (!semester) {
        throw { status: 404, message: "Semester not found" };
    }

    const courses = await Course.find({ semesterId: semesterId });

    return courses;
}

const create = async (data, userId, collegeId) => {
    const semester = await Semester.findById(data.semesterId);
    if (!semester) {
        throw { status: 404, message: "Semester not found" };
    }

    const course = new Course({
        name: data.name,
        semesterId: data.semesterId,
        courseCode: data.courseCode,
        collegeId: collegeId,
        createdBy: userId,
    });

    await course.save();

    return course;
}

const update = async (courseId, data, collegeId) => {
    const course = await Course.findById(courseId);
    if (!course) {
        throw { status: 404, message: "Course not found" };
    }

    const semester = await Semester.findById(data.semesterId);
    if (!semester) {
        throw { status: 404, message: "Semester not found" };
    }

    //Check if the course and user belongs to the same college
    checkCourseUserCollege(course.collegeId, collegeId);

    await Course.findByIdAndUpdate(courseId, {
        name: data.name,
        semesterId: data.semesterId,
        courseCode: data.courseCode,
    });

    return course;
}

const deleteCourse = async (courseId, collegeId) => {
    const course = await Course.findById(courseId);
    if (!course) {
        throw { status: 404, message: "Course not found" };
    }

    //Check if the course and user belongs to the same college
    checkCourseUserCollege(course.collegeId, collegeId);

    await Course.findByIdAndDelete(courseId);

    return course;
}

export default {
    checkCourseUserCollege,
    fetchById,
    fetchByCourseCode,
    fetchAllByCollege,
    fetchAllBySemester,
    create,
    update,
    deleteCourse
}