export enum BusinessType {
  Gym = 'gym',
  CoffeeShop = 'coffee_shop',
  Restaurant = 'restaurant',
  FlowerShop = 'flower_shop',
  Retailer = 'retailer',
  DepartmentStore = 'department_store',
  MiniMarket = 'mini_market',
  SuperMarket = 'super_market',
  GameCompany = 'game_company',
  FinanceCompany = 'finance_company'
}

export type BusinessDefinition = {
  profitAmount: number;
  profitInterval: number;
  cost: number;
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
};

export const Businesses: Record<BusinessType, BusinessDefinition> = {
  [BusinessType.FlowerShop]: {
    profitAmount: 1,
    profitInterval: 60,
    cost: 10
  },
  [BusinessType.CoffeeShop]: {
    profitAmount: 1,
    profitInterval: 30,
    cost: 25
  },
  [BusinessType.Retailer]: {
    profitAmount: 5,
    profitInterval: 100,
    cost: 60
  },
  [BusinessType.Gym]: {
    profitAmount: 10,
    profitInterval: 150,
    cost: 100
  },
  [BusinessType.Restaurant]: {
    profitAmount: 15,
    profitInterval: 150,
    cost: 150
  },
  [BusinessType.MiniMarket]: {
    profitAmount: 20,
    profitInterval: 200,
    cost: 200
  },
  [BusinessType.SuperMarket]: {
    profitAmount: 30,
    profitInterval: 300,
    cost: 400
  },
  [BusinessType.DepartmentStore]: {
    profitAmount: 60,
    profitInterval: 600,
    cost: 1000
  },
  [BusinessType.GameCompany]: {
    profitAmount: 350,
    profitInterval: 3600,
    cost: 2500
  },
  [BusinessType.FinanceCompany]: {
    profitAmount: 1500,
    profitInterval: 7200,
    cost: 10000
  }
};
