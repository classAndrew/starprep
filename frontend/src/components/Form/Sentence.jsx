function Sentence({ sentence, index, updateProgressScore }) {
  return (
    <div onMouseOver={() => updateProgressScore(index)}>
      <p>{sentence}</p>
    </div>
  );
}
export default Sentence;
