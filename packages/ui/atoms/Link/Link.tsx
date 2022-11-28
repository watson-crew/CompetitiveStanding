import { useRouter } from 'next/router'
import { MouseEvent } from 'react'
import { WithDefaultProps } from '../../types'

type LinkProps = WithDefaultProps<{
    href: string
}>

export default function Link({ href, className = '', children }: LinkProps) {
    const router = useRouter()

    const handleClick = (e: MouseEvent) => {
        e.preventDefault()
        router.push(href)
    }

    return (
        <a
            href={href}
            onClick={handleClick}
            className={`bg-slate-400 hover:bg-slate-200 h-16 px-8 rounded-xl ${className}`}
        >
            {children}
        </a>
    )
}