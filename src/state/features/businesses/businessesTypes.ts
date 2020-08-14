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

export type BusinessDefinition = {
  profitAmount: number;
  profitInterval: number;
  cost: number;
  typeName: string;
  description: string;
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
