const permissions = {
    //Batch
    "GET /batch/": "Get all batches",
    "GET /batch/:id": "Get a batch",
    "POST /batch/": "Create a new batch",
    "PUT /batch/:id": "Update batch details",
    "DELETE /batch/:id": "Delete batch",
    //College
    "GET /college/:id": "Get a college",
    "POST /college/get-all-count": "Get all counts",
    "POST /college/": "Create a new college and assign it to the admin",
    "PUT /college/:id": "Update college details",
    "DELETE /college/:id": "Delete college",
    //Course
    "GET /course/": "Get all courses",
    "GET /course/:id": "Get a course",
    "POST /course/": "Create a new course",
    "PUT /course/:id": "Update course details",
    "DELETE /course/:id": "Delete course",
    //Department
    "GET /department/": "Get all departments",
    "GET /department/:id": "Get a department",
    "POST /department/": "Create a new department",
    "PUT /department/:id": "Update department details",
    "DELETE /department/:id": "Delete department",
    //Faculty
    "GET /faculty/": "Get all faculties",
    "GET /faculty/:id": "Get a faculty",
    "POST /faculty/": "Create a new faculty",
    "PUT /faculty/:id": "Update faculty details",
    "DELETE /faculty/:id": "Delete faculty",
    //Feedback
    "GET /feedback/": "Get all feedbacks",
    "GET /feedback/pending": "Get all pending feedbacks",
    "GET /feedback/:id": "Get a feedback",
    "POST /feedback/": "Create a new feedback",
    "PUT /feedback/:id": "Update feedback details",
    "DELETE /feedback/:id": "Delete feedback",
    "POST /feedback/generate-questions-using-ai": "Generate feedback form questions using AI",
    "POST /feedback/submit": "Submit Feedback",
    //Hod
    "GET /hod/": "Get all hod",
    "GET /hod/:id": "Get a hod",
    "POST /hod/": "Create a new hod",
    "PUT /hod/:id": "Update hod details",
    "DELETE /hod/:id": "Delete hod",
    //Program
    "GET /program/": "Get all programs",
    "GET /program/:id": "Get a program",
    "POST /program/get-all-by-department/:id": "Get all programs by departmentId",
    "POST /program/": "Create a new program",
    "PUT /program/:id": "Update program details",
    "DELETE /program/:id": "Delete program",
    //Scheme
    "GET /scheme/": "Get all schemes",
    "GET /scheme/:id": "Get a scheme",
    "POST /scheme/": "Create a new scheme",
    "PUT /scheme/:id": "Update scheme details",
    "DELETE /scheme/:id": "Delete scheme",
    //Semester
    "GET /semester/": "Get all semesters",
    "GET /semester/:id": "Get a semester",
    "POST /semester/": "Create a new semester",
    "POST /semester/get-all-by-program/:id": "Get all semesters by programId",
    "PUT /semester/:id": "Update semester details",
    "DELETE /semester/:id": "Delete semester",
    //Student
    "GET /student/": "Get all students",
    "GET /student/:id": "Get a student",
    "POST /student/": "Create a new student",
    "PUT /student/:id": "Update student details",
    "DELETE /student/:id": "Delete student",
    //User
    "GET /user/": "Get all users",
    "GET /user/:id": "Get a user",
};

export { permissions };