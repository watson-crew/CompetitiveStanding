import { Toggle, TextWithIcon, WithDefaultProps } from 'ui';
import { AiOutlineTeam, AiOutlineUser } from 'react-icons/ai';

type TeamToggleProps = WithDefaultProps<{
  toggled: boolean;
  onChange: () => void;
}>;

export default function TeamToggle({
  className,
  toggled,
  onChange,
}: TeamToggleProps) {
  return (
    <Toggle
      className={className}
      isToggled={toggled}
      onChange={onChange}
      defaultColor="yellow-500"
      toggledColor="cyan-800"
      beforeChild={
        <TextWithIcon
          textProps={{ type: 'p' }}
          icon={AiOutlineUser}
          reversed={true}
        >
          Singles
        </TextWithIcon>
      }
      afterChild={
        <TextWithIcon textProps={{ type: 'p' }} icon={AiOutlineTeam}>
          Teams
        </TextWithIcon>
      }
    />
  );
}
