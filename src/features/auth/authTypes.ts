export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  token: string;
  roles: string[];
};

export type LoginApiResponse = {
  data: AuthUser;
  status: number;
  message: string;
};
