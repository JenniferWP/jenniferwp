import "./input.css";

const Input = ({
  label,
  value = "",
  error,
  onChange,
}: {
  label: string;
  value?: string;
  error?: { value: boolean; message: string };
  onChange: (event: string) => void;
}) => (
  <div className={"containerInput"}>
    <label>{label}</label>
    <input
      value={value}
      style={{ border: error?.value ? "2px solid var(--form-error)" : "" }}
      onChange={(event) => onChange(event.target.value)}
    />
    {error?.value && (
      <span className={"inputErrorMessage"}>{error?.message}</span>
    )}
  </div>
);

export { Input };
