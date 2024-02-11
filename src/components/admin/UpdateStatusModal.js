import Modal from "react-modal";
import styles from "src/styles/components/modals/statusUpdate.module.css";
import UITexts from "src/constants/interfaceText/admin.json";

const modalStyle = {
  overlay: {
    backgroundColor: "#000000C9",
    zIndex: 999,
    display: "flex",
  },
};

const UpdateStatusModal = ({
                             selectedToken,
                             onContractUpdate,
                             onDatabaseUpdate,
                             onClose,
                             updatedStatus,
                             setUpdatedStatus
                           }) => {
  const texts = UITexts.updateStatusModal;
  const handleStatusChange = (e) => {
    setUpdatedStatus(e.target.value);
  };
  console.log('selectedToken--', selectedToken)
  return (
    <Modal isOpen={selectedToken} className={styles.status_update_modal + " modal"} style={modalStyle}
           closeTimeoutMS={500}>
      <div className="modal_close">
        <button className="text-xl" onClick={onClose}>x</button>
      </div>
      <p className='subTitle pt-0 mb-2'>{texts.currentStatus}</p>
      <div className='flex items-center justify-start gap-5 mb-2'>
        <p className="subTitle pt-0">SC: <span className={styles.currentStatus}>{selectedToken?.contractStatus}</span></p>
        <p className="subTitle pt-0">DB: <span className={styles.currentStatus}>{selectedToken?.dbStatus}</span></p>
      </div>
      <p className='subTitle'>{texts.selectStatus}</p>
      <form className="flex flex-wrap my-4 gap-2">
        {texts.statusValues.map((status) => (
          // status !== "Requested" &&
          <label className={styles.radioLabel}>
            <input
              className="radioInput"
              type="radio"
              name="status"
              value={status}
              checked={updatedStatus === status}
              onChange={handleStatusChange}
            />
            {status}
          </label>
        ))}
      </form>
      <div className={styles.button_wrapper}>
        <div>
          <button
            className="modal_confirmButton mt-2"
            disabled={updatedStatus.length === 0}
            onClick={onContractUpdate}
          >
            {texts.contract}
          </button>
        </div>

        <div>
          <button
            className="modal_confirmButton mt-2"
            disabled={updatedStatus.length === 0}
            onClick={onDatabaseUpdate}
          >
            {texts.database}
          </button>
        </div>
      </div>

    </Modal>
  );
};

export default UpdateStatusModal;
