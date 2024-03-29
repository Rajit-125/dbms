import axios from "axios";
import { useState } from "react";

function Feedback() {

    const [feedbackData, setFeedbackData] = useState({
        participantUsn: '',
        feedbackText: '',
        rating: 0,
    });

    const submitFeedback = async () => {
        try {
            await axios.post('http://localhost:8080/feedback', feedbackData);
            console.log('Feedback submitted successfully');
            setFeedbackData({
                participantUsn: '',
                feedbackText: '',
                rating: 0,
            });
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };
    return (
        <>
           <div className=" grid grid-cols-2 gap-4">
            <div className=" mx-96 my-40 border-2 dark:ring-8 bg-slate-200 w-96 h-96 rounded-3xl py-4 px-4">
                <h1 className=" mx-28 my-5 text-3xl text-black font-bold">Feedback Form</h1>
                <label className=" my-5 text-2xl text-black font-semibold"> USN:</label>
                <input
                    className=" mx-3 my-1 w-40 text-xl rounded-xl font-bold px-5"
                    type="text"
                    value={feedbackData.participantUsn}
                    onChange={(e) => setFeedbackData({ ...feedbackData, participantUsn: e.target.value })}
                />
                <br />
                <label className=" my-5 text-2xl text-black font-semibold">Feedback:</label>
                <textarea 
                    className=" mx-3 w-52 text-1xl rounded-xl font-bold px-5"
                    value={feedbackData.feedbackText}
                    onChange={(e) => setFeedbackData({ ...feedbackData, feedbackText: e.target.value })}
                ></textarea>
                <br />
                <label className=" my-5 text-2xl text-black font-semibold">Rating:</label>
                <input
                    className=" mx-3 my-1 w-20 text-xl rounded-xl font-bold px-5"
                    type="number"
                    value={feedbackData.rating}
                    onChange={(e) => setFeedbackData({ ...feedbackData, rating: e.target.value })}
                    placeholder="give rating.."
                />
                <br />
                <button onClick={submitFeedback} className=" mx-20 my-20 text-3xl text-black bg-red-300 rounded-2xl w-36 hover:text-blue-300" >Submit</button>
            </div>
            <img src="./assets/feed.jpg" alt="feedback" className=" my-20 rounded-3xl "/>
            </div>
        </>
    )
}
export default Feedback