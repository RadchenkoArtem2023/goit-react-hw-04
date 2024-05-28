import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className={styles.Button}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
