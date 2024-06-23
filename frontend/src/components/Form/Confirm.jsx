function Confirm({ genre, personality, role }) {
  return (
    <div>
      <h1 className="form-header"> Confirm your selection:</h1>
      <ul className="form-btn-list">
        <li className="list-text">Genre: {genre}</li>
        <li className="list-text">Personality: {personality}</li>
        <li className="list-text">Role: {role}</li>
      </ul>
    </div>
  );
}

export default Confirm;
