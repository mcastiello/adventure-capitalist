import { ReactNode } from 'react';

export interface BaseItemType {
  typeName: string;
  description: string;
  cost: number;
}

export type ItemDataValue<T extends string> = {
  title: string;
  getValue: (type: T) => string;
  icon: ReactNode;
};

export type ItemProps<T extends string, S extends BaseItemType> = {
  open: boolean;
  onCreate: (name: string, type: T) => void;
  wallet: number;
  defaultValue: T;
  source: Record<T, S>;
  title: string;
  icons: Record<T, ReactNode>;
  dataValues: ItemDataValue<T>[];
};

export type ItemData<T extends string, S extends BaseItemType> = S & {
  type: T;
};
