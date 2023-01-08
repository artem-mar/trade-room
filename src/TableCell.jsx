import React from 'react';
import Timer from './Timer';

const TableCell = ({ params }) => {
  const {
    id, key, value, i, activeTraderId,
  } = params;

  switch (key) {
    case 'name':
      return (
        <td className="text-center px-5">
          <span>{`участник №${i + 1}`}</span>
          <p className="mb-0">{value}</p>
        </td>
      );
    case 'id':
      return (
        <td
          className={`text-center px-5 ${activeTraderId === id && 'table-danger'}`}
        >
          {activeTraderId === id && <Timer />}
        </td>
      );
    default:
      return (
        <td className="text-center px-5">
          {value}
        </td>
      );
  }
};

export default TableCell;
