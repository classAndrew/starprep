import { useState } from "react";
import Genre from "./Genre.jsx";
import Role from "./Role.jsx";
import Gender from "./Gender.jsx";

function Form() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    genre: "",
    gender: "",
    role: "",
  });

  const stepForm = () => {
    switch (step) {
      case 1:
        return <Genre />;
      case 2:
        return <Gender />;
      case 3:
        return <Role />;

      default:
        return <Genre />;
    }
  };

  function handleFormNavigate(num) {
    setStep((step) => step + num);
  }

  return (
    <form>
      {stepForm()}
      <button type="button" onClick={() => handleFormNavigate(-1)}>
        Prev
      </button>
      <button type="button" onClick={() => handleFormNavigate(1)}>
        Next
      </button>
    </form>
  );
}

export default Form;
