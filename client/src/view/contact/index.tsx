import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "../../component/button";
import { Input } from "../../component/input";
import { TextArea } from "../../component/textarea";
import { Toast } from "../../component/toast";
import "./contact.css";

const Contact = () => {
  const initialState: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    disableForm: boolean;
    errors: Array<{
      id: string;
      message: string;
    }>;
  } = {
    disableForm: true,
    errors: [
      { id: "name", message: "" },
      { id: "email", message: "" },
      { id: "subject", message: "" },
      { id: "message", message: "" },
    ],
  };
  const [state, setState] = useState(initialState);

  emailjs.init({
    publicKey: "0Bhoz8QMe66kgkIkL",
    blockHeadless: true,
    blockList: {
      watchVariable: "userEmail",
    },
    limitRate: {
      id: "app",
      throttle: 10000,
    },
  });

  const checkMail = (mail?: string) =>
    mail &&
    mail.toLowerCase().match(
      // eslint-disable-next-line
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

  const checkForm = (element: { id: string; message: string }) =>
    // @ts-ignore
    state[element.id]
      ? element.id === "email"
        ? checkMail(state.email)
          ? element
          : { ...element, message: "Adresse email non valide" }
        : element
      : { ...element, message: "Champ requis" };

  const onClick = () => {
    state.errors = state.errors?.map(checkForm);
    setState({ ...state, disableForm: true });
    if (!state.errors.find((error) => error.message)) {
      emailjs.send("service_w42kcn9", "template_ti2qa1a", { ...state }).then(
        (_) => {
          let toast = document.getElementById("containerToast");
          if (toast) {
            toast.className = "show";
            setTimeout(() => {
              if (toast) {
                toast.className = toast.className.replace("show", "");
                setState({
                  ...state,
                  disableForm: true,
                  name: "",
                  subject: "",
                  email: "",
                  message: "",
                });
              }
            }, 3000);
          }
        },
        (error) => {
          console.log("Echec d'envoi : ", error);
        },
      );
    }
  };

  return (
    <div className={"containerContact"}>
      <Toast message={"Message envoyé"} />
      <div className={"containerForm"}>
        <div className={"formTitle"}>Formulaire de contact</div>
        <Input
          label={"Nom *"}
          value={state.name}
          errorMessage={
            state.errors?.find((element) => element.id === "name")?.message
          }
          onChange={(name: string) =>
            setState({
              ...state,
              name,
              disableForm: false,
              errors: state.errors?.map((element) =>
                element.id === "name" ? { ...element, message: "" } : element,
              ),
            })
          }
        />
        <Input
          label={"Adresse email *"}
          value={state.email}
          errorMessage={
            state.errors?.find((element) => element.id === "email")?.message
          }
          onChange={(email: string) =>
            setState({
              ...state,
              email,
              disableForm: false,
              errors: state.errors?.map((element) =>
                element.id === "email" ? { ...element, message: "" } : element,
              ),
            })
          }
        />
        <Input
          label={"Objet *"}
          value={state.subject}
          errorMessage={
            state.errors?.find((element) => element.id === "subject")?.message
          }
          onChange={(subject: string) =>
            setState({
              ...state,
              subject,
              disableForm: false,
              errors: state.errors?.map((element) =>
                element.id === "subject"
                  ? { ...element, message: "" }
                  : element,
              ),
            })
          }
        />
        <TextArea
          label={"Votre message *"}
          value={state.message}
          errorMessage={
            state.errors?.find((element) => element.id === "message")?.message
          }
          onChange={(message: string) =>
            setState({
              ...state,
              message,
              disableForm: false,
              errors: state.errors?.map((element) =>
                element.id === "message"
                  ? { ...element, message: "" }
                  : element,
              ),
            })
          }
        />
        <Button onClick={onClick} disabled={state.disableForm}>
          Envoyer
        </Button>
      </div>
    </div>
  );
};

export { Contact };
