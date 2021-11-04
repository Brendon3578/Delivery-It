import { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string
  placeholder: string;
}

export function InputField ({
  id, label, ...inputProps
} : InputFieldProps) {
  return (
    <div className="input-block">
      <label htmlFor={id}>{label}</label>
      <input type="text"
        id={id}
        {...inputProps}
      />
    </div>
  );
}