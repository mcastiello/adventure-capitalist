import {
  BusinessData,
  BusinessDefinition,
  BusinessLevel,
  BusinessType
} from '../state/features/businesses/businessesTypes';

export const Businesses: Record<BusinessType, BusinessDefinition> = {
  [BusinessType.FastFood]: {
    typeName: 'Fast Food',
    description:
      'In a growing metropolis time is money and people cannot afford to waste to much, ' +
      'a fast food is a quick and easy option to feed your needs and to generate a quick small income.',
    profitAmount: 1,
    profitInterval: 45,
    cost: 10
  },
  [BusinessType.CoffeeShop]: {
    typeName: 'Coffee Shop',
    description:
      'Profit on the human addiction for their preferred overpriced hot beverage. Someone ' +
      'consider brewing the perfect coffee an art, but you know it is just a quick way to make profit.',
    profitAmount: 2,
    profitInterval: 60,
    cost: 25
  },
  [BusinessType.Retailer]: {
    typeName: 'Retail Shop',
    description:
      'Someone says that the high street is dying, but you know that selling cheap merchandise ' +
      'at a considerable price just because has your name on it, it will not just boost your ego, but also ' +
      'your bank account.',
    profitAmount: 5,
    profitInterval: 100,
    cost: 60
  },
  [BusinessType.Gym]: {
    typeName: 'Gym',
    description:
      'Being healthy is the new trend and people will subscribe to your gym just to make them feel ' +
      'better with themselves. Most of the will never come to pay it a visit, so you will have less maintenance ' +
      'expenses and you will be able to focus on your favourite workout: Counting money.',
    profitAmount: 10,
    profitInterval: 150,
    cost: 100
  },
  [BusinessType.Restaurant]: {
    typeName: 'Restaurant',
    description:
      'Good food is usually cheap if you buy it at a supermarket and cook it for yourself, ' +
      'but we are on the 21st century, nobody cooks anymore unless they are paid to do it. You can just ' +
      'put a leaf of basil on top of a crushed cherry tomato and charge them for 20 quid. Who are you to ' +
      'turn down that kind of profit?',
    profitAmount: 15,
    profitInterval: 150,
    cost: 150
  },
  [BusinessType.MiniMarket]: {
    typeName: 'Local Off-License',
    description:
      'Apparently they still exist and if you are looking for your next fix of booze, that is ' +
      'your place. People will flow there to buy a tuna sandwich and twelve bottles of wine. Just do not ù' +
      'save on the security cameras, you may regret it.',
    profitAmount: 35,
    profitInterval: 200,
    cost: 200
  },
  [BusinessType.SuperMarket]: {
    typeName: 'Super-Market',
    description:
      'The place where the food is magically generated, nobody really knows how it happens, it ' +
      'just appears out of nowhere and it is ready to eat. Your shelves will always be full and so will be ' +
      'your pockets.',
    profitAmount: 50,
    profitInterval: 300,
    cost: 400
  },
  [BusinessType.DepartmentStore]: {
    typeName: 'Department Store',
    description:
      'It is like a zoo but for human beings, you can see them walking around pretending to be ' +
      'important or to be actually able to afford what they are looking at. Most of the people just come ' +
      'there for a stroll, but the store is huge and those who actually spend, they spend big. Just offer ' +
      'them a free coffee with every purchase and you can double your profits.',
    profitAmount: 150,
    profitInterval: 600,
    cost: 1000
  },
  [BusinessType.GameCompany]: {
    typeName: 'Game Company',
    description:
      'A bunch of nerds had an idea for a very simple simulator game that proved to cause ' +
      'addiction among teenagers. They could now be rich if you decided to pay them what they deserve, ' +
      'but what is the point in that. Their profit is your loss and you do not like to lose.',
    profitAmount: 350,
    profitInterval: 3600,
    cost: 2500
  },
  [BusinessType.FinanceCompany]: {
    typeName: 'Finance and Trading',
    description:
      'Nobody knows what they do in that company. They are some kind of wizards that generates ' +
      'money out of thin air. You do not believe in magic and you certainly do not care for the details on ' +
      'their life, but you like the money and there are loads in there that are just waiting for you.',
    profitAmount: 1500,
    profitInterval: 7200,
    cost: 10000
  }
};

export const BusinessLevels: Record<BusinessLevel, BusinessData> = {
  [BusinessLevel.One]: {
    intervalMultiplier: 1,
    profitMultiplier: 1,
    upgradeCostMultiplier: 1.1
  },
  [BusinessLevel.Two]: {
    intervalMultiplier: 0.9,
    profitMultiplier: 1.25,
    upgradeCostMultiplier: 1.2
  },
  [BusinessLevel.Three]: {
    intervalMultiplier: 0.8,
    profitMultiplier: 1.5,
    upgradeCostMultiplier: 1.3
  },
  [BusinessLevel.Four]: {
    intervalMultiplier: 0.7,
    profitMultiplier: 1.75,
    upgradeCostMultiplier: 1.5
  },
  [BusinessLevel.Five]: {
    intervalMultiplier: 0.5,
    profitMultiplier: 2,
  }
}
