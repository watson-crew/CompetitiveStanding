import { IconBase, IconBaseProps } from 'react-icons';

export default function EloIcon(props: IconBaseProps) {
  return (
    <IconBase {...props} strokeWidth={1} viewBox={'0 0 24 24'}>
      <text x="5" y="16" fontSize={10}>
        Elo
      </text>
      <rect x="2" y="5" width="20" height="14" fill="none" />
    </IconBase>
  );
}
