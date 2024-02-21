import SuccessToastLogo from "../icon/successToast.png";
import "./toast.css";

const Toast = ({ message }: { message: string }) => (
  <div id={"containerToast"} className={"containerToast"}>
    <img
      alt={SuccessToastLogo}
      src={SuccessToastLogo}
      className={"toastIcon"}
    />
    <div>{message}</div>
  </div>
);

export { Toast };
