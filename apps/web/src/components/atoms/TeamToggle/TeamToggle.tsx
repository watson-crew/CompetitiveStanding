import { Toggle, TextWithIcon } from 'ui';
import { AiOutlineTeam, AiOutlineUser } from 'react-icons/ai';
import { MouseEventHandler, useState } from 'react';

type TeamToggleProps = {
  initialState: boolean;
  toggleTeamsEnabled: (teamsEnabled: boolean) => void;
};

export default function TeamToggle({
  initialState,
  toggleTeamsEnabled,
}: TeamToggleProps) {
  console.log(`TeamToggle initialState: ${initialState}`);

  const [toggled, setToggled] = useState(initialState);

  console.log(`TeamToggle state: ${toggled}`);

  const onChange: MouseEventHandler<HTMLDivElement> = _e => {
    console.log(`TeamToggle event current: ${toggled}`);
    setToggled(toggled => !toggled);
    console.log(`TeamToggle event postSet: ${toggled}`);
    toggleTeamsEnabled(toggled);
    console.log(`TeamToggle callback invocation: ${toggled}`);
  };

  return (
    <Toggle
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
