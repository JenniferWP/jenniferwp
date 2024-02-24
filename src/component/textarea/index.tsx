import "./textarea.css";

const TextArea = ({
  label,
  value,
  errorMessage,
  onChange,
}: {
  label: string;
  value?: string;
  errorMessage?: string;
  onChange: (event: string) => void;
}) => (
  <div className={"containerTextarea"}>
    <label>{label}</label>
    <textarea
      value={value}
      style={{ border: errorMessage ? "2px solid var(--error-color)" : "" }}
      onChange={(event) => onChange(event.target.value)}
      rows={20}
    />
    {errorMessage && (
      <span className={"textareaErrorMessage"}>{errorMessage}</span>
    )}
  </div>
);

export { TextArea };
