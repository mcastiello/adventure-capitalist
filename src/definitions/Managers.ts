import { ManagerDefinition, ManagerType } from '../state/features/managers/managersTypes';

export const Managers: Record<ManagerType, ManagerDefinition> = {
  [ManagerType.Clerk]: {
    typeName: 'Clerk',
    description:
      'He is probably not interested in your business, he is there just for the small pay he gets ' +
      'but he will not make a big effort to improve your profits, in fact he will require more time ' +
      'to generate profits, but at list he will stay there while you are somewhere else.',
    profitCut: 0.01,
    timeBonus: 1.25,
    maxNumberOfBusinesses: 1,
    cost: 100
  },
  [ManagerType.JuniorManager]: {
    typeName: 'Junior Manager',
    description:
      'He is probably just out of university and he is looking for a chance to prove himself, he ' +
      'will do is job as fas as you can and he will probably do it for free (he needs to improve his CV).',
    profitCut: 1,
    timeBonus: 1,
    maxNumberOfBusinesses: 1,
    cost: 200
  },
  [ManagerType.SeniorManager]: {
    typeName: 'Senior Manager',
    description:
      'He knows how to do his job, he is faster than you are and he can handle a few tasks at the ' +
      'same time, but quality comes at a price and he is very interested in your profits.',
    profitCut: 10,
    timeBonus: 0.85,
    maxNumberOfBusinesses: 5,
    cost: 500
  },
  [ManagerType.CEO]: {
    typeName: 'Chief Executive Officer',
    description:
      'You can leave everything to him and go on vacation. Profits will start flowing in your ' +
      'bank faster than you can imagine, but do not waste time counting them, he will make sure ' +
      'there are enough money for you (and for himself).',
    profitCut: 30,
    timeBonus: 0.65,
    maxNumberOfBusinesses: 25,
    cost: 2000
  }
};
