import { IconType } from 'react-icons';
import { FaTableTennis } from 'react-icons/fa';
import { MdOutlineLocationCity } from 'react-icons/md';
import { RiBilliardsFill } from 'react-icons/ri';
import { SiDart } from 'react-icons/si';
import { AiOutlineTrophy } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai'


export type CommonIconTypes = 'HomeLocation' | 'Trophy' | 'Plus'

export const CommonIcons: Record<CommonIconTypes, IconType> = {
  HomeLocation: MdOutlineLocationCity,
  Trophy: AiOutlineTrophy,
  Plus: AiOutlinePlus
};

export const SportIcons: Record<string, IconType> = {
  TableTennis: FaTableTennis,
  Pool: RiBilliardsFill,
  Darts: SiDart,
};
