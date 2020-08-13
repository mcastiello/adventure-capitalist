import { GamePage } from '../state/features/navigation/navigationTypes';

export type GameProps = {
  width: number;
  height: number;
};

export type PageProps = {
  height: number;
};

export type MenuProps = {
  page: GamePage;
};
