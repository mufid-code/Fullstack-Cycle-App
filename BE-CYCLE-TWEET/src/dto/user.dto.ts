export type createUserDTO = {
  name: string;
  username? : string
  email: string;
  password: string;
  bio?: string,
  avatarUrl?: string,
  role: "USER";
  isEmailVerified: false;
};

export type updateUserDTO = createUserDTO & { };
