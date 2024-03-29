

import axios  from "axios";
import { useEffect, useState } from "react";

function Information() {
  const [eventsData, setEventsData] = useState([]);
  const [sponsorshipData, setSponsorshipData] = useState([]);
  const [participantData, setParticipantData] = useState([]);
  const [organizersData, setOrganizersData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/Event')
      .then(response => {
        setEventsData(response.data);
      })
      .catch(error => {
        console.error('Error fetching events data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/participant')
      .then(response => {
        setParticipantData(response.data);
      })
      .catch(error => {
        console.error('Error fetching participant data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/Sponsorship')
      .then(response => {
        setSponsorshipData(response.data);
      })
      .catch(error => {
        console.error('Error fetching sponsorship data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/Organizes')
      .then(response => {
        setOrganizersData(response.data);
      })
      .catch(error => {
        console.error('Error fetching organizers data:', error);
      });
  }, []);

  const handleEdit = (event) => {
    setSelectedEvent({ ...event });
    console.log('Edit button clicked');
  };
  
  const handleSaveEdit = () => {
    if (selectedEvent) {
      const updatedEventData = { ...selectedEvent };
  
      axios.put(`http://localhost:8080/Event/${selectedEvent.Ename}`, updatedEventData)
        .then(response => {
          console.log('Event updated successfully:', response.data);
          setSelectedEvent(null);
  
          // Refresh the events data after successful update
          axios.get('http://localhost:8080/Event')
            .then(response => {
              setEventsData(response.data);
            })
            .catch(error => {
              console.error('Error fetching updated events data:', error);
            });
        })
        .catch(error => {
          console.error('Error updating event:', error);
        });
    }
  };

  const renderTableBody = () => {
    return eventsData.map((event) => (
      <tbody key={event.Ename}>
        {selectedEvent && selectedEvent.Ename === event.Ename ? (
          <tr className="">
            <td><input type="text" value={selectedEvent.Ename} onChange={(e) => setSelectedEvent({ ...selectedEvent, Ename: e.target.value })} /></td>
            <td><input type="text" value={selectedEvent.Teamsize} onChange={(e) => setSelectedEvent({ ...selectedEvent, Teamsize: e.target.value })} /></td>
            <td><input type="text" value={selectedEvent.EntryFee} onChange={(e) => setSelectedEvent({ ...selectedEvent, EntryFee: e.target.value })} /></td>
            <td><input type="text" value={selectedEvent.Elocation} onChange={(e) => setSelectedEvent({ ...selectedEvent, Elocation: e.target.value })} /></td>
            <td><input type="text" value={selectedEvent.Cname} onChange={(e) => setSelectedEvent({ ...selectedEvent, Cname: e.target.value })} /></td>
            <td><input type="text" value={selectedEvent.Date} onChange={(e) => setSelectedEvent({ ...selectedEvent, Date: e.target.value })} /></td>
            <td>
              <button
                className="text-black bg-blue-400 rounded-2xl w-24 hover:text-white"
                onClick={handleSaveEdit}
              >
                Save
              </button>
            </td>
          </tr>
        ) : (
          <tr className="">
            <td>{event.Ename}</td>
            <td>{event.Teamsize}</td>
            <td>{event.EntryFee}</td>
            <td>{event.Elocation}</td>
            <td>{event.Cname}</td>
            <td>{event.Date}</td>
            <td>
              <button
                className="text-black bg-blue-400 rounded-2xl w-24 hover:text-white"
                onClick={() => handleEdit(event)}
              >
                Edit
              </button>
            </td>
          </tr>
        )}
      </tbody>
    ));
  };


  return (
    <div>
      <h1 className=" mx-96 my-20 text-3xl text-black font-bold">Informations</h1>

      <table className="mx-40 my-20 text-1xl text-black font-semibold table-fixed gap-x-4 bg-green-400 rounded-2xl h-64">
        <thead>
          <tr>
            <th>EventName</th>
            <th>TeamSize</th>
            <th>EntryFee</th>
            <th>EventLocation</th>
            <th>CompanyName</th>
            <th>EventDate</th>
          </tr>
        </thead>
        {renderTableBody()}
      </table>

      {/* <table className=" mx-40 my-20 text-1xl text-black font-semibold table-fixed gap-x-4 bg-green-400 rounded-2xl h-64">
        <thead >
          <tr>
          <th>EventName</th>
          <th>TeamSize</th>
          <th>EntryFee</th>
          <th>EventLocation</th>
          <th>CompanyName</th>
          <th>EventDate</th>
          </tr>
        </thead>
         {eventsData.map((event) => (
            <tbody key={event.Ename}>
              <tr className="">
                <td>{event.Ename}</td>
                <td>{event.Teamsize}</td>
                <td>{event.EntryFee}</td>
                <td>{event.Elocation}</td>
                <td>{event.Cname}</td>
                <td>{event.Date}</td>
                <td>
                <button
                  className="text-black bg-blue-400 rounded-2xl w-24 hover:text-white"
                  onClick={() => handleEdit(event)}
                >
                  Edit
                </button>
              </td>
              </tr>
            </tbody>
         ))}
      </table>

       {selectedEvent && (
        <div>
          <form>
        <input type="text" value={selectedEvent.Ename} onChange={(e) => setSelectedEvent({ ...selectedEvent, Ename: e.target.value })} />
       </form>
         <button onClick={handleSaveEdit} className=" mx-72 my-2 text-black bg-blue-400 rounded-2xl w-24 hover:text-white">Save</button>
        </div>
      )} */}

      <table className=" mx-40 my-20 text-1xl text-black font-semibold table-fixed gap-x-4 bg-red-400 rounded-2xl h-72">
        <thead >
          <th>Usn</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phonenumber</th>
          <th>Ename</th>
          <th>Year</th>
          <th>Branch</th>
          <th>Gender</th>
          <th>CollegeName</th>
          <th>DOB</th>
        </thead>
         {participantData.map((participant) => (
            <tbody key={participant.usn}>
              <tr className="">
                <td>{participant.usn}</td>
                <td>{participant.name}</td>
                <td>{participant.email}</td>
                <td>{participant.phonenumber}</td>
                <td>{participant.Ename}</td>
                <td>{participant.year}</td>
                <td>{participant.branch}</td>
                <td>{participant.gender}</td>
                <td>{participant.Cname}</td>
                <td>{participant.dob}</td>
              </tr>
            </tbody>
         ))}
      </table>

      <table className=" mx-40 my-20 text-1xl text-black font-semibold table-fixed gap-x-4 bg-emerald-500 rounded-2xl h-72 ">
        <thead >
          <th>CompanyName</th>
          <th>Funds</th>
        </thead>
         {sponsorshipData.map((sponsorship) => (
            <tbody key={sponsorship.Cname}>
              <tr className="">
                <td>{sponsorship.Cname}</td>
                <td>{sponsorship.Funds}</td>
              </tr>
            </tbody>
         ))}
      </table>

      <table className=" mx-40 my-20 text-1xl text-black font-semibold table-fixed gap-x-4 bg-blue-500 rounded-2xl h-72">
        <thead >
          <th>Id</th>
          <th>ContactNumber</th>
          <th>OrganizersName</th>
          <th>TeamName</th>
          <th>EventName</th>
        </thead>
         {organizersData.map((organizer) => (
            <tbody key={organizer.Id}>
              <tr className="">
                <td>{organizer.Id}</td>
                <td>{organizer.ContactNumber}</td>
                <td>{organizer.Oname}</td>
                <td>{organizer.Tname}</td>
                <td>{organizer.Ename}</td>
              </tr>
            </tbody>
         ))}
      </table>
    </div>
  );
}

export default Information;
