import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ setPage }) => {
  return (
    <div className={css.btnContainer}>
      <button
        className={css.loadMoreBtn}
        type="button"
        onClick={() => setPage((current) => current + 1)}
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;
