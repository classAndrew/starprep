import "../../styles/Form.css";
function Genre({ updateForm }) {
  const genres = ["Fantasy", "Science Ficton", "Horror"];
  return (
    <div>
      <h1 className="form-header">What type of genre?</h1>
      <ul className="form-btn-list">
        {genres.map((element, index) => (
          <li key={index}>
            <button
              type="button"
              name="genre"
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
export default Genre;
