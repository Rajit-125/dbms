
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import Chat from "./Chatbox";
//import Chatbox from "./Chat";

// import axios from 'axios/axios.js';
function Registration() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [usn, setUsn] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [event, setEvent] = useState("")
    const [year, setYear] = useState("")
    const [branch, setBranch] = useState("")
    const [dob, setDob] = useState("")
    const [gen, setGen] = useState("")
    const [college, setCollege] = useState("")
    let Navigate=useNavigate()

    const handleOneSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name,
            email,
            usn,
            phoneNumber,
            event,
            year,
            branch,
            gen,
            college,
            dob,
        };

        try {
            const response = await fetch("http://localhost:8080/participant", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            // const response = await axios.post("http://localhost:8080/student",formData)

            if (response.ok) {
                Navigate('/')
                // alert('registration successfull')
                console.log("Registration successful!");
            } else {
                // alert('error occuring')
                console.error("Registration failed!");
            }
        } catch (error) {
            Navigate('/')
            // alert('error in registration')
            console.error("Error during registration:", error);
        }
    }

    return (
        <>
            <div className=" bg-[url('./assets/signup.jpg')] bg-cover grid grid-cols-2 gap-4">
            <div className=" flex flex-col">
                <div className=" my-10 mx-52 w-48 px-2 py-2 text-6xl font-bold text-white">
                    Registration Form
                </div>
                <form
                    id="student-register-form"
                    action="/registration"
                    method="post"
                    onSubmit={handleOneSubmit}
                >
                    <div className=" mx-40">
                        <h1 className=" mx-5 text-2xl font-bold text-white">Name</h1>
                        <input
                            className=" mx-3 my-1 w-80 text-xl rounded-xl font-bold px-5"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="enter name..."
                        />
                        <h1 className=" mx-5 text-2xl font-bold text-white">Email</h1>
                        <input
                            className=" mx-3 my-1 w-80 text-xl rounded-xl font-bold px-5"
                            type="text"
                            placeholder="enter email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <h3 className=" mx-5 my-1 text-2xl font-bold text-white">Gender</h3>
                        <select id="mySelect" value={gen} onChange={(e) => setGen(e.target.value)} className=" mx-3 my-1 w-80 text-xl rounded-xl font-bold px-5">
                            <option value="">Select a Gender</option>
                            <option >Male</option>
                            <option >Female</option>
                        </select>
                        <h1 className=" mx-5 text-2xl font-bold text-white">College Name</h1>
                        <input
                            className=" mx-3 my-1 w-80 text-xl rounded-xl font-bold px-5"
                            type="text"
                            placeholder="enter college name..."
                            value={college}
                            onChange={(e) => setCollege(e.target.value)}
                        />
                        <h2 className=" mx-5 my-1 text-2xl font-bold text-white">
                            event
                        </h2>
                        <select id="mySelect" value={event} onChange={(e) => setEvent(e.target.value)} className=" mx-3 my-1 w-80 text-xl rounded-xl font-bold px-5">
                            <option value="">Select an event</option>
                            <option >Dance Competition</option>
                            <option >Music Concert</option>
                            <option>Comedy Show</option>
                            <option >Film Screening</option>
                            <option>Art Exhibition</option>
                        </select>
                        <h3 className=" mx-5 my-1 text-2xl font-bold text-white">Year</h3>
                        <select id="mySelect" value={year} onChange={(e) => setYear(e.target.value)} className=" mx-3 my-1 w-80 text-xl rounded-xl font-bold px-5">
                            <option value="">Select a year</option>
                            <option >1</option>
                            <option >2</option>
                            <option >3</option>
                            <option >4</option>
                        </select>
                        <h3 className=" mx-5 my-1 text-2xl font-bold text-white">Branch</h3>
                        <select id="mySelect" value={branch} onChange={(e) => setBranch(e.target.value)} className=" mx-3 my-1 w-80 text-xl rounded-xl font-bold px-5">
                            <option value="">Select a branch</option>
                            <option >Arospace Engineering</option>
                            <option >ISE</option>
                            <option >CSE</option>
                            <option >AIML</option>
                            <option >Chemical Engineering</option>
                            <option >ECE</option>
                            <option >ET</option>
                            <option >EEE</option>
                        </select>
                        <h4 className=" mx-5 my-1 text-2xl font-bold text-white">Usn</h4>
                        <input
                            className=" mx-3 my-1 w-80 text-xl rounded-xl font-bold px-5"
                            type="text"
                            value={usn}
                            onChange={(e) => setUsn(e.target.value)}
                            placeholder="enter usn..."
                        />
                        <h5 className=" mx-5 my-1 text-2xl font-bold text-white">
                            Mobile Number
                        </h5>
                        <input
                            className=" mx-3 my-1 w-80 text-xl rounded-xl font-bold px-5"
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="enter number..."
                        />
                    </div>
                    <div className=" mx-40">
                        <label htmlFor="dob" className=" mx-5 my-1 text-2xl font-bold text-white">Date of Birth:</label>
                    </div>
                    <div className=" mx-40">
                        <input
                            className=" mx-3 my-1 w-80 text-xl rounded-xl font-bold px-5"
                            type="date"
                            id="dob"
                            name="dob"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            className=" mx-52 my-10 text-5xl font-bold text-white bg-blue-500 px-2 py-2 rounded-2xl hover:bg-red-500 hover:text-black"
                            type="submit"
                        >
                            SUBMIT
                        </button>
                    </div>
                </form>
                </div>
                <div className=" ">
                    <Chat/>
                </div>
            </div>
        </>
    );
}
export default Registration
