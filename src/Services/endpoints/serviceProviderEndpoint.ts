const serviceProviderEndpoint = {
    serviceProviderSignUp: '/serviceProvider/serviceProvider-register',
    verifyOtp: '/serviceProvider/verify-otp',
    verifyLogin: '/serviceProvider/verify-login',
    resendOtp: '/serviceProvider/resend-otp',
    verifyDetails: '/serviceProvider/verify-details',
    logout: '/serviceProvider/logout',
    homeDetails: '/serviceProvider/home',
    serviceCategorys:'/serviceProvider/categories',
    getProfileDetails:'/serviceProvider/profile',
    addSlot: '/serviceProvider/add-slot',
    getSlots: '/serviceProvider/get-slots',
    getDomains: '/serviceProvider/get-domains',
    getSchedulesBookings: '/serviceProvider/get-scheduled-bookings',
    getPaymentDashboardDetails:"/serviceProvider/getPaymentDashboardDetails",
    updateWallet: "/serviceProvider/update-wallet",
    updateBookingStatus: "/serviceProvider/update-booking-status",

    ForgotPassword: '/serviceProvider/forgot-password',
    resetPassword: '/serviceProvider/reset-password',

    editPassword: "/serviceProvider/edit-password",

    editProfile: "/serviceProvider/edit-profile",

    processRefund: '/payment/refund', 

    

   

}

export default serviceProviderEndpoint