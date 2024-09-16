
const userEndpoint = {
    candidateSignUp: "/user/client-register",
    verifyOtp: "/user/verify-otp",
    resendOtp: "/user/resend-otp",
    verifyLogin:"/user/verify-login",
    logout: "/user/logout",
    home: "/user/home",
    getProfileDetails: "/user/get-profile",
    editProfile: "/user/edit-profile",
    editPassword: "/user/edit-password",
    serviceProviders:"/user/service-providers",
    serviceCategorys:"user/categories",
    getServiceProviderDetails: '/user/serviceProviderDetails',

    getInterviewerSlotDetails: "/user/get-service-providers-slots-details",
  
    makePayment: "/payment/create-payment",
    bookSlot: "/user/book-slot",
    getScheduledBookings: "/user/get-scheduled-Bookings",

    getListedWebinars:"/user/webinars",
    getBlogs:"/user/blogs",
    cancelBooking:"/payment/cancelBooking",

    getPaymentDashboardDetails:"/user/wallet",

    getUserchatt:"/user/message",
    sendMessage: '/message/send',

    // getAllPremiumCandidates: "/user/get-all-premium-users",

    // createGroup: "/chat/group",
  
    // getAllChats: "/chat",

    // getAllMessages: "/chat/messages",

    // sendMessage: "/chat/send-message",


    submitComplaint: '/user/complaints',
    getComplaints: '/user/complaints', // As

    
};

export default userEndpoint;