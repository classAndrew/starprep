function Gender({ updateForm }) {
  const gender = ["Male", "Female"];

  return (
    <div>
      <h1>What gender?</h1>
      <ul>
        {gender.map((element, index) => (
          <li key={index}>
            <button
              type="button"
              name="gender"
              onClick={(e) => updateForm(e)}
              value={element}
            >
              {element}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Gender;
