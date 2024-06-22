function Confirm({ genre, gender, role }) {
  return (
    <div>
      <h1>Confirm your selection:</h1>
      <ul>
        <li>Genre: {genre}</li>
        <li>Gender: {gender}</li>
        <li>Role: {role}</li>
      </ul>
    </div>
  );
}

export default Confirm;
