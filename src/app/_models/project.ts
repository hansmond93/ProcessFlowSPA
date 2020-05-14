export interface Project {
        projectId: number;
        projectTitle: string;
        description: string;
        durationInMonths: number; 
        proposedAmount: number;
        approvedAmount?: number;
        location: string;
        contactPerson: string;
        contactNumber: string;
        contactAddress: string;
        companyName: string;
        companyEmail: string;
        approvalStatusId: number;
}