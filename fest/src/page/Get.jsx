import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";



function GetRepo() {
  const [participants, setParticipants] = useState([]);
  const  {state}  = useLocation();
  const {event} = state;
  useEffect(() => {
    if (event) {
      axios.get(`http://localhost:8080/report/${event}`)
        .then((response) => {
          setParticipants(response.data);
        })
        .catch((error) => {
          console.error(`Error fetching participants for event ${event}:`, error);
        });
    }
  }, [event]);


  const generateReport = () => {
    
  const pdf = new jsPDF();

  let y = 10;

  pdf.text("Participant USN", 10, y);
  pdf.text("Participant Name", 60, y);
  pdf.text("Participant Email", 120, y);

  y += 10;

  participants.forEach(participant => {
    pdf.text(participant.usn, 10, y);
    pdf.text(participant.name, 60, y);
    pdf.text(participant.email, 120, y);
    y += 10;
  });

  pdf.save("participants_report.pdf");
    console.log(participants);
  };

  return (
    <div>
      <h2 className=" mx-60 my-10 flex items-center text-3xl text-black font-bold">Participants for an Event: {event}</h2>
      <div className=" my-10">
      <table id="participant-table" className=" mx-56 text-2xl text-black font-semibold table-fixed gap-x-4 bg-green-400 rounded-lg">
        <thead>
          <tr className=" bg-gray-200">
            <th className=" p-2 border border-black">Participant USN</th>
            <th className=" p-2 border border-black">Participant Name</th>
            <th className=" p-2 border border-black">Participant Email</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr key={participant.usn}>
              <td className=" p-2 border border-black">{participant.usn}</td>
              <td className=" p-2 border border-black">{participant.name}</td>
              <td className=" p-2 border border-black">{participant.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      <button onClick={generateReport}  className="text-black bg-blue-400 rounded-2xl mx-60 my-10 flex justify-center w-24 text-1xl hover:text-white font-bold">Generate Report</button>
    </div>
  );
}

export default GetRepo;
