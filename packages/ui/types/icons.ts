import { IconType } from 'react-icons';
import { FaTableTennis } from 'react-icons/fa';
import { MdOutlineLocationCity } from 'react-icons/md';
import { RiBilliardsFill } from 'react-icons/ri';
import { SiDart } from 'react-icons/si';

export const CommonIcons: Record<string, IconType> = {
  HomeLocation: MdOutlineLocationCity,
};

export const SportIcons: Record<string, IconType> = {
  TableTennis: FaTableTennis,
  Pool: RiBilliardsFill,
  Darts: SiDart,
};
