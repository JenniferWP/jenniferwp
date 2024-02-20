import "./textarea.css";

const TextArea = ({
  label,
  value,
  error,
  onChange,
}: {
  label: string;
  value?: string;
  error?: { value: boolean; message: string };
  onChange: (event: string) => void;
}) => (
  <div className={"containerTextArea"}>
    <label>{label}</label>
    <textarea
      value={value}
      style={{ border: error?.value ? "2px solid var(--form-error)" : "" }}
      onChange={(event) => onChange(event.target.value)}
      rows={20}
    />
    {error?.value && (
      <span className={"textAreaErrorMessage"}>{error?.message}</span>
    )}
  </div>
);

export { TextArea };
