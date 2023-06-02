import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Checkbox, TextField, Button } from "@mui/material";
import PaginationComponent from "./PaginationComponent";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

const DashboardTable = ({
  userData,
  setUserData,
  handlePaginationClick,
  userDataPerPage,
  totalUserData,
  handleSearch,
  userDataAll,
}) => {
  const [toggleCheck, setToggleCheck] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [editId, setEditId] = useState(null);
  const [isChecked, setIsChecked] = useState([]);
  const [editFromData, setEditFromData] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  const checkBox = (
    <Checkbox
      onChange={(event) => {
        handleCheckedAll(event);
        setToggleCheck(!toggleCheck);
      }}
      checked={toggleCheck}
    />
  );

  const tableHead = [checkBox, "Name", "Email", "Role", "Actions"];

  const searchValue = (value) => {
    setSearchText(value);
    handleSearch(value);
  };

  const handleEdit = (event, data) => {
    event.preventDefault();
    setEditId(data.id);

    const formValue = {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    };
    setEditFromData(formValue);
  };

  const handleEditFromChange = (event) => {
    event.preventDefault();
    const name = event.target.getAttribute("name");
    const value = event.target.value;
    const newFormData = { ...editFromData, [name]: value };
    setEditFromData(newFormData);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedContact = {
      id: editFromData.id,
      name: editFromData.name,
      email: editFromData.email,
      role: editFromData.role,
    };

    const newUserData = userDataAll.map((data) =>
      data.id === editId ? editedContact : data
    );
    setUserData(newUserData);
    setEditId(null);
  };

  const handleCancel = () => {
    setEditId(null);
  };

  const handleDelete = (ID) => {
    const newUserData = userDataAll.filter((data) => data.id !== ID);
    setUserData(newUserData);
  };

  const handleChecked = (event) => {
    const { value, checked } = event.target;
    const updatedChecked = checked
      ? [...isChecked, value]
      : isChecked.filter((event) => event !== value);
    setIsChecked(updatedChecked);
  };

  const handleCheckedAll = (event) => {
    const { checked } = event.target;
    const allIndex = userData.map((data) => data.id);
    const updatedChecked = checked ? allIndex : [];
    setIsChecked(updatedChecked);
  };

  const handleAllDelete = () => {
    const newUserData = userDataAll.filter((data) => !isChecked.includes(data.id));
    setUserData(newUserData);
    if (isChecked.length === 10) {
      setToggleCheck(!toggleCheck);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <TextField
          fullWidth
          id="Search-Bar"
          label="Search by name, email or role"
          variant="filled"
          value={searchText}
          onChange={(event) => {
            searchValue(event.target.value);
          }}
        />
        <form onSubmit={handleEditFormSubmit}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHead.map((data, index) => (
                  <TableCell key={index} align="left">
                    {data}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.map((userData) =>
                editId === userData.id ? (
                  <EditableRow
                    key={`edit${userData.id}`}
                    editFromData={editFromData}
                    handleEditFromChange={handleEditFromChange}
                    handleCancel={handleCancel}
                  />
                ) : (
                  <ReadOnlyRow
                    key={`read${userData.id}`}
                    userData={userData}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleChecked={handleChecked}
                    isChecked={isChecked}
                    toggleCheck={toggleCheck}
                    setToggleCheck={setToggleCheck}
                  />
                )
              )}
            </TableBody>
          </Table>
        </form>

        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <PaginationComponent
            handlePaginationClick={handlePaginationClick}
            userDataPerPage={userDataPerPage}
            totalUserData={totalUserData}
          />
        </Paper>
      </TableContainer>
      <Button
        variant="contained"
        sx={{ marginTop: "1rem" }}
        onClick={handleAllDelete}
      >
        Delete Selected
      </Button>
      <br />
      <br />
    </>
  );
};

export default DashboardTable;
