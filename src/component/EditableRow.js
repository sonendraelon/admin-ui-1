import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

const EditableRow = ({ editFromData, handleEditFromChange, handleCancel }) => {
  const { id, name, email, role } = editFromData;

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }} key={`edited${id}`}>
      <TableCell component="th" scope="row" />
      <TableCell align="left">
        <Input
          placeholder="Enter name"
          name="name"
          value={name}
          onChange={handleEditFromChange}
        />
      </TableCell>
      <TableCell align="left">
        <Input
          placeholder="Enter email"
          name="email"
          value={email}
          onChange={handleEditFromChange}
        />
      </TableCell>
      <TableCell align="left">
        <Input
          placeholder="Enter role"
          name="role"
          value={role}
          onChange={handleEditFromChange}
        />
      </TableCell>
      <TableCell align="left">
        <Button variant="contained" sx={{ margin: "3px" }} type="submit">
          Save
        </Button>
        <Button variant="contained" sx={{ margin: "3px" }} onClick={handleCancel}>
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default EditableRow;
