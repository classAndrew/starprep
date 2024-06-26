import React, { useState } from "react";
import Sentence from "./Sentence.jsx";
import "../../GradingPage.css";
const GradingPage = (props) => {
  const [textProgress, setTextProgress] = useState(1);
  const texts = [
    // {
    //   text: "This is a sample text section.",
    //   score: {
    //     Tone: 80,
    //     Anger: 90,
    //     Happy: 10,
    //   },
    // },
    // {
    //   text: "You can add any text here.",
    //   score: {
    //     Tone: 50,
    //     Anger: 50,
    //     Happy: 50,
    //   },
    // },
    // {
    //   text: "It is displayed on the left-hand side of the container",
    //   score: {
    //     Tone: 10,
    //     Anger: 10,
    //     Happy: 10,
    //   },
    // }
  ];

  Object.keys(props.gradingResults).forEach((e) => {
    const score = {};
    props.gradingResults[e].forEach((emotion) => {
      score[emotion.name] = Math.round(emotion.score * 10000, 2)/100;
    });
    console.log(score);
    texts.push({
      text: e,
      score: score,
    });
  });

  function updateProgressScore(index) {
    setTextProgress(index);
  }

  function showProgressForText() {
    const text = texts[textProgress];
    console.log(text.score);

    return text.score;
  }

  showProgressForText();
  return (
    <div style={styles.container}>
      <div style={styles.textSection}>
        <h1>Transcribed Audio</h1>
        {texts.map((item, index) => {
          return (
            <Sentence
              sentence={item.text}
              key={index}
              updateProgressScore={updateProgressScore}
              index={index}
            />
          );
        })}
      </div>

      <div style={styles.progressSection}>
        <h2>Progress Bars For: </h2>
        <p
        className="graded-text"
        
        >{texts[textProgress].text}</p>
        {Object.entries(showProgressForText()).map(([key, value]) => {
          return (
            <div key={key} style={styles.progressBar}>
              <label>
                {key} - {value}%
              </label>
              <progress
                value={value}
                max="100"
                style={styles.progress}
              ></progress>
            </div>
          );
        })}
        {/* <div style={styles.progressBar}>
          <label>Progress 1</label>
          <progress value="70" max="100" style={styles.progress}></progress>
        </div>
        <div style={styles.progressBar}>
          <label>Progress 2</label>
          <progress value="50" max="100" style={styles.progress}></progress>
        </div>
        <div style={styles.progressBar}>
          <label>Progress 3</label>
          <progress value="90" max="100" style={styles.progress}></progress>
        </div> */}
      </div>
    </div>
  );
};

const styles = {
  container: {
    color: "black",
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "white",
    borderRadius: "1rem"
  },
  textSection: {
    flex: 1,
    
    paddingRight: "20px",
  },
  progressSection: {
    flex: 1,
    
    paddingLeft: "20px",
  },
  progressBar: {
    marginBottom: "20px",
  },
  progress: {
    width: "100%",
    height: "20px",
  },
};

export default GradingPage;
