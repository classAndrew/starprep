import "../../styles/Form.css";
import "../../styles/Genre.css";
function Genre({ updateForm }) {
  const genres = ["Horror", "Mystery", "Fantasy", "Adventure", "Crime"];
  return (
    <div>
      <h1 className="form-header">Choose a Genre</h1>
      <ul className="form-btn-list">
        {genres.map((element, index) => (
          <li key={index}>
            <button
              type="button"
              name="genre"
              onClick={(e) => updateForm(e)}
              value={element}
              className={element.replace(" ", "")}
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
