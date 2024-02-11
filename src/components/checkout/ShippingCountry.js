import styles from "src/styles/pages/checkout.module.css";
import { CountryOptions } from "./CountryOptions";

const ShippingCountry = ({ formik, isShippingConfirmed,isFetchingData }) => {

  const isDisable = isShippingConfirmed || isFetchingData

  return (
    <div>
      <label htmlFor="country" className={styles.formLabel}>Country or Region</label>
      <div
        className={`${styles.country_div} ${
          isDisable ? styles.inputDisabled : ""
        } ${
          formik.errors.country && formik.touched.country ? styles.error : ""
        }`}
      >
        <select
          id="country"
          name="country"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.country}
          autoComplete="off"
          className={`${styles.formInput} ${styles.country} ${
            formik.values.country === "" ? styles.placeholder : ""
          }`}
        >
          <CountryOptions />
        </select>
      </div>
      {formik.touched.country && formik.errors.country ? (
        <div className={styles.errorMessage}>{formik.errors.country}</div>
      ) : null}
    </div>
  );
};

export default ShippingCountry;
