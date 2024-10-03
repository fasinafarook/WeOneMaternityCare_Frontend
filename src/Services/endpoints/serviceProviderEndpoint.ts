const serviceProviderEndpoint = {
    serviceProviderSignUp: '/api/serviceProvider/serviceProvider-register',
    verifyOtp: '/api/serviceProvider/verify-otp',
    verifyLogin: '/api/serviceProvider/verify-login',
    resendOtp: '/api/serviceProvider/resend-otp',
    verifyDetails: '/api/serviceProvider/verify-details',
    logout: '/api/serviceProvider/logout',
    homeDetails: '/api/serviceProvider/home',
    serviceCategorys:'/api/serviceProvider/categories',
    getProfileDetails:'/api/serviceProvider/profile',
    addSlot: '/api/serviceProvider/add-slot',
    getSlots: '/api/serviceProvider/get-slots',
    getDomains: '/api/serviceProvider/get-domains',
    getSchedulesBookings: '/api/serviceProvider/get-scheduled-bookings',
    getPaymentDashboardDetails:"/api/serviceProvider/getPaymentDashboardDetails",
    updateWallet: "/api/serviceProvider/update-wallet",
    updateBookingStatus: "/api/serviceProvider/update-booking-status",

    ForgotPassword: '/api/serviceProvider/forgot-password',
    resetPassword: '/api/serviceProvider/reset-password',

    editPassword: "/api/serviceProvider/edit-password",

    editProfile: "/api/serviceProvider/edit-profile",

    processRefund: '/api/payment/refund', 

    

   

}

export default serviceProviderEndpoint