import styles from "src/styles/pages/checkout.module.css";

const InputField = ({ isDisabled, formik, uniqueId, placeholder }) => {
  const uniqueClass = uniqueId === "PIN" ? "pin" : uniqueId;
  const errorClass = formik.errors[uniqueId] && formik.touched[uniqueId] ? "error" : "";

  return (
    <>
      <input
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[uniqueId]}
        id={uniqueId}
        name={uniqueId}
        placeholder={placeholder}
        autoComplete="off"
        className={`${styles.formInput} ${styles[uniqueClass]} ${
          styles[errorClass]
        } ${isDisabled && styles.inputDisabled}`}
      />
    </>
  );
};

export default InputField;
