import "../../styles/Personality.css";

function Personality({ updateForm, selectedPersonality }) {
  const personalities = [
    "Confident 💪",
    "Shy 🙈",
    "Optimistic 🌞",
    "Pessimistic 🌧️",
    "Creative 🎨",
  ];

  return (
    <div>
      <h1 className="form-header">Choose a Personality</h1>
      <ul className="form-btn-list">
        {personalities.map((element, index) => (
          <li key={index}>
            <button
              type="button"
              name="personality"
              onClick={(e) => updateForm(e)}
              value={element}
              className={`${element.split(" ")[0]} 
              ${selectedPersonality !== element && "not-selected"}
              `}
            >
              {element}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Personality;
