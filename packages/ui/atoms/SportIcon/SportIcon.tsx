import { FaTableTennis } from 'react-icons/fa'
import { RiBilliardsFill } from 'react-icons/ri'
import { SiDart } from 'react-icons/si'
import { IconType } from 'react-icons'
import React from 'react'

export enum SportIconType {
  Pool = 'pool',
  Darts = 'darts',
  TableTennis = 'table_tennis'
}

const iconMappings: Record<SportIconType, IconType> = {
  [SportIconType.TableTennis]: FaTableTennis,
  [SportIconType.Pool]: RiBilliardsFill,
  [SportIconType.Darts]: SiDart,
}

type SportIconProps = {
  iconType: SportIconType
  showLabel?: boolean
}

export default function SportIcon({ iconType, showLabel }: SportIconProps) {

  return (
    <section>
      {React.createElement(iconMappings[iconType], { className: 'fill-white w-12 h-12'})}
      {showLabel && <p className='text-white my-2'>{iconType}</p>}
    </section>
  )
}
