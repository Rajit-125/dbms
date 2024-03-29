import {
    createBrowserRouter,
} from "react-router-dom";
import Navbar from "../page/Navbar";
import Registration from "../page/Registration";
import Information from "../page/Information";
import Feedback from "../page/Feedback";
import Chat from "../page/Chatbox";



const router=createBrowserRouter(
    [
        {
            path:"/",
            element:<Navbar/>,
        },
        {
            path:"/registration",
            element:<Registration/>
        },
        {
            path:"/info",
            element:<Information/>
        },
        {
            path:"/feedback",
            element:<Feedback/>
        },
        {
            path:"/chat",
            element:<Chat/>
        },
    ],
)
export { router}