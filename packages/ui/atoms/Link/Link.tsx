import { WithDefaultProps } from '../../types';
import { UrlObject } from 'url';
import NextLink from 'next/link';

type LinkProps = WithDefaultProps<{
  href: string | UrlObject;
}>;

export default function Link({ href, className = '', children }: LinkProps) {
  const linkHref = (href as UrlObject).href || (href as string);

  return (
    <NextLink
      href={linkHref}
      className={`h-16 rounded-xl bg-slate-400 px-8 hover:bg-slate-200 ${className}`}
    >
      {children}
    </NextLink>
  );
}
