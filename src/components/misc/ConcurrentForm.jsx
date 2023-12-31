import React, { useState, useEffect } from "react"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useParams } from "react-router-dom";
import axios from 'axios';
const apiURL = process.env.REACT_APP_BASE_URL_LIVE;


const ConcurrentForm = () => {
    const { id } = useParams();
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [concur, setConcur] = useState()
    const [formData, setFormData] = useState({
        sip_ip: "",
        port: "",
        username: "",
        password: "",
    })

    

    //handle change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    






    return <>

        <div classname="w-full max-w-xs" style={{ margin: 'auto', marginTop: '10rem' }}>
            <form classname="bg-white shadow-lg border-2 rounded px-8 pt-6 pb-8 mb-4">


                <div classname="mb-4">
                    <label classname="block text-gray-700 text-sm font-bold mb-2" for="username">
                        SIP IP
                    </label>
                    <input
                        name="sip_ip"
                        value={formData?.sip_ip}
                        onChange={handleChange}
                        classname="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="SIP IP" />
                </div>

                <div classname="mb-4">
                    <label classname="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Port
                    </label>
                    <input
                        name="port"
                        value={formData?.port}
                        onChange={handleChange}
                        classname="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Port" />
                </div>

                <div classname="mb-4">
                    <label classname="block text-gray-700 text-sm font-bold mb-2" for="username">
                        UserName
                    </label>
                    <input
                        name="username"
                        value={formData?.username}
                        onChange={handleChange}
                        classname="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                </div>

                <div classname="mb-4" style={{ position: "relative" }}>
                    <label classname="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Password
                    </label>
                    <input
                        type={passwordVisible ? 'text' : 'password'}
                        name="password"
                        value={formData?.password}
                        onChange={handleChange}
                        classname="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        placeholder="password" />
                    <span className="password-toggle" style={{
                        position: "absolute",
                        top: "2.5rem",
                        right: " 1rem",
                    }} onClick={() => setPasswordVisible(!passwordVisible)}>
                        {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                    </span>
                </div>

                <div classname="mb-4">
                    <label classname="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Concurrent Calls
                    </label>
                    <input
                        value={concur}
                        onChange={(e) => { setConcur(e.target.value) }}
                        name="concurrent Calls"
                        classname="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Concurrent Calls" />
                </div>


                {/* <div classname="mb-4">
                    <label classname="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Concurrent Calls
                    </label>
                    <input
                        name="concurrent_call"
                        value={formData?.concurrent_call}
                        onChange={handleChange}
                        classname="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Concurrent Connection" />
                </div> */}

                <div classname="flex items-center justify-between">
                    <button classname="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" >
                        Update
                    </button>

                </div>
            </form >

        </div >

    </>
}

export default ConcurrentForm