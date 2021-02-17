import React from 'react';
import classes from './Table.module.css';

function Table({ countries }) {
  console.log(countries);
  return (
    <div className={classes.table}>
      {countries.map(({ country, cases }) => {
        return (
          <tr>
            <td>{country}</td>
            <td>
              <strong>{cases}</strong>
            </td>
          </tr>
        );
      })}
    </div>
  );
}

export default Table;
