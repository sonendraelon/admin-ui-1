import React from "react";
import { TableRow, TableCell, Checkbox } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ReadOnlyRow = ({
  userData,
  handleEdit,
  handleDelete,
  handleChecked,
  isChecked,
  toggleCheck,
  setToggleCheck,
}) => {
  const isUserChecked = isChecked.includes(userData.id);

  const handleChange = (event) => {
    handleChecked(event);
  };

  const handleEditClick = (event) => {
    handleEdit(event, userData);
  };

  const handleDeleteClick = () => {
    handleDelete(userData.id);
  };

  return (
    <TableRow
      bgcolor={isUserChecked ? "#F1F1F1" : ""}
      key={userData.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <Checkbox
          value={userData.id}
          checked={isUserChecked}
          onChange={handleChange}
        />
      </TableCell>
      <TableCell align="left">{userData.name}</TableCell>
      <TableCell align="left">{userData.email}</TableCell>
      <TableCell align="left">{userData.role}</TableCell>
      <TableCell align="left">
        <EditIcon onClick={handleEditClick} />{" "}
        <DeleteIcon onClick={handleDeleteClick} />
      </TableCell>
    </TableRow>
  );
};

export default ReadOnlyRow;
