import { axiosClient } from '../../api/axiosClient';
import { AuthUser, LoginApiResponse, LoginRequest } from './authTypes';

export async function login(request: LoginRequest): Promise<AuthUser> {
  const response = await axiosClient.post<LoginApiResponse>(
    '/auth/login',
    request,
  );

  return response.data.data;
}
