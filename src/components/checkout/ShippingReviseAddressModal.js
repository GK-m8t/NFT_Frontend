import Modal from "react-modal";
import styles from "src/styles/components/modals/shippingReviseAddressModal.module.css";
import UITexts from "src/constants/interfaceText/checkout.json";

const modalStyle = {
  overlay: {
    backgroundColor: "#000000C9",
    zIndex: 999,
    display: "flex"
  }
};

const ShippingReviseAddressModal = ({ reviseModalData, onUpdate, onClose }) => {
  const modalTexts = UITexts.shipping.reviseModal;
  return (
    <Modal
      isOpen={reviseModalData}
      className={styles.revise_modal + " modal"}
      style={modalStyle}
      closeTimeoutMS={300}
    >
      <div className='modal_close'>
        <button className='text-xl' onClick={onClose}>
          x
        </button>
      </div>
      <p className={styles.message_text}>{modalTexts.confirmationMessage}</p>
      <p className={styles.address_text}>
        {reviseModalData?.street1},{" "}
        {reviseModalData?.city}, {reviseModalData?.state},{" "}
        {reviseModalData?.country}-{reviseModalData?.zip}
      </p>
      <button
        data-cy='shippingModalConfirm'
        className='modal_confirmButton'
        onClick={onUpdate}
      >
        {modalTexts.button}
      </button>
    </Modal>
  );
};

export default ShippingReviseAddressModal;
