import Card, { CardProps } from "../Card/Card";
import { MdError } from 'react-icons/md'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { twMerge } from 'tailwind-merge'

type BannerType = 'info' | 'error'

export type BannerCardProps = CardProps & {
  type: BannerType
  onClose?: () => void
}

const styles: Record<BannerType, string> = {
    'error': 'bg-red-100 fill-red-600 text-red-600 border-red-600',
    'info': 'bg-blue-100 fill-blue-900 text-blue-900 border-blue-900',
} 

export default function Banner({ type, className = '', onClose, children } : BannerCardProps) {

  return (
    <Card className={twMerge("text-m font-semibold border border-solid p-5 items-center", styles[type], className)}>
      <MdError size={20} />
      <div className="mx-3 flex-1">
        {children}
      </div>
      {onClose && <button className="hover:fill-red-800" onClick={onClose}><IoMdCloseCircleOutline size={20}/></button>}
    </Card>
  )
}
