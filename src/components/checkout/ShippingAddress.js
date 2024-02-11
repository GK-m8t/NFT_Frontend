import styles from "src/styles/pages/checkout.module.css";
import {InputField} from "src/components/common";

const ShippingAddress = ({ formik, isShippingConfirmed, isFetchingData }) => {

  const isDisable = isShippingConfirmed || isFetchingData

  return (
    <>
      <div className={styles.inputWrap_div}>
        <label className={styles.formLabel}>Address</label>
        <InputField isDisabled={isDisable} placeholder={"Street 1"} uniqueId={"address1"} formik={formik}/>
        <InputField isDisabled={isDisable} placeholder={"Street 2"} uniqueId={"address2"} formik={formik}/>

        <div className={styles.wrap_div}>
          <InputField isDisabled={isDisable} placeholder={"City"} uniqueId={"city"} formik={formik}/>
          <InputField isDisabled={isDisable} placeholder={"PIN"} uniqueId={"PIN"} formik={formik}/>
        </div>

        <InputField isDisabled={isDisable} placeholder={"State"} uniqueId={"state"} formik={formik}/>

      </div>
      {formik.touched.address1 && formik.errors.address1 ? (
        <div className={styles.errorMessage}>{formik.errors.address1}</div>
      ) : formik.touched.city && formik.errors.city ? (
        <div className={styles.errorMessage}>{formik.errors.city}</div>
      ) : formik.touched.PIN && formik.errors.PIN ? (
        <div className={styles.errorMessage}>{formik.errors.PIN}</div>
      ) : formik.touched.state && formik.errors.state ? (
        <div className={styles.errorMessage}>{formik.errors.state}</div>
      ) : null}
    </>
  );
};

export default ShippingAddress;
