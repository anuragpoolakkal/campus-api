import userService from "../services/user.service.js";

const validatePermission = async (req, res, next) => {
    const permissionPath = req.method + " " + req.baseUrl + req.route.path;
    // console.log("REQUESTED USER: ", req.user)
    if (req.baseUrl === "/user") {
        return next();
    }

    if(!req.user.college){
        return res.status(404).send({
            message: "College not found",
            success: false
        })
    }

    const permissions = await userService.getPermissions(req.user.college._id);
    if (req.user.role === "admin") {
        // console.log("HEHEHEHE")
        // console.log("PERMISSION PATH:", permissionPath)
        // console.log(permissions.admin)
        // console.log(permissions.admin.includes(permissionPath))

        permissions.admin.includes(permissionPath) ? next() : res.status(403).send({
            message: "No permission to access this route",
            success: false
        });
    }
    else if (req.user.role === "principal") {
        permissions.principal.includes(permissionPath) ? next() : res.status(403).send({
            message: "No permission to access this route",
            success: false
        });
    }
    else if (req.user.role === "faculty") {
        permissions.faculty.includes(permissionPath) ? next() : res.status(403).send({
            message: "No permission to access this route",
            success: false
        });
    }
    else if (req.user.role === "student") {
        permissions.student.includes(permissionPath) ? next() : res.status(403).send({
            message: "No permission to access this route",
            success: false
        });
    }
    else {
        res.status(403).send({
            message: "No permission to access this route",
            success: false
        });
    }
}

export { validatePermission }