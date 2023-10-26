import React from "react";
import Heading from "./Heading";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import EmailComposePage from "./SendEmail";

const Sidebar = () => {
  const navigate = useNavigate();
  const icons = [
    "/imgs/logo.svg",
    "/imgs/qq.png",
    "/imgs/status.svg",
    "/imgs/document.svg",
    "/imgs/notification.svg",
    "/imgs/setting-2.svg",
    "/imgs/logout.svg",
    "/imgs/setting.svg",
  ];
  const currentPath = window.location.pathname;

  // Extract the string after the last slash (/)
  const pathSegments = currentPath.split("/");
  const lastSegment = pathSegments[pathSegments.length - 2];

  var addDoctor = false;
  var group = false;
  var email = false;
  var setting = false;

  console.log(window.location.origin);

  if (pathSegments.includes("add-doctor")) {
    addDoctor = true;
  }

  if (
    pathSegments.includes("group") ||
    pathSegments.includes("group-details") ||
    window.location.pathname == "/"
  ) {
    group = true;
  }

  if (pathSegments.includes("concurrent-calls")) {
    setting = true;
  }
  if (pathSegments.includes("email")) {
    email = true;
  }

  return (
    <div className="p-5 flex flex-col justify-between h-screen">
      <div>
        <div className="logo flex items-center gap-2" onClick={() => {navigate("/")}}>
          {/* <img src={icons[0]} className="w-1/3" /> */}
          <h1 className="sidebar__main__heading bg-black text-white pl-5 pr-5 ">Marketing</h1>
        </div>
        <Heading text={"Main Menu"} />
        <div
          onClick={() => {
            navigate("/");
          }}
        >
          {group ? (
            <Button text="Add Group" icon={icons[1]} active my />
          ) : (
            <Button text="Add Group" icon={icons[1]} my />
          )}
        </div>
        {/* <div onClick={() => {
          navigate('/group-details')
        }}>
          {
            lastSegment == 'group-details' ? <Button text='Details' icon={icons[2]} active my /> : <Button text='Details' icon={icons[2]} my />
          }
        </div> */}
        {/* <div
          onClick={() => {
            navigate("/add-doctor");
          }}
        >
          {addDoctor ? (
            <Button text="Add Doctor" icon={icons[3]} my active />
          ) : (
            <Button text="Add Doctor" icon={icons[3]} my />
          )}
        </div> */}
        <div
          onClick={() => {
            navigate("/email");
          }}
        >
          {email ? (
            <Button text="Compose Email" icon={icons[2]} my active />
          ) : (
            <Button text="Compose Email" icon={icons[2]} my />
          )}
        </div>
        {/* <Button text="Notification" icon={icons[4]} my /> */}
        <div
          onClick={() => {
            // navigate("/setting");
            navigate("/concurrent-calls");
          }}
        >
          {setting ? (
            <Button text="Setting" icon={icons[icons.length - 1]} my active />
          ) : (
            <Button text="Setting" icon={icons[icons.length - 1]} my />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
