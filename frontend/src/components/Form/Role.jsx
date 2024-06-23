function Role({ updateForm }) {
  const role = ["Protagonist", "Antagonist", "Sidekick"];
  return (
    <div>
      <h1 className="form-header">What kind of character role?</h1>
      <ul className="form-btn-list">
        {role.map((element, index) => (
          <li key={index}>
            <button
              type="button"
              name="role"
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
export default Role;
