
const adminEndpoint = {
    adminLogin: '/api/admin/login',
    getDashboardDetails: '/api/admin/dashboard',
    logout: '/api/admin/logout',
    getUsers: '/api/admin/users-list',
    blockUser: '/api/admin/block-user',
    getServiceProviders: '/api/admin/serviceProviders-list',
    getServiceProviderDetails: '/api/admin/serviceProvider',
    approveServiceProvider: '/api/admin/approve-serviceProvider',
    blockProvider:'/api/admin/block-provider',
    addCategory: '/api/admin/add-category',
    getCategorys: '/api/admin/categorys-list',
    unlistCategory: '/api/admin/unlist-category',
    getBlogs: '/api/admin/blogs',
    unlistBlog: '/api/admin/unlist-blog', 
    addBlog: '/api/admin/add-blogs', 
    addWebinar: '/api/admin/add-webinars', 
    getWebinars: '/api/admin/webinars',
    unlistWebinar: '/api/admin/webinars/unlist', 
    toggleWebinarListing:"/api/admin/webinars/toggle-listing",
    updateBlogStatus: '/api/admin/blog',
    getAllComplaints:'/api/admin/complaints',
    respondToComplaint:'/api/admin/respond-to-complaint',
    getBookings:"/api/admin/bookings"
    
}

export default adminEndpoint