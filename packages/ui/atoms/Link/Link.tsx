import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import { WithDefaultProps } from '../../types';
import { UrlObject } from 'url';

type LinkProps = WithDefaultProps<{
  href: string | UrlObject;
}>;

export default function Link({ href, className = '', children }: LinkProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    router.push(href);
  };

  const linkHref = (href as UrlObject).href || (href as string);

  return (
    <a
      href={linkHref}
      onClick={handleClick}
      className={`h-16 rounded-xl bg-slate-400 px-8 hover:bg-slate-200 ${className}`}
    >
      {children}
    </a>
  );
}
