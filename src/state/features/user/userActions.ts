export const RENAME_USER = 'USER/RENAME';
export const UPDATE_WALLET = 'USER/UPDATE_WALLET';

export interface RenameUserAction {
    type: typeof RENAME_USER;
    name: string;
}
export const renameManager = (name: string): RenameUserAction => ({
    type: RENAME_USER,
    name
});

export interface UpdateWalletAction {
    type: typeof UPDATE_WALLET;
    amount: number;
}
export const updateWallet = (amount: number): UpdateWalletAction => ({
    type: UPDATE_WALLET,
    amount
});

export type UserActions = RenameUserAction | UpdateWalletAction;