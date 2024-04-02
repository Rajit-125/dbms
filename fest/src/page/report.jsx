import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

function Report({event}){
    const [eventsData, setEventsData] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:8080/Event")
        .then((response) => {
          setEventsData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching events data:", error);
        })
    },[])
    let navigate=useNavigate()
    const handGet = (event) => {
     navigate('/get',{state:{event:event.Ename}})
    };
    return(
        <>
        <table className="mx-40 my-20 text-2xl text-black font-semibold table-fixed gap-x-4 bg-green-400 rounded-lg h-64">
        <thead>
          <tr className=" bg-gray-200 ">
            <th className=" p-2 border border-black">EventName</th>
            <th className=" p-2 border border-black"></th>
          </tr>
        </thead>
        {eventsData.map((event) => (
          <tbody key={event.Ename}>
            <tr className="">
              <td className=" p-2 border border-black">{event.Ename}</td>
              <td className=" p-2 border border-black">
              <button onClick={()=>handGet(event)} className="text-black bg-blue-400 rounded-2xl w-24 hover:text-white">Get</button>
              </td>
            </tr>
          </tbody>
        ))}
        </table>
        </>
    )
}
export default Report