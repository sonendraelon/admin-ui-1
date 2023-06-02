import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./component/NavBar";
import { Container } from "@mui/material";
import DashboardTable from "./component/DashboardTable";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./component/Fallback";

const App = () => {
  const [userData, setUserData] = useState([]);
  const [userDataOriginal, setUserDataOriginal] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const userDataPerPage = 10;

  const GREEK_TRUST_URL =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  // Getting users data
  const performApiCall = async () => {
    try {
      const response = await axios.get(GREEK_TRUST_URL);
      setUserData(response.data);
      setUserDataOriginal(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    performApiCall();
  }, []);

  // Handle search
  const handleSearch = (searchText) => {
    const filteredData = userDataOriginal.filter((val) =>
      val.name.toLowerCase().includes(searchText.toLowerCase()) ||
      val.email.toLowerCase().includes(searchText.toLowerCase()) ||
      val.role.toLowerCase().includes(searchText.toLowerCase())
    );

    setUserData(filteredData);
  };

  // Get posts for pagination
  const userDataLastIndex = currentPage * userDataPerPage;
  const userDataFirstIndex = userDataLastIndex - userDataPerPage;
  const userDataCurrent = userData.slice(userDataFirstIndex, userDataLastIndex);

  // Handle page click
  const handlePaginationClick = (event, value) => {
    setCurrentPage(value);
  };

  const handleError = (error, errorInfo) => {
    console.log(error, errorInfo);
  };

  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={Fallback} onError={handleError}>
        <NavBar />
        <br />
        <Container maxWidth="lg" className="Dashboard-Container">
          <DashboardTable
            userDataAll={userData}
            userData={userDataCurrent}
            setUserData={setUserData}
            handlePaginationClick={handlePaginationClick}
            userDataPerPage={userDataPerPage}
            totalUserData={userData.length}
            handleSearch={handleSearch}
          />
        </Container>
      </ErrorBoundary>
    </div>
  );
}

export default App;
