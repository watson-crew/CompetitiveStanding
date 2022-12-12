import Link from 'next/link';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
import { UrlObject } from 'url';

type NavBarLinkProps = {
  name: string;
  path: string | UrlObject;
};

export type NavBarButtonProps = {
  name: string;
  onClick: () => void;
  isExpanded?: boolean;
};

export function NavBarNavigationLink({ name, path }: NavBarLinkProps) {
  return (
    <li>
      <Link
        href={path}
        className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100  md:p-0 md:hover:bg-transparent md:hover:text-blue-700 "
      >
        {name}
      </Link>
    </li>
  );
}

export function NavBarNavigationButton({
  name,
  onClick,
  isExpanded,
}: NavBarButtonProps) {
  return (
    <li>
      <button
        className="flex items-center text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-600"
        onClick={onClick}
      >
        {name} {isExpanded ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
      </button>
    </li>
  );
}
