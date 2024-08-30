import {createSlice } from  '@reduxjs/toolkit'

const initialState = {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem('userInfo') as string) : null,
    adminInfo: localStorage.getItem("adminInfo") ? JSON.parse(localStorage.getItem("adminInfo") as string) : null,
    serviceProviderInfo: localStorage.getItem("serviceProviderInfo") ? JSON.parse(localStorage.getItem("serviceProviderInfo") as string) : null,

    // isBlocked: false
} 



const authSlice = createSlice({ 
    name: 'auth',
    initialState,
    reducers: {
        setUserCredentials: (state, action) => {
            state.userInfo = action.payload
            localStorage.setItem("userInfo", JSON.stringify(action.payload))
        },
        userLogout: (state) => {
            state.userInfo = null
            // state.isBlocked = false;
            localStorage.removeItem("userInfo")
        },
       
        // setBlockedStatus: (state, action) => {
        //     // state.isBlocked = action.payload
        // }
        setAdminCredentials: (state, action) => {
            state.adminInfo = action.payload
            localStorage.setItem("adminInfo", JSON.stringify(action.payload))
        },
        adminLogout: (state) => { 
            state.adminInfo = null
            localStorage.removeItem("adminInfo")
        },
        setServiceProviderCredentials: (state, action) => {
            state.serviceProviderInfo = action.payload
            localStorage.setItem("serviceProviderInfo", JSON.stringify(action.payload))
        },
        updateServiceProviderInfo: (state, action) => {
            state.serviceProviderInfo = {
                ...state.serviceProviderInfo,
                ...action.payload,
            };
            localStorage.setItem("serviceProviderInfo", JSON.stringify(state.serviceProviderInfo));
        },

        serviceProviderLogout: (state) => {
            state.serviceProviderInfo = null
            localStorage.removeItem("serviceProviderInfo")
        },
    }
})


export const {setUserCredentials, userLogout,setAdminCredentials, adminLogout ,setServiceProviderCredentials ,serviceProviderLogout,updateServiceProviderInfo} = authSlice.actions;
export default authSlice.reducer