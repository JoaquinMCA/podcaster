import React from "react";
import { Link } from "react-router-dom";

import { formatDate, formatTime } from "../utils/formating";

import classes from "../styles/Table.module.css";

export const Table = (props) => {
  return (
    <table className={classes.tableContainer}>
      <thead>
        <tr className={classes.headerRow}>
          {props.headers.map((header) => (
            <th className={classes.tableHeader} key={header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.items.map((item, index) => (
          <tr className={classes.tableRow} key={index}>
            <td className={classes.tableCellText}>
              <Link
                className={classes.episodeLink}
                to={"episode/" + item.id}
                onClick={() => {
                  props.itemSelected(item);
                }}
              >
                {item.name}
              </Link>
            </td>
            <td className={classes.tableCellText}>{formatDate(item.date)}</td>
            <td className={classes.tableCellText}>
              {formatTime(item.duration)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
