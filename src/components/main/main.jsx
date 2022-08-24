import PropTypes from "prop-types";
import styles from "./main.module.css";

const Main = (props) => {
  
  return (
    <main className={styles.main}>
      {props.children}
    </main>
  )
};

Main.propTypes = {
  props: PropTypes.element,
};

export default Main;