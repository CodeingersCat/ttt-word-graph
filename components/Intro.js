import styles from '../styles/Home.module.css'

const Intro = ({url, handleSubmit}) => {
    return (
        <div className={styles.intro}>
          <a href={url} style={{"cursor": "pointer", "textDecoration": "none"}} >
            <u><i>
              <h2>{url}</h2>
            </i></u>
          </a>
          
          <button onClick={handleSubmit} className={styles.submitBtn}>
            Submit
          </button>
        </div>
    )
}

export default Intro;
