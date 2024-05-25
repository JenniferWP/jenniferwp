import "./button.css";

const Button = ({
  onClick,
  width = "100%",
  disabled = false,
  children,
}: {
  onClick?: () => void;
  width?: string;
  disabled?: boolean;
  children: any;
}) => (
  <button onClick={onClick} style={{ width }} disabled={disabled}>
    {children}
  </button>
);

export { Button };
