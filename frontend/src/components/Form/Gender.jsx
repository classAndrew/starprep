function Gender({ updateForm }) {
  const gender = ["Male", "Female"];

  return (
    <div>
      <h1 className="form-header">What gender?</h1>
      <ul className="form-btn-list">
        {gender.map((element, index) => (
          <li key={index}>
            <button
              type="button"
              name="gender"
              onClick={(e) => updateForm(e)}
              value={element}
              className="form-btn"
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
