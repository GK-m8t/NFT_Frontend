import styles from "src/styles/pages/checkout.module.css";
import UITexts from "src/constants/interfaceText/checkout.json";

const ShippingConfirmOrEdit = ({
                                 formik,
                                 isShippingConfirmed,
                                 isFetchingData,
                                 isEditModeOn,
                                 handleCancelEdit,
                                 resetFromValues,
                                 handleEdit
                               }) => {

  const handleCancel = () => {
    resetFromValues()
    handleCancelEdit()
  }

  const buttonTexts = UITexts.shipping.buttons
  return (
    <div className={styles.request_btnDiv}>
      {isEditModeOn &&
      <button
        onClick={handleCancel}
        className={`${styles.shippingConfirm_Button} ${styles.cancel_edit}`}
      >
        {buttonTexts.cancel}
      </button>
      }

      {isShippingConfirmed ? (
        <button
          onClick={handleEdit}
          className={`${styles.shippingConfirm_Button} ${styles.edit_info}`}
        >
          {buttonTexts.edit}
        </button>
      ) : (
        <button
          onClick={formik.handleSubmit}
          className={`${styles.shippingConfirm_Button} ${styles.shippingLoader_btn}`}
          disabled={isFetchingData||!formik.isValid}
          data-cy="confirmShipping"
        >
          {isFetchingData ? <div className="dot-elastic"></div> : buttonTexts.confirm}
        </button>
      )}
    </div>
  );
};

export default ShippingConfirmOrEdit;
