function Genre({ updateForm }) {
  const genres = ["Fantasy", "Science Ficton", "Horror"];
  return (
    <div>
        <h1>What type of genre?</h1>
      <ul>
        {genres.map((element, index) => (
          <li key={index}>
            <button
              type="button"
              name="genre"
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
export default Genre;
