import styles from "/styles/Home.module.css";

const DiveLocation = (props) => {
  return <div className={styles.card}>{props.location}</div>;
};

export default DiveLocation;
