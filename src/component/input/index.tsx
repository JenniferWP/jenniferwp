import "./input.css";

const Input = ({
  label,
  value = "",
  errorMessage,
  onChange,
}: {
  label: string;
  value?: string;
  errorMessage?: string;
  onChange: (event: string) => void;
}) => (
  <div className={"containerInput"}>
    <label>{label}</label>
    <input
      value={value}
      style={{ border: errorMessage ? "2px solid var(--form-error)" : "" }}
      onChange={(event) => onChange(event.target.value)}
    />
    {errorMessage && (
      <span className={"inputErrorMessage"}>{errorMessage}</span>
    )}
  </div>
);

export { Input };
