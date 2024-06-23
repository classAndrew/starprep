import "../../styles/Sentence.css";

function Sentence({ sentence, index, updateProgressScore }) {
  return (
    <div onMouseOver={() => updateProgressScore(index)} className="sentences">
      <p>{sentence}</p>
    </div>
  );
}
export default Sentence;
