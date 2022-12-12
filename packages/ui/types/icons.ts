import { IconType } from 'react-icons';
import { FaTableTennis } from 'react-icons/fa';
import { MdOutlineLocationCity } from 'react-icons/md';
import { RiBilliardsFill } from 'react-icons/ri';
import { SiDart } from 'react-icons/si';
import { AiOutlinePlus } from 'react-icons/ai';
import { ImCheckmark, ImCross } from 'react-icons/im';
import {
  AiOutlineTeam,
  AiOutlineTrophy,
  AiOutlineUser,
  AiOutlinePercentage,
} from 'react-icons/ai';
import { GiPodium } from 'react-icons/gi';
import { IoMdTime } from 'react-icons/io';
import EloIcon from '../atoms/EloIcon/EloIcon';

export type CommonIconTypes =
  | 'HomeLocation'
  | 'Trophy'
  | 'Plus'
  | 'Person'
  | 'Team'
  | 'Clock'
  | 'Win'
  | 'Elo'
  | 'Percentage'
  | 'Podium'
  | 'Tick'
  | 'Cross';

export const CommonIcons: Record<CommonIconTypes, IconType> = {
  Person: AiOutlineUser,
  Team: AiOutlineTeam,
  HomeLocation: MdOutlineLocationCity,
  Trophy: AiOutlineTrophy,
  Plus: AiOutlinePlus,
  Clock: IoMdTime,
  Win: AiOutlineTrophy,
  Percentage: AiOutlinePercentage,
  Elo: EloIcon,
  Podium: GiPodium,
  Tick: ImCheckmark,
  Cross: ImCross,
};

export const SportIcons: Record<string, IconType> = {
  TableTennis: FaTableTennis,
  Pool: RiBilliardsFill,
  Darts: SiDart,
};
