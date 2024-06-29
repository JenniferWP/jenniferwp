import "./button.css";

const Button = ({
  onClick,
  disabled = false,
  children,
  style,
}: {
  onClick?: () => void;
  disabled?: boolean;
  children: any;
  style?: { [key: string]: string };
}) => (
  <button onClick={onClick} style={style} disabled={disabled}>
    {children}
  </button>
);

export { Button };
