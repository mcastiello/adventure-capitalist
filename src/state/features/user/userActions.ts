export const UPDATE_WALLET = 'USER/UPDATE_WALLET';

export interface UpdateWalletAction {
  type: typeof UPDATE_WALLET;
  amount: number;
}
export const updateWallet = (amount: number): UpdateWalletAction => ({
  type: UPDATE_WALLET,
  amount
});

export type UserActions = UpdateWalletAction;
