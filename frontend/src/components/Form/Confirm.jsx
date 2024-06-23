import "../../styles/Confirm.css"

function Confirm({ genre, personality, role, mission }) {
  return (
    <div className="confirm">
      <h1 className="form-header"> Confirm your selection:</h1>
      <ul className="form-btn-list">
        <li className="list-text">Genre: {genre}</li>
        <li className="list-text">Personality: {personality}</li>
        <li className="list-text">Role: {role}</li>
        <li className="list-text">Mission: {mission}</li>
      </ul>
    </div>
  );
}

export default Confirm;
