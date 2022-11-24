import { useEffect, useState } from 'react';
import OtpField from 'react-otp-field';
import Text from '../../atoms/Text/Text';

type PlayerIdInputProps = {
  title: string,
  subtitle: string,
  idLength?: number
  onChange: (id: string) => any
}

export default function PlayerIdInput({ idLength = 3, title, subtitle = "Enter your ID", onChange }: PlayerIdInputProps) {

  const [value, setValue] = useState('');
  
  useEffect(() => {

    if (idLength === value.length) {
      onChange(value)
    }

  }, [onChange, value])

  return (
    <section className='text-center'>
      <Text type='h3'>{title}</Text>
      <Text type='p'>{subtitle}</Text>

      <OtpField
          classNames='flex justify-around'
          value={value}
          onChange={setValue}
          numInputs={idLength}
          onChangeRegex={/^([0-9a-z]{0,})$/}
          autoFocus
          inputProps={{ className: 'bg-blue-100 focus:shadow-outline mx-5 w-20 text-9xl rounded-xl text-center caret-transparent align-middle font-mono', disabled: false }}
        />
    </section>
  )
}