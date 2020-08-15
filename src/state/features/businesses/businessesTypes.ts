export enum BusinessType {
  Gym = 'gym',
  CoffeeShop = 'coffee_shop',
  Restaurant = 'restaurant',
  FastFood = 'fast_food',
  Retailer = 'retailer',
  DepartmentStore = 'department_store',
  MiniMarket = 'mini_market',
  SuperMarket = 'super_market',
  GameCompany = 'game_company',
  FinanceCompany = 'finance_company'
}

export enum BusinessLevel {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5
}

export type BusinessDefinition = {
  profitAmount: number;
  profitInterval: number;
  cost: number;
  typeName: string;
  description: string;
};

export type BusinessData = {
  profitMultiplier: number;
  intervalMultiplier: number;
  upgradeCostMultiplier?: number;
};

export type BusinessID = string;

export type Business = {
  id: BusinessID;
  type: BusinessType;
  name: string;
  lastProfitCollected: number;
  totalProfits: number;
  managed: boolean;
  collectionAvailable: boolean;
  level: BusinessLevel;
};

export type BusinessDetails = Business & {
  profit: number;
  interval: number;
  upgradeCost?: number;
}
