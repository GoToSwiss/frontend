import { ApiResponse } from '@/types/globalTypes';

export interface GoogleProfile {
  googleId: string;
  email: string;
  name: string;
  givenName: string;
  familyName: string;
  imageUrl: string;
}

export type GooglResponse = ApiResponse<GoogleProfile>;
