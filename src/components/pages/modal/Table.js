import React from "react";

export const Table = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <td>ID</td>
          <td>Name</td>
          <td>Pass</td>
          <td>Delete</td>
        </tr>
      </thead>
      <tbody>
        {props.all.map((item) => (
          <tr key={item.id}>
            <td onClick={(e) => props.changeUser(item)}>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.password}</td>
            <td
              className="delete"
              onClick={(e) => props.deleteUser(item.id, e)}
            >
              &#10006;
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
