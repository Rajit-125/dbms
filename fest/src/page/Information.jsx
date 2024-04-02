import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Information() {
  const [eventsData, setEventsData] = useState([]);
  const [sponsorshipData, setSponsorshipData] = useState([]);
  const [participantData, setParticipantData] = useState([]);
  const [organizersData, setOrganizersData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedSponsorship, setSelectedSponsorship] = useState(null);
  const [selectedOrganize, setSelectedOrganize] = useState(null);
  const [activeTable, setActiveTable] = useState("participant");

  useEffect(() => {
    fetchEventData();
    fetchParticipantData();
    fetchSponsorshipData();
    fetchOrganizersData();
  }, []);

  const fetchEventData=() => {
    axios.get("http://localhost:8080/Event")
      .then((response) => {
        setEventsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events data:", error);
      });
  };

  const fetchParticipantData=() => {
    axios.get("http://localhost:8080/participant")
      .then((response) => {
        setParticipantData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching participant data:", error);
      });
  };

  const fetchSponsorshipData=() => {
    axios.get("http://localhost:8080/Sponsorship")
      .then((response) => {
        setSponsorshipData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sponsorship data:", error);
      });
  };

  const fetchOrganizersData=() => {
    axios.get("http://localhost:8080/Organizes")
      .then((response) => {
        setOrganizersData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching organizers data:", error);
      });
  };

  const handleEdit = (event) => {
    setSelectedEvent({ ...event });
    console.log("Edit button clicked");
  };

  const handleSEdit = (sponsorship) => {
    setSelectedSponsorship({ ...sponsorship });
    console.log("Edit button clicked");
  };

  const handleOEdit = (organizer) => {
    setSelectedOrganize({ ...organizer });
    console.log("Edit button clicked");
  };

  const handleSaveEdit = () => {
    if (selectedEvent) {
      const updatedEventData = { ...selectedEvent };

      axios.put(
        `http://localhost:8080/Event/${selectedEvent.Ename}`,
        updatedEventData,
      )
        .then((response) => {
          console.log("Event updated successfully:", response.data);
          setSelectedEvent(null);

          // Refresh the events data after successful update
          axios.get("http://localhost:8080/Event")
            .then((response) => {
              setEventsData(response.data);
            })
            .catch((error) => {
              console.error("Error fetching updated events data:", error);
            });
        })
        .catch((error) => {
          console.error("Error updating event:", error);
        });
    }
  };

  const handleSSaveEdit = () => {
    if (selectedSponsorship) {
      const updatedSponsorship = { ...selectedSponsorship };
      axios.put(
        `http://localhost:8080/Sponsorship/${selectedSponsorship.Cname}`,
        updatedSponsorship,
      )
        .then((response) => {
          console.log("Sponsorship updated successfully:", response.data);
          setSelectedSponsorship(null);

          axios.get("http://localhost:8080/Sponsorship")
            .then((response) => {
              setSponsorshipData(response.data);
            })
            .catch((error) => {
              console.error("Error fetching updated sponsorship data:", error);
            })
            .catch((error) => {
              console.log("Error updating sponsorship:", error);
            });
        });
    }
  };

  const handleOSaveEdit = () => {
    if (selectedOrganize) {
      const updatedOrganize = { ...selectedOrganize };
      axios.put(
        `http://localhost:8080/Organizes/${selectedOrganize.Id}`,
        updatedOrganize,
      )
        .then((response) => {
          console.log("Organizers updated successfully:", response.data);
          setSelectedOrganize(null);

          axios.get("http://localhost:8080/Organizes")
            .then((response) => {
              setOrganizersData(response.data);
            })
            .catch((error) => {
              console.error("Error fetching updated organizers data:", error);
            })
            .catch((error) => {
              console.log("Error updating organizers:", error);
            });
        });
    }
  };

  const handleNavbarClick = (tableName) => {
    setActiveTable(tableName);
  };

  const renderTableBody = () => {
    switch (activeTable) {
      case "events":
        return( 
        <table className="mx-40 my-20 text-2xl text-black font-semibold table-fixed gap-x-4 bg-green-400 rounded-lg h-64">
        <thead>
          <tr className=" bg-gray-200 ">
            <th className=" p-2 border border-black">EventName</th>
            <th className=" p-2 border border-black">TeamSize</th>
            <th className=" p-2 border border-black">EntryFee</th>
            <th className=" p-2 border border-black">EventLocation</th>
            <th className=" p-2 border border-black">CompanyName</th>
            <th className=" p-2 border border-black">EventDate</th>
            <th className=" p-2 border border-black"></th>
          </tr>
        </thead>
          {eventsData.map((event) => (
          <tbody key={event.Ename}>
            {selectedEvent && selectedEvent.Ename === event.Ename
              ? (
                <tr className="">
                  <td>
                    <input
                      type="text"
                      value={selectedEvent.Ename}
                      onChange={(e) =>
                        setSelectedEvent({
                          ...selectedEvent,
                          Ename: e.target.value,
                        })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={selectedEvent.Teamsize}
                      onChange={(e) =>
                        setSelectedEvent({
                          ...selectedEvent,
                          Teamsize: e.target.value,
                        })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={selectedEvent.EntryFee}
                      onChange={(e) =>
                        setSelectedEvent({
                          ...selectedEvent,
                          EntryFee: e.target.value,
                        })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={selectedEvent.Elocation}
                      onChange={(e) =>
                        setSelectedEvent({
                          ...selectedEvent,
                          Elocation: e.target.value,
                        })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={selectedEvent.Cname}
                      onChange={(e) =>
                        setSelectedEvent({
                          ...selectedEvent,
                          Cname: e.target.value,
                        })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={selectedEvent.Date}
                      onChange={(e) =>
                        setSelectedEvent({
                          ...selectedEvent,
                          Date: e.target.value,
                        })}
                    />
                  </td>
                  <td>
                    <button
                      className="text-black bg-blue-400 rounded-2xl w-24 hover:text-white"
                      onClick={handleSaveEdit}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              )
              : (
                <tr className="">
                  <td className=" p-2 border border-black">{event.Ename}</td>
                  <td className=" p-2 border border-black">{event.Teamsize}</td>
                  <td className=" p-2 border border-black">{event.EntryFee}</td>
                  <td className=" p-2 border border-black">
                    {event.Elocation}
                  </td>
                  <td className=" p-2 border border-black">{event.Cname}</td>
                  <td className=" p-2 border border-black">
                    {new Date(event.Date).toLocaleDateString()}
                  </td>
                  <td className=" p-2 border border-black">
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
        ))}
      </table>
      )
      case "sponsorship":
        return(
          <table className=" mx-40 my-20 text-2xl text-black font-semibold table-fixed gap-x-4 bg-emerald-500 rounded-lg h-72 ">
          <thead>
            <tr className=" bg-gray-200">
              <th className=" p-2 border border-black">CompanyName</th>
              <th className=" p-2 border border-black">Funds</th>
              <th className=" p-2 border border-black"></th>
            </tr>
          </thead>
         {sponsorshipData.map((sponsorship) => (
          <tbody key={sponsorship.Cname}>
            {selectedSponsorship && selectedSponsorship.Cname === sponsorship.Cname
              ? (
                <tr className="">
                  <td>
                    <input
                      type="text"
                      value={selectedSponsorship.Cname}
                      onChange={(e) =>
                        setSelectedSponsorship({
                          ...selectedSponsorship,
                          Cname: e.target.value,
                        })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={selectedSponsorship.Funds}
                      onChange={(e) =>
                        setSelectedSponsorship({
                          ...selectedSponsorship,
                          Funds: e.target.value,
                        })}
                    />
                  </td>
                  <td>
                    <button
                      className="text-black bg-blue-400 rounded-2xl w-24 hover:text-white"
                      onClick={handleSSaveEdit}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              )
              : (
                <tr className="">
                  <td className=" p-2 border border-black">{sponsorship.Cname}</td>
                  <td className=" p-2 border border-black">{sponsorship.Funds}</td>
                  <td className=" p-2 border border-black">
                    <button
                      className="text-black bg-blue-400 rounded-2xl w-24 hover:text-white"
                      onClick={() => handleSEdit(sponsorship)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              )}
          </tbody>
        ))}
        </table>
      )
      case "organizers":
        return(
        <table className=" mx-40 my-20 text-2xl text-black font-semibold table-fixed gap-x-4 bg-blue-500 rounded-lg h-72">
        <thead>
          <tr className=" bg-gray-200">
            <th className=" p-2 border border-black">Id</th>
            <th className=" p-2 border border-black">ContactNumber</th>
            <th className=" p-2 border border-black">OrganizersName</th>
            <th className=" p-2 border border-black">TeamName</th>
            <th className=" p-2 border border-black">EventName</th>
            <th className=" p-2 border border-black"></th>
          </tr>
        </thead>
          {organizersData.map((organizer) => (
          <tbody key={organizer.Id}>
            {selectedOrganize && selectedOrganize.Id === organizer.Id
              ? (
                <tr className="">
                  <td>
                    <input
                      type="text"
                      value={selectedOrganize.Id}
                      onChange={(e) =>
                        setSelectedOrganize({
                          ...selectedOrganize,
                          Id: e.target.value,
                        })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={selectedOrganize.ContactNumber}
                      onChange={(e) =>
                        setSelectedOrganize({
                          ...selectedOrganize,
                          ContactNumber: e.target.value,
                        })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={selectedOrganize.Oname}
                      onChange={(e) =>
                        setSelectedOrganize({
                          ...selectedOrganize,
                          Oname: e.target.value,
                        })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={selectedOrganize.Tname}
                      onChange={(e) =>
                        setSelectedOrganize({
                          ...selectedOrganize,
                          Tname: e.target.value,
                        })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={selectedOrganize.Ename}
                      onChange={(e) =>
                        setSelectedOrganize({
                          ...selectedOrganize,
                          Ename: e.target.value,
                        })}
                    />
                  </td>
                  <td>
                    <button
                      className="text-black bg-blue-400 rounded-2xl w-24 hover:text-white"
                      onClick={handleOSaveEdit}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              )
              : (
                <tr className="">
                  <td className=" p-2 border border-black">{organizer.Id}</td>
                  <td className=" p-2 border border-black">
                    {organizer.ContactNumber}
                  </td>
                  <td className=" p-2 border border-black">{organizer.Oname}</td>
                  <td className=" p-2 border border-black">{organizer.Tname}</td>
                  <td className=" p-2 border border-black">{organizer.Ename}</td>
                  <td className=" p-2 border border-black">
                    <button
                      className="text-black bg-blue-400 rounded-2xl w-24 hover:text-white"
                      onClick={() => handleOEdit(organizer)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              )}
          </tbody>
        ))}
      </table>
      )
      default:
        return( 
          <table className=" mx-40 my-20 text-2xl text-black font-semibold table-fixed gap-x-4 bg-red-400 rounded-lg h-72">
        <thead>
          <tr className=" bg-gray-200">
            <th className=" p-2 border border-black">Usn</th>
            <th className=" p-2 border border-black">Name</th>
            <th className=" p-2 border border-black">Email</th>
            <th className=" p-2 border border-black">Phonenumber</th>
            <th className=" p-2 border border-black">Ename</th>
            <th className=" p-2 border border-black">Year</th>
            <th className=" p-2 border border-black">Branch</th>
            <th className=" p-2 border border-black">Gender</th>
            <th className=" p-2 border border-black">CollegeName</th>
            <th className=" p-2 border border-black">DOB</th>
          </tr>
        </thead>
          {participantData.map((participant) => (
          <tbody key={participant.usn}>
            <tr className="">
              <td className=" p-2 border border-black">{participant.usn}</td>
              <td className=" p-2 border border-black">{participant.name}</td>
              <td className=" p-2 border border-black">{participant.email}</td>
              <td className=" p-2 border border-black">
                {participant.phonenumber}
              </td>
              <td className=" p-2 border border-black">{participant.Ename}</td>
              <td className=" p-2 border border-black">{participant.year}</td>
              <td className=" p-2 border border-black">{participant.branch}</td>
              <td className=" p-2 border border-black">{participant.gender}</td>
              <td className=" p-2 border border-black">
                {participant.college}
              </td>
              <td className=" p-2 border border-black">
                {new Date(participant.dob).toLocaleDateString()}
              </td>
            </tr>
          </tbody>
        ))}
        </table>
      )
    }
  };

  return (
    <div>
      <h1 className=" mx-96 my-20 text-6xl flex justify-center text-black font-bold hover:text-gray-600">
        Fest Management System
      </h1>
      <nav className=" w-full flex justify-around text-3xl py-6 gap-2 bg-blue-300 sticky top-0">
        <button
          onClick={() => handleNavbarClick("participant")}
          className=" mx-2 hover:text-orange-500 hover:bg-green-300 px-2 rounded-2xl text-white font-bold"
        >
          Participant
        </button>
        <button
          onClick={() => handleNavbarClick("events")}
          className=" mx-2 hover:text-orange-500 hover:bg-green-300 px-2 rounded-2xl text-white font-bold"
        >
          Events
        </button>
        <button
          onClick={() => handleNavbarClick("sponsorship")}
          className=" mx-2 hover:text-orange-500 hover:bg-green-300 px-2 rounded-2xl text-white font-bold"
        >
          Sponsorship
        </button>
        <button
          onClick={() => handleNavbarClick("organizers")}
          className=" mx-2 hover:text-orange-500 hover:bg-green-300 px-2 rounded-2xl text-white font-bold"
        >
          Organizers
        </button>
        <Link to="/report">
        <button className=" mx-2 hover:text-orange-500 hover:bg-green-300 px-2 rounded-2xl text-white font-bold">Get Report</button>
        </Link>
      </nav>
      {renderTableBody()}
    </div>
  );
}

export default Information;
