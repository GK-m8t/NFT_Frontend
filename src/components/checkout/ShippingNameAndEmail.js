import styles from "src/styles/pages/checkout.module.css";
import {InputField} from "src/components/common";

const ShippingNameAndEmail = ({ formik, isShippingConfirmed,isFetchingData }) => {

  const isDisable = isShippingConfirmed || isFetchingData

  return (
    <div className={styles.wrap_div}>
      <div className={`${styles.inputWrap_div} ${styles.input_div}`}>
        <label htmlFor="name" className={styles.formLabel}>Name</label>
        <InputField isDisabled={isDisable} placeholder="Full name" uniqueId="name" formik={formik}/>
        {formik.touched.name && formik.errors.name ? (
          <div className={styles.errorMessage}>{formik.errors.name}</div>
        ) : null}
      </div>
      <div className={`${styles.inputWrap_div} ${styles.input_div}`}>
        <label htmlFor="email" className={styles.formLabel}>Email</label>
        <InputField isDisabled={isDisable} placeholder="Email" uniqueId="email" formik={formik}/>
        {formik.touched.email && formik.errors.email ? (
          <div className={styles.errorMessage}>{formik.errors.email}</div>
        ) : null}
      </div>
    </div>
  )
}

export default ShippingNameAndEmail;
