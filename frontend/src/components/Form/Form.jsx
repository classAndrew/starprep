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

  /**
   *
   * @returns Element
   */
  const stepForm = () => {
    switch (step) {
      case 1:
        return <Genre updateForm={updateForm} />;
      case 2:
        return <Gender updateForm={updateForm} />;
      case 3:
        return <Role updateForm={updateForm} />;

      default:
        return <Genre updateForm={updateForm} />;
    }
  };

  /**
   *
   * @param {*} num
   * @returns
   */
  function handleFormNavigate(num) {
    if (step + num > Object.keys(form).length || step + num <= 0) {
      return;
    }
    setStep((step) => step + num);
  }

  function updateForm(e) {
    const name = e.target.name;
    const value = e.target.value;

    setForm((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  }

  function checkIfSelected() {
    const arr = Object.keys(form);
    console.log("val", arr[step]);
    console.log("step", step);
    console.log("value", form[arr[step]]);

    if (form[arr[step]] === "") {
      return false;
    }
    return true;
  }
  console.log(form);

  return (
    <form>
      {stepForm()}
      <button
        type="button"
        onClick={() => {
          handleFormNavigate(-1);
        }}
      >
        Prev
      </button>
      <button
        type="button"
        onClick={() => {
          handleFormNavigate(1);
        }}
      >
        Next
      </button>
    </form>
  );
}

export default Form;
