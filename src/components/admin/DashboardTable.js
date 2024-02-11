/*
  DashboardTable Component:
  - Displays a table with dynamic content based on the 'currentItems' prop.
  - Allows filtering data by method, status, and database status through checkboxes.
  - Utilizes a TableHead component for column headers and filtering controls.
  - Renders detailed information for each item in 'currentItems'.
  - Provides functionality to update the selected item by clicking the "Update" button.
  - Uses CSS modules for styling, importing from "dashboardTable.module.css".
  - Retrieves interface text constants from "admin.json" using UITexts.
*/


import styles from "src/styles/components/dashboardTable.module.css";
import UITexts from "src/constants/interfaceText/admin.json";
import {TableHead} from "./TableHead";
import {LocalLoader} from "src/components/common";

const DashboardTable = ({
                          currentItems,
                          setSelectedToken,
                          setCurrentPage,
                          isDataFetching,
                          methodOptions,
                          selectedMethod,
                          setSelectedMethod,
                          statusOptions,
                          selectedStatus,
                          setSelectedStatus,
                          dbStatusOptions,
                          selectedDBStatus,
                          setSelectedDBStatus
                        }) => {

  const handleDBStatusChange = (e) => {
    const { value, checked } = e.target;
    setSelectedDBStatus((prevSelectedDBStatus) => {
      if (checked) {
        return [...prevSelectedDBStatus, value];
      } else {
        return prevSelectedDBStatus.filter((status) => status !== value);
      }
    });
    setCurrentPage(0);
  };

  // Function to handle status checkbox change
  const handleStatusChange = (e) => {
    const { value, checked } = e.target;
    setSelectedStatus((prevSelectedStatus) => {
      if (checked) {
        return [...prevSelectedStatus, value];
      } else {
        return prevSelectedStatus.filter((status) => status !== value);
      }
    });
    setCurrentPage(0);
  };

  // Function to handle method checkbox change
  const handleMethodChange = (e) => {
    const { value, checked } = e.target;
    setSelectedMethod((prevSelectedMethod) => {
      if (checked) {
        return [...prevSelectedMethod, value];
      } else {
        return prevSelectedMethod.filter((method) => method !== value);
      }
    });
    setCurrentPage(0);
  };

  return (
    <table className={styles.table_div}>
      <TableHead selectedMethod={selectedMethod}
                 methodOptions={methodOptions}
                 handleMethodChange={handleMethodChange}
                 selectedStatus={selectedStatus}
                 statusOptions={statusOptions}
                 handleStatusChange={handleStatusChange}
                 selectedDBStatus={selectedDBStatus}
                 dbStatusOptions={dbStatusOptions}
                 handleDBStatusChange={handleDBStatusChange}
      />
      {currentItems.length > 0 &&
      <tbody>
      {
        currentItems.map((item, index) => (
          <tr key={index}>
            <td>{isDataFetching ? <LocalLoader /> : "#"+ item.tokenId}</td>
            <td>
            {isDataFetching ? <LocalLoader /> : 
              <div className={styles.double_row}>
                <span className={styles.userName}>{item.shipping.name}</span> {item.shipping.email}
              </div>
            }
            </td>
            <td>
            {isDataFetching ? <LocalLoader /> : 
              <div className={styles.double_row}>
                <span className={styles.userName}>{item.shipping.address?.street1}, {item.shipping.address?.city},</span> {item.shipping.address?.state}, {item.shipping.address?.country}-{item.shipping.address?.zip}
              </div>
            }
            </td>
            <td>
            {isDataFetching ? <LocalLoader /> : 
              <div className={styles.double_row}>
                <span>${(item.cost.print + item.cost.ship).toFixed(2)}{", "} {item.payment === null ? "-" : UITexts.methodCodes[item.payment.method]} <br /> {item.paymentStatus}</span>
                </div>
            }
            </td>
            <td>
              <div className={styles.status_col}>
              {isDataFetching ? <LocalLoader /> : 
                <div className={styles.double_row}>
                  <p>[ SC ]  <span className={styles.status}>{item.contractStatus}</span></p>
                  <p>[ DB ]  <span className={styles.status}>{item.dbStatus}</span></p>
                </div>
              }
                <button className={styles.updateButton} onClick={() => setSelectedToken(item)} disabled={isDataFetching}>{isDataFetching ? <LocalLoader /> : "Update"}</button>
              </div>
            </td>
          </tr>
        ))
      }
      </tbody>
      }
    </table>
  )
}

export default DashboardTable;
