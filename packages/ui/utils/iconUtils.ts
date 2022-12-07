import { IconType } from 'react-icons';
import { SportIcons } from '../types';

export const getSportIcon = (iconId: number): IconType => {
    const iconMappings: Record<number, IconType> = {
      1: SportIcons.Pool,
      2: SportIcons.Darts,
      3: SportIcons.TableTennis,
    };

    return iconMappings[iconId] || SportIcons.Pool;
  };