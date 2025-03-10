const permissions = [
    {
        name: "getAllBookings",
        method: "GET",
        route: "/api/admin/booking"
    },
    {
        name: "updateTruckStatus",
        method: "PUT",
        route: "/api/admin/truck/update-truck-status"
    },
    {
        name: "findOrCreateRole",
        method: "POST",
        route: "/api/admin/user/role"
    }
]

export default permissions
