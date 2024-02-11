/**
  React component for simple pagination UI.
  
  Props:
  - pageCount: Total number of pages.
  - currentPage: Current page index.
  - onPageChange: Callback for page changes.
  
  Renders a container with previous/next buttons and current page display.
  Previous button disabled on first page, next button on last page.
  Clicking buttons triggers onPageChange with updated page number.
 */

import styles from 'src/styles/components/pagination.module.css'

const Pagination = ({ pageCount, currentPage, onPageChange }) => {

  return (
    <div className={styles.pagination}>
      <button
        className={styles.previous}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        &#60;&#60;
      </button>
      <span className={styles.selected}>Page {currentPage + 1}</span>
      <button
        className={styles.next}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pageCount - 1}
      >
        &#62;&#62;
      </button>
    </div>
  );
};

export default Pagination;
