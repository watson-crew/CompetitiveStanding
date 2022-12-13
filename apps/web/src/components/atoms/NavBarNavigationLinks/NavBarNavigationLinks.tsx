import { Link } from 'ui';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
import { UrlObject } from 'url';
import { twMerge } from 'tailwind-merge';

const commonStyles =
  'text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700';

export type NavBarLinkProps = {
  name: string;
  path: string | UrlObject;
};

export function NavBarNavigationLink({ name, path }: NavBarLinkProps) {
  return (
    <li>
      <Link
        href={path}
        className={twMerge(commonStyles, 'block rounded py-2 px-4')}
      >
        {name}
      </Link>
    </li>
  );
}

export type NavBarButtonProps = {
  name: string;
  onClick: () => void;
  isExpanded?: boolean;
};

export function NavBarNavigationButton({
  name,
  onClick,
  isExpanded,
}: NavBarButtonProps) {
  return (
    <li>
      <button
        className={twMerge(commonStyles, 'flex items-center')}
        onClick={onClick}
      >
        {name} {isExpanded ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
      </button>
    </li>
  );
}
