import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import styles from "src/styles/pages/admin.module.css";
import UITexts from "src/constants/interfaceText/admin.json";
import {Loader, SwitchNetwork, Subtitle, Title, SignMessage} from "src/components/common";
import {UpdateStatusModal, Pagination} from "src/components/admin";
import DashboardTable from "src/components/admin/DashboardTable";
import {failToast, successToast} from "src/components/toasts";
import {useNetworkConnectionContext, useUserAuthContext} from "src/hooks";
import {useAccount} from "wagmi";
import {getAllOrders, setPrintStatus, updateStatus} from "../services";
import {getPrintStatuses} from "../services/tokens/getPrintStatus";
import {findKeyByValue,displayDummyData} from "../helper";

export default function Admin() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataFetching, setIsDataFetching] = useState(false);
  const { isInCorrectNetwork } = useNetworkConnectionContext()
  const { signedMessage, unsignedMessage, isAuthenticate, checkVerification } = useUserAuthContext();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedDBStatus, setSelectedDBStatus] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState([]);
  const [selectedToken, setSelectedToken] = useState();
  const [updatedStatus, setUpdatedStatus] = useState('');
  const { address, isConnected } = useAccount();


  const toastMessages = UITexts.toast;

  useEffect(() => {
    checkVerification();
  }, [isConnected, address,isAuthenticate]);

  useEffect(() => {
    if (isAuthenticate) {
      fetchOrderData()
    }
  }, [isAuthenticate]);

  const fetchOrderData = async () => {
    // setIsLoading(true)
    setIsDataFetching(true)
    const credential = {
      signer: JSON.stringify({ address }),
      certificate: JSON.stringify(unsignedMessage),
      signature: signedMessage,
    }
    console.log("cred", credential)
    const res = await getAllOrders(credential)

    if (res.code === 'OK') {
      const orders = await getPrintStatuses(res.data);
      console.log('orders--', orders)
      setOrderDetails(orders)
    } else {
      console.log(res)
    }
    setIsDataFetching(false)
    setIsLoading(false)
  }


  const onModalClose = () => {
    if (isAuthenticate) {
      fetchOrderData()
    }
    setSelectedToken()
    setUpdatedStatus('')
  }

  const handleContractUpdate = async () => {
    setIsLoading(true)
    const res = await setPrintStatus(selectedToken.tokenId, updatedStatus)
    console.log('res--', res)
    if (res?.blockHash) {
      successToast(toastMessages.success.updateStatus)
      onModalClose()
    } else if (res === "MetaMask Tx Signature: User denied transaction signature.") {
      failToast("Transaction rejected.")
    } else {
      failToast(toastMessages.error.updateStatus)
    }
    await fetchOrderData()
  }

  const handleDatabaseUpdate = async () => {
    setIsLoading(true)
    const credential = {
      signer: JSON.stringify({ address }),
      certificate: JSON.stringify(unsignedMessage),
      signature: signedMessage,
    }
    const shippingStatus = {
      shippingStatus: findKeyByValue(UITexts.statusCodes, updatedStatus)
    }
    const res = await updateStatus(selectedToken.tokenId, shippingStatus, credential)
    if (res.code === 'OK') {
      onModalClose()
      successToast(toastMessages.success.updateStatus)
    } else {
      failToast(toastMessages.error.updateStatus)
      console.log(res)
    }
    setIsLoading(false)
  }


  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  const filteredData = orderDetails.filter((item) => {
    const matchesSearchQuery =
      item.shipping.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tokenId.toString().includes(searchQuery) ||
      item.shipping.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(item.contractStatus);

    const matchesDBStatus = selectedDBStatus.length === 0 ||
      selectedDBStatus.includes(item.dbStatus);

    const matchesMethod = selectedMethod.length === 0 ||
      (item.payment === null ? false : selectedMethod.includes(UITexts.methodCodes[item.payment.method]));

    return matchesSearchQuery && matchesDBStatus && matchesStatus && matchesMethod;
  });

  let itemsPerPage = 10;
  const pageCount = Math.ceil(filteredData?.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentItems = filteredData?.slice(startIndex, startIndex + itemsPerPage);

  const handlePageClick = (selectedPage) => {
    if (selectedPage >= 0 && selectedPage < pageCount) {
      setCurrentPage(selectedPage);
    }
  };

  const statusOptions = Array.from(
    new Set(orderDetails.map((elem) => elem.contractStatus))
  );

  const dbStatusOptions = Array.from(
    new Set(orderDetails.map((elem) => elem.dbStatus))
  );

  const methodOptions = Array.from(
    new Set(
      orderDetails
        .map((elem) => elem.payment)
        .filter((payment) => payment !== null)
        .map((payment) => UITexts.methodCodes[payment.method])
    )
  );

  return (
    <>
      <div className={styles.div}>
        <Title title={UITexts.title}/>
        {isLoading ? (
          <Loader loading={isLoading}/>
        ) : !isAuthenticate ? (
          <SignMessage/>
        ) : isInCorrectNetwork ?
          <SwitchNetwork/>
          : (
            <>
              <Subtitle subTitle={UITexts.subTitle}/>
              <div className={styles.input_div}>
                <input
                  type="text"
                  placeholder="Search by Token Id / Personal Info"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <DashboardTable currentItems={isDataFetching?displayDummyData(4):currentItems}
                              setSelectedToken={setSelectedToken}
                              setCurrentPage={setCurrentPage}
                              isDataFetching={isDataFetching}
                              methodOptions={methodOptions}
                              selectedMethod={selectedMethod}
                              setSelectedMethod={setSelectedMethod}
                              statusOptions={statusOptions}
                              selectedStatus={selectedStatus}
                              setSelectedStatus={setSelectedStatus}
                              dbStatusOptions={dbStatusOptions}
                              selectedDBStatus={selectedDBStatus}
                              setSelectedDBStatus={setSelectedDBStatus}
              />

              {currentItems.length === 0 &&!isDataFetching&&
              <div className={styles.empty}>{UITexts.noRecord}</div>
              }

              {orderDetails?.length > itemsPerPage && !isDataFetching &&
              <div className="pagination">
                <Pagination pageCount={pageCount} onPageChange={handlePageClick} currentPage={currentPage}/>
              </div>
              }

              <UpdateStatusModal
                onContractUpdate={handleContractUpdate}
                onDatabaseUpdate={handleDatabaseUpdate}
                onClose={onModalClose}
                selectedToken={selectedToken}
                setUpdatedStatus={setUpdatedStatus}
                updatedStatus={updatedStatus}
              />
            </>
          )
        }
      </div>
    </>
  )
}
