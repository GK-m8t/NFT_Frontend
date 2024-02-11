/**
  TableHead Component:
  
  Renders a table header with filter options for payment method and status.
  
  Props:
  - methodOptions, selectedMethod, handleMethodChange: Payment method filter props.
  - statusOptions, selectedStatus, handleStatusChange: Status filter props.
  - dbStatusOptions, selectedDBStatus, handleDBStatusChange: Database status filter props.
  
  State:
  - isMethodShow: Toggles visibility of payment method filter options.
  - isStatusShow: Toggles visibility of status filter options.
 */

import {useState, useEffect, useRef } from "react";
import styles from "src/styles/components/dashboardTable.module.css";
import UITexts from "src/constants/interfaceText/admin.json";

export const TableHead = ({
                            methodOptions,
                            selectedMethod,
                            handleMethodChange,
                            statusOptions,
                            selectedStatus,
                            handleStatusChange,
                            dbStatusOptions,
                            selectedDBStatus,
                            handleDBStatusChange
                          }) => {
  const [isMethodShow, setIsMethodShow] = useState(false);
  const [isStatusShow, setIsStatusShow] = useState(false);
  const methodFilterRef = useRef(null);
  const statusFilterRef = useRef(null);

  const headings = UITexts.tableHeadings;

  // Add a click event listener to close the filter on clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        methodFilterRef.current &&
        !methodFilterRef.current.contains(event.target)
      ) {
        setIsMethodShow(false);
      }

      if (
        statusFilterRef.current &&
        !statusFilterRef.current.contains(event.target)
      ) {
        setIsStatusShow(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return (
    <thead>
    <tr>
      <th>{headings.id}</th>
      <th>{headings.personalInfo}</th>
      <th>{headings.address}</th>
      <th>
        <div className='flex justify-start items-center gap-2'>
          {headings.payment}
          <div className='relative' ref={methodFilterRef}>
              <span className={styles.filterIcon_span} onClick={() => setIsMethodShow(!isMethodShow)}>
              <img src='/trace.svg'/>
              </span>
            {isMethodShow &&
            <div className={styles.filterOptions}>
              <form className="flex flex-col mt-2 mb-4 gap-2">
                {methodOptions.map((method) => (
                  <label className={styles.radioLabel}>
                    <input
                      className="radioInput"
                      type="checkbox"
                      name="method"
                      value={method}
                      checked={selectedMethod.includes(method)}
                      onChange={handleMethodChange}
                    />
                    {method}
                  </label>
                ))}
              </form>
            </div>
            }
          </div>
        </div>
      </th>
      <th>
        <div className='flex justify-start items-center gap-2'>
          {headings.status}
          <div className='relative' ref={statusFilterRef}>
              <span className={styles.filterIcon_span} onClick={() => setIsStatusShow(!isStatusShow)}>
                <img src='/trace.svg'/>
              </span>
            {isStatusShow &&
            <div className={`${styles.filterOptions} ${styles.statusOptions}`}>
              <form className="flex flex-col mt-2 mb-4 gap-2">
                <span>SC:</span>
                {statusOptions.map((status) => (
                  <label className={styles.radioLabel}>
                    <input
                      className="radioInput"
                      type="checkbox"
                      name="method"
                      value={status}
                      checked={selectedStatus.includes(status)}
                      onChange={handleStatusChange}
                    />
                    {status}
                  </label>
                ))}
                <span>DB:</span>
                {dbStatusOptions.map((status) => (
                  <label className={styles.radioLabel}>
                    <input
                      className="radioInput"
                      type="checkbox"
                      name="method"
                      value={status}
                      checked={selectedDBStatus.includes(status)}
                      onChange={handleDBStatusChange}
                    />
                    {status}
                  </label>
                ))}
              </form>
            </div>
            }
          </div>
        </div>
      </th>
    </tr>
    </thead>
  )
};