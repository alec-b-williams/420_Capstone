import React from 'react';
import { useTable } from 'react-table';

function OrdersTable(props) {

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Item',
        accessor: 'item',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ]
  )

  let tableEntries = [];

  props.orders?.data.forEach( order => {
    //console.log(order.orderData)
    let date = new Date(order.orderData.date);
    let dateString = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();

    var status = "Other"; 
    
    switch(order.orderData.status) {
      case ('error'):
        status = "Error";
        break;
      case ('complete'):
        status = "Complete";
        break;
      case ('printready'):
        status = "Print Ready";
        break;
      case ('pending'):
        status = "Pending";
        break;
      case ('shipped'):
        status = "Shipped";
        break;
      case ('cancelled'):
        status = "Cancelled";
        break;
    }

    tableEntries.push({
      name: order.orderData.customerName,
      date: dateString,
      item: order._id,
      status: status,
    });
  });

  const data = React.useMemo( () => tableEntries )
  const tableInstance = useTable({ columns, data, autoResetHiddenColumns: false })

  return(
    <table {...tableInstance.getTableProps()}>
      <thead>
        {
          tableInstance.headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  { column.render('Header') }
                </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...tableInstance.getTableBodyProps()}>
        {
          tableInstance.rows.map(row => {
          tableInstance.prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {
                row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      { cell.render('Cell') }
                    </td>
                  )
                })
              }
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default OrdersTable;
