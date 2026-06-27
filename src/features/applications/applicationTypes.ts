export type ApplicationType = 'COURIER' | 'RESTAURANT';

export type ApplicationCreateRequest = {
  type: ApplicationType;
  businessName?: string;
  applicantName: string;
  applicantSurname: string;
  email: string;
  phone: string;
  message: string;
};
