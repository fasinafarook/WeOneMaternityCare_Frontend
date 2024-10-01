
const adminEndpoint = {
    adminLogin: '/admin/login',
    getDashboardDetails: '/admin/dashboard',
    logout: '/admin/logout',
    getUsers: '/admin/users-list',
    blockUser: '/admin/block-user',
    getServiceProviders: '/admin/serviceProviders-list',
    getServiceProviderDetails: '/admin/serviceProvider',
    approveServiceProvider: '/admin/approve-serviceProvider',
    blockProvider:'/admin/block-provider',
    addCategory: '/admin/add-category',
    getCategorys: '/admin/categorys-list',
    unlistCategory: '/admin/unlist-category',
    getBlogs: '/admin/blogs',
    unlistBlog: '/admin/unlist-blog', 
    addBlog: '/admin/add-blogs', 
    addWebinar: '/admin/add-webinars', 
    getWebinars: '/admin/webinars',
    unlistWebinar: '/admin/webinars/unlist', 
    toggleWebinarListing:"/admin/webinars/toggle-listing",
    updateBlogStatus: '/admin/blog',
    getAllComplaints:'/admin/complaints',
    respondToComplaint:'/admin/respond-to-complaint',
    getBookings:"/admin/bookings"
    
}

export default adminEndpoint