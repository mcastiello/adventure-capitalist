import { SystemState } from '../index';

export const getWalletAmount = (state: SystemState) => state.user.wallet;