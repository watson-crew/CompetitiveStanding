import { useEffect, useState } from 'react';

type TextInputProps = {
  title: string,
  subtitle: string,
  idLength?: number
  onChange: (id: string) => any
}

export default function TextInput({ title, subtitle = "Enter your ID", onChange }: PlayerIdInputProps) {

  const [value, setValue] = useState('');
  
  useEffect(() => {
      onChange(value)

  }, [onChange, value])

  return (
    <section className='text-center'>
      <Text type='h3'>{title}</Text>
      <Text type='p'>{subtitle}</Text>
    </section>
  )
}