export interface IAuthContext {
  loginWithApple: () => Promise<void>;
  user: IUser;
  loading: boolean;
  sharedUserNameList: SharedUserList[];
  hasAccountShared: boolean;
  signOut(): Promise<void>;
  changeUserSharedList: (userList: SharedUserList[]) => Promise<void>;
  changeHasAccountShared: (hasAccountShared: boolean) => Promise<void>;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  photo: string;
}

export interface SharedUserList {
  id: string;
  type: "principal" | "shared";
  name: string;
  active: boolean;
}
