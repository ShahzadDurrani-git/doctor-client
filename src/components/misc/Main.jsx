import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Tabs from "./Tabs";
import Block from "./Block";
import Table from "./Table";
import GroupBlock from "./GroupBlock";
import GroupDetails from "../GroupDetails";
import TableDetail from "./TableDetails";

const Main = ({ group }) => {
  const currentPath = window.location.pathname;
  const [toggler, setToggler] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [filterData, setFilterData] = useState([]);
  const [allGroups, setAllGroups] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [GroupAllDoctors, setGroupAllDoctor] = useState()
  const [updateDoctor, setUpdateDoctor] = useState();

  // Extract the string after the last slash (/)
  const pathSegments = currentPath.split("/");
  const lastSegment = pathSegments[pathSegments.length - 2];

  useEffect(()=>{
  }, [allGroups, setAllGroups])


  return (
    <div className="mainBg p-5 h-screen">
      <Navbar />
      <Tabs />
      {group ? <GroupBlock
        filterData={filterData} setFilterData={setFilterData}
        setAllGroups={setAllGroups}
        allGroups={allGroups}
        doctors={doctors}
        setDoctors={setDoctors}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        updateDoctor={updateDoctor}
        setUpdateDoctor={setUpdateDoctor}
        isAdded={isAdded}
        setIsAdded={setIsAdded}

      /> : <Block isAdded={isAdded} setIsAdded={setIsAdded} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}  />}
      {lastSegment == "group-details" ? (
        <TableDetail
          fromDate={fromDate}
          toDate={toDate}
          filterData={filterData}
          setFilterData={setFilterData}
          setGroupAllDoctor={setGroupAllDoctor}
          doctors={doctors}
          setDoctors={setDoctors}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          updateDoctor={updateDoctor}
          setUpdateDoctor={setUpdateDoctor}
          isAdded={isAdded}
          setIsAdded={setIsAdded}
        />
      ) : (
        <Table isAdded={isAdded} setIsAdded={setIsAdded} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};

export default Main;