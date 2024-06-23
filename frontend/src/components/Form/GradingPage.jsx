import React from 'react';

const GradingPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.textSection}>
        <h1>Sample Text</h1>
        <p>
          This is a sample text section. You can add any text here.
          It is displayed on the left-hand side of the container.
        </p>
      </div>
      <div style={styles.progressSection}>
        <h2>Progress Bars</h2>
        <div style={styles.progressBar}>
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
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  textSection: {
    flex: 1,
    paddingRight: '20px'
  },
  progressSection: {
    flex: 1,
    paddingLeft: '20px'
  },
  progressBar: {
    marginBottom: '20px'
  },
  progress: {
    width: '100%',
    height: '20px'
  }
};

export default GradingPage;
