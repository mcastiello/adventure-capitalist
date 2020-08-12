export type UserState = {
  name: string;
  wallet: number;
};

export const defaultUserState: UserState = {
  name: 'New User',
  wallet: 100
};
