import { IconType } from 'react-icons';
import ReactSelect, { ActionMeta, SingleValue } from 'react-select';
import TextWithIcon from '../../molecules/TextWithIcon/TextWithIcon';
import { WithDefaultProps } from '../../types';

export type SelectWithIconOption<V = string> = {
  value: V;
  label: string;
  icon: IconType;
};

export type SelectWithIconProps<V> = WithDefaultProps<{
  value: SelectWithIconOption<V>;
  options: SelectWithIconOption<V>[];
  defaultOption?: SelectWithIconOption<V>;
  onChange: (
    newVal: SingleValue<SelectWithIconOption<V>>,
    actionMeta: ActionMeta<SelectWithIconOption<V>>,
  ) => void;
}>;

export default function SelectWithIcon<V>({
  className,
  options,
  defaultOption = options[0],
  onChange,
}: SelectWithIconProps<V>) {
  return (
    <ReactSelect
      defaultValue={defaultOption}
      className={className}
      isClearable={false}
      // value={currentValue}
      isSearchable={false}
      options={options}
      onChange={onChange}
      formatOptionLabel={({ value, label, icon }) => {
        return (
          <TextWithIcon
            id={`option-${value}`}
            icon={icon}
            textProps={{ type: 'p' }}
          >
            {label}
          </TextWithIcon>
        );
      }}
    />
  );
}
