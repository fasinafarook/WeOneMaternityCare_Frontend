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
    getBlogs: '/admin/blogs', // Endpoint for fetching blogs
    unlistBlog: '/admin/unlist-blog', 
    addBlog: '/admin/add-blogs', // Add this line
    addWebinar: '/admin/add-webinars', // POST request to add a webinar
    getWebinars: '/admin/webinars', // GET request to list webinars
    unlistWebinar: '/admin/webinars/unlist', // PUT request to unlist a 
    toggleWebinarListing:"/admin/webinars/toggle-listing",
    updateBlogStatus: '/admin/blog', // or whatever your endpoint is


}

export default adminEndpoint