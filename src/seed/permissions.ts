const permissions = [
    {
        "name": "login",
        "method": "POST",
        "route": "/api/auth/login"
    },
    {
        "name": "register",
        "method": "POST",
        "route": "/api/auth/register"
    },
    {
        "name": "forgotPassword",
        "method": "POST",
        "route": "/api/auth/forgot-password"
    },
    {
        "name": "verifyToken",
        "method": "POST",
        "route": "/api/auth/verify-token"
    },
    {
        "name": "resetPassword",
        "method": "POST",
        "route": "/api/auth/reset-password"
    },
    {
        "name": "getDashboard",
        "method": "GET",
        "route": "/api/user/dashboard"
    },
    {
        "name": "getTrucks",
        "method": "GET",
        "route": "/api/user/truck"
    },
    {
        "name": "createTruck",
        "method": "POST",
        "route": "/api/user/truck"
    },
    {
        "name": "getCompletedTrucks",
        "method": "GET",
        "route": "/api/user/truck/completed"
    },
    {
        "name": "updateTruck",
        "method": "PATCH",
        "route": "/api/user/truck/{id}"
    },
    {
        "name": "deleteTruck",
        "method": "DELETE",
        "route": "/api/user/truck/{id}"
    },
    {
        "name": "getTruckById",
        "method": "GET",
        "route": "/api/user/truck/{id}"
    },
    {
        "name": "getTruckStatusReport",
        "method": "GET",
        "route": "/api/user/truck/truck-status-report"
    },
    {
        "name": "getAdminDashboard",
        "method": "POST",
        "route": "/api/admin/dashboard"
    },
    {
        "name": "createUser",
        "method": "POST",
        "route": "/api/admin/user"
    },
    {
        "name": "getAllUsers",
        "method": "GET",
        "route": "/api/admin/user"
    },
    {
        "name": "getPermissions",
        "method": "GET",
        "route": "/api/admin/user/permission"
    },
    {
        "name": "getPermissionById",
        "method": "GET",
        "route": "/api/admin/user/permission/{id}"
    },
    {
        "name": "createRole",
        "method": "POST",
        "route": "/api/admin/user/role"
    },
    {
        "name": "getRoles",
        "method": "GET",
        "route": "/api/admin/user/role"
    },
    {
        "name": "updateUserStatus",
        "method": "PATCH",
        "route": "/api/admin/user/update-user-status/{id}"
    },
    {
        "name": "addRolePermissions",
        "method": "POST",
        "route": "/api/admin/user/add-role-permissions"
    },
    {
        "name": "assignRoleToUser",
        "method": "POST",
        "route": "/api/admin/user/assign-role-user"
    },
    {
        "name": "getUserById",
        "method": "GET",
        "route": "/api/admin/user/{id}"
    },
    {
        "name": "updateBooking",
        "method": "PUT",
        "route": "/api/admin/booking/{id}"
    },
    {
        "name": "getBookingById",
        "method": "GET",
        "route": "/api/admin/booking/{id}"
    },
    {
        "name": "getAllBookings",
        "method": "GET",
        "route": "/api/admin/booking"
    },
    {
        "name": "updateTruckStatus",
        "method": "PUT",
        "route": "/api/admin/truck/update-truck-status/{id}"
    },
    {
        "name": "getAllTrucks",
        "method": "GET",
        "route": "/api/admin/truck"
    },
    {
        "name": "getTruckById",
        "method": "GET",
        "route": "/api/admin/truck/{id}"
    },
    {
        "name": "createOrder",
        "method": "POST",
        "route": "/api/order"
    }
]

export default permissions;