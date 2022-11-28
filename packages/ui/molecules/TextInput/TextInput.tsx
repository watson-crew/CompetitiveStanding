import { ChangeEvent } from 'react';

type TextInputProps = {
  id: string,
  title: string,
  value: string,
  maxLength: number,
  onChange: (value: ChangeEvent<HTMLInputElement>) => void
}

export default function TextInput({ id, title, value, onChange, maxLength }: TextInputProps) {

  return (
    <section className='text-center'>
      <label htmlFor={id}>{title}</label>
      <input id={id} name={id} value={value} onChange={(e) => onChange(e)} maxLength={maxLength} />
    </section>
  )
}