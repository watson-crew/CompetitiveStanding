import { IconType } from 'react-icons';
import { FaTableTennis } from 'react-icons/fa';
import { MdOutlineLocationCity } from 'react-icons/md';
import { RiBilliardsFill } from 'react-icons/ri';
import { SiDart } from 'react-icons/si';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineTeam, AiOutlineTrophy, AiOutlineUser } from 'react-icons/ai';
import { IoMdTime } from 'react-icons/io';

export type CommonIconTypes =
  | 'HomeLocation'
  | 'Trophy'
  | 'Plus'
  | 'Person'
  | 'Team'
  | 'Clock';

export const CommonIcons: Record<CommonIconTypes, IconType> = {
  Person: AiOutlineUser,
  Team: AiOutlineTeam,
  HomeLocation: MdOutlineLocationCity,
  Trophy: AiOutlineTrophy,
  Plus: AiOutlinePlus,
  Clock: IoMdTime,
};

export const SportIcons: Record<string, IconType> = {
  TableTennis: FaTableTennis,
  Pool: RiBilliardsFill,
  Darts: SiDart,
};
