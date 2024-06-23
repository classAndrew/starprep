import "../../styles/Mission.css"

function Mission({ updateForm }) {
  const missions = ["Discover something new", "Escape something/someone", "Achieve redemption", "Right their wrongs", "Rescue someone"];

  return (
    <div>
      <h1 className="form-header">Your character is on a mission to...</h1>
      <ul className="form-btn-list">
        {missions.map((element, index) => (
          <li key={index}>
            <button
              type="button"
              name="mission"
              onClick={(e) => updateForm(e)}
              value={element}
              className="mission"
            >
              {element}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Mission;
