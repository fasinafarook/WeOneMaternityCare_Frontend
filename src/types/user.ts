// src/types/User.ts
export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    phoneNumber: string, 
    // confirmPassword: string,
  }
  export interface VerifyOtpRequest {
    email: string;
    otp: string;
  }