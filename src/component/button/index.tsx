import "./button.css";

const Button = ({
  label,
  onClick,
  width = "100%",
  disabled = false,
}: {
  label: string;
  onClick: () => void;
  width: string;
  disabled: boolean;
}) => (
  <button onClick={onClick} style={{ width }} disabled={disabled}>
    {label}
  </button>
);

export { Button };
