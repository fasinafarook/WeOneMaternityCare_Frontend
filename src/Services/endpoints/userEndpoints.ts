
const userEndpoint = {
    candidateSignUp: "/api/user/client-register",
    verifyOtp: "/api/user/verify-otp",
    resendOtp: "/api/user/resend-otp",
    verifyLogin:"/api/user/verify-login",
    logout: "/api/user/logout",
    home: "/api/user/home",
    getProfileDetails: "/api/user/get-profile",
    editProfile: "/api//user/edit-profile",
    editPassword: "/api/user/edit-password",
    serviceProviders:"/api/user/service-providers",
    serviceCategorys:"/api/user/categories",
    getServiceProviderDetails: '/api/user/serviceProviderDetails',

    getInterviewerSlotDetails: "/api/user/get-service-providers-slots-details",
  
    makePayment: "/api/payment/create-payment",
    bookSlot: "/api/user/book-slot",
    getScheduledBookings: "/api/user/get-scheduled-Bookings",

    getListedWebinars:"/api/user/webinars",
    getBlogs:"/api/user/blogs",
    cancelBooking:"/api/payment/cancelBooking",

    getPaymentDashboardDetails:"/api/user/wallet",

    getUserchatt:"/api/user/message",
    sendMessage: '/api/message/send',

    forgorPassword: "/api/user/forgot-password",
    resetPassword: "/api/user/reset-password",

    submitComplaint: '/api/user/complaints',
    getComplaints: '/api/user/complaints', 

    verifyDetails:'/api/user/Details'

    
};

export default userEndpoint;