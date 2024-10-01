export interface ServiceProvider {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    service: string;
    specialization: string;
    qualification: string;
    profilePicture: string;
    experienceCrt: string;
    expYear: number;
    rate: number;
    location: string;
    isApproved: boolean;
    isBlocked: boolean;
    createdAt: string; 
    hasCompletedDetails: boolean;
  }
  