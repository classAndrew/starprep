function Role({ updateForm }) {
  const role = ["Protagonist", "Antagonist", "Sidekick"];
  return (
    <div>
      <h1>What kind of character role?</h1>
      <ul>
        {role.map((element, index) => (
          <li key={index}>
            <button
              type="button"
              name="role"
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
export default Role;
