import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from './misc/Sidebar';
import Navbar from './misc/Navbar';
import Button from "./misc/Button";

const apiURL = process.env.REACT_APP_BASE_URL_LOCAL
function Setting() {

    const navigate = useNavigate();
    const [settings, setSettings] = useState([
        {
            id: "1",
            sip_ip: "16.163.178.109",
            port: "8000",
            username: "1601",
            password: "ab975@yTpL9",
        }
    ]);

    console.log('are you even there?')
 


    //update setting 
    const updateHandler = (id) => {
        console.log("update handler", id)
    }
    // delete setting 
    const deleteHandler = (id) => {
        console.log("delete handler")

    }

    

    return (
        <div className="flex h-screen">
            <div className="w-2/12 h-screen"><Sidebar /></div>
            <div className="mainBg w-10/12">
                <div style={{ padding: "2rem" }}>
                    <Navbar />
                    {/* <Modal open={open} setOpen={setOpen} currentChat={currentChat} /> */}
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
                        <div className="w-2/12" style={{ float: "right", margin: "0.5rem 0" }}>
                            <Button onClick={() => navigate("/concurrent-calls")} icon={'/imgs/plus.png'} text='Add Setting' active />
                        </div>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3  text-center">
                                        SIP IP
                                    </th>
                                    <th scope="col" className="px-6 py-3  text-center">
                                        PORT
                                    </th>
                                    <th scope="col" className="px-6 py-3  text-center">
                                        USER NAME
                                    </th>
                                    <th scope="col" className="px-6 py-3  text-center">
                                        PASSWORD
                                    </th>
                                    <th scope="col" className="px-6 py-3  text-center">
                                        CONCURRENT CALLS
                                    </th>
                                    <th scope="col" className="px-6 py-3 cursor-pointer  text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>


                                {settings?.map((item, index) => {
                                    return (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th
                                                scope="row"
                                                className="flex justify-center  items-center  py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {/* <div className="">
                                                    <div className="text-base font-semibold">{item?.sip_ip}</div>
                                                </div> */}

                                                <td className="px-6 py-0 text-center">{item?.sip_ip}</td>
                                            </th>
                                            <td className="px-6 py-0 text-center">{item?.port}</td>
                                            <td className="px-6 py-0 text-center">{item?.username}</td>
                                            <td className="px-6 py-0 text-center">{item?.password}</td>
                                            <td className="px-6 py-0 text-center">{item?.concurrent_call}</td>
                                            <td
                                                className="flex items-center px-6 py-4 text-center cursor-pointer"
                                            // onClick={() => {
                                            //     setOpen(true);
                                            // }}
                                            >
                                                <img className='py-0' src="/imgs/edit.svg" onClick={() => updateHandler(item)} />
                                                <img className='py-0' src="/imgs/delete.svg" onClick={() => deleteHandler(item?.id)} />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Setting
