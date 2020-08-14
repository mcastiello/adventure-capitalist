import { BusinessType } from '../../state/features/businesses/businessesTypes';
import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faCashRegister,
  faChartLine,
  faCoffee,
  faGamepad,
  faHamburger,
  faPizzaSlice,
  faShoppingBasket,
  faStoreAlt,
  faSwimmingPool
} from '@fortawesome/free-solid-svg-icons';

export const BusinessIcons: Record<BusinessType, ReactNode> = {
  [BusinessType.CoffeeShop]: <FontAwesomeIcon icon={faCoffee} />,
  [BusinessType.FastFood]: <FontAwesomeIcon icon={faHamburger} />,
  [BusinessType.Retailer]: <FontAwesomeIcon icon={faStoreAlt} />,
  [BusinessType.Gym]: <FontAwesomeIcon icon={faSwimmingPool} />,
  [BusinessType.Restaurant]: <FontAwesomeIcon icon={faPizzaSlice} />,
  [BusinessType.MiniMarket]: <FontAwesomeIcon icon={faCashRegister} />,
  [BusinessType.SuperMarket]: <FontAwesomeIcon icon={faShoppingBasket} />,
  [BusinessType.DepartmentStore]: <FontAwesomeIcon icon={faBuilding} />,
  [BusinessType.GameCompany]: <FontAwesomeIcon icon={faGamepad} />,
  [BusinessType.FinanceCompany]: <FontAwesomeIcon icon={faChartLine} />
};
