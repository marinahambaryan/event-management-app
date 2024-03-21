import { ChangeEvent } from "react";

type InputProps = {
  type: string;
  label: string;
  name: string;
  value: string;
  error?: string;
  handleChange: (e: ChangeEvent) => void;
};
const Input = ({
  type,
  label,
  name,
  value,
  error,
  handleChange,
}: InputProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={name}
        className={`appearance-none border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md py-2 px-4 w-full text-gray-700 leading-tight focus:outline-none focus:border-blue-500`}
        value={value}
        onChange={handleChange}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
export default Input;
