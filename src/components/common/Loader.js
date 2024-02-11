import styles from "src/styles/components/loader.module.css";

const Loader = ({ loading }) => {
  var duration = 900,
    element,
    step,
    frames = "▙▛▜▟".split("");

  step = function (timestamp) {
    var frame =
      Math.floor((timestamp * frames.length) / duration) % frames.length;
    if (!element) {
      element = window.document.getElementById("spinner");
    }
    if (element) {
      element.innerHTML = frames[frame];
    }
    return window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);

  return (
    <>
      <div
        className={`${styles.loading_div} ${
          loading ? styles.loading_div_display : undefined
        }`}
      >
        <div id="spinner" className={styles.loading_anim}></div>
      </div>
    </>
  );
};

export default Loader;
