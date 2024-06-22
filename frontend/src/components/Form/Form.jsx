import { useEffect, useState } from "react";
import Genre from "./Genre.jsx";
import Role from "./Role.jsx";
import Gender from "./Gender.jsx";
import Confirm from "./Confirm.jsx";
import RecordPage from "./RecordPage.jsx";

function Form() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    genre: "",
    gender: "",
    role: "",
  });
  const [script, setScript] = useState("");

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      const request = await fetch("http://localhost:8080/api/updateFeatures", {
        method: "POST",
        body: JSON.stringify(form),
      });

      const json = await request.json();

      if (request.status === 200) {
        console.log("Success");
        goToRecordPage(json.script)
      } else {
        console.log("Failed");
      }
    } catch (err) {
      console.log(err);
    }
  }

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
      case 4:
        return <Confirm {...form} />;
      case 5:
        return <RecordPage script={script}/>

      default:
        return <Confirm {...form} />;
    }
  };

  function goToRecordPage(script) {
    setScript(script);
    handleFormNavigate(1);
  }

  /**
   *
   * @param {*} num
   * @returns
   */
  function handleFormNavigate(num) {
    if (step + num > 5 || step + num <= 0) {
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

      {step === 4 ? (
        <button type="button" onClick={handleOnSubmit}>
          Submit
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            handleFormNavigate(1);
          }}
        >
          Next
        </button>
      )}
    </form>
  );
}

export default Form;
