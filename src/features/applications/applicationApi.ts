import { axiosClient } from '../../api/axiosClient';
import { ApplicationCreateRequest } from './applicationTypes';

export async function createApplication(
  request: ApplicationCreateRequest,
): Promise<unknown> {
  const response = await axiosClient.post('/applications', request);

  return response.data;
}
