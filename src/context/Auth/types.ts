export interface IAuthContext {
  loginWithApple: () => Promise<void>;
  user: IUser;
  loading: boolean;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  photo: string;
}
