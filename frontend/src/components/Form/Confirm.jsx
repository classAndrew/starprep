function Confirm({ genre, gender, role }) {
  return (
    <div>
      <h1 className="form-header"> Confirm your selection:</h1>
      <ul className="form-btn-list">
        <li className="list-text">Genre: {genre}</li>
        <li className="list-text">Gender: {gender}</li>
        <li className="list-text">Role: {role}</li>
      </ul>
    </div>
  );
}

export default Confirm;
