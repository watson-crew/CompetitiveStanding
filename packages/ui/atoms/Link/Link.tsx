import { WithDefaultProps } from '../../types';
import { UrlObject } from 'url';
import NextLink from 'next/link';
import { twMerge } from 'tailwind-merge';

type LinkStyleType = 'none' | 'button';

type LinkProps = WithDefaultProps<{
  href: string | UrlObject;
  style?: LinkStyleType;
  rel?: string;
}>;

const additionalStyles: Record<LinkStyleType, string> = {
  none: '',
  button: 'h-16 rounded-xl bg-slate-400 px-8 hover:bg-slate-200 ',
};

export default function Link({
  href,
  className = '',
  children,
  rel,
  style = 'none',
}: LinkProps) {
  const linkHref = (href as UrlObject).href || (href as string);

  return (
    <NextLink
      href={linkHref}
      rel={rel}
      className={twMerge(additionalStyles[style], className)}
    >
      {children}
    </NextLink>
  );
}
