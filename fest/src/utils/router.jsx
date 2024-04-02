import {
    createBrowserRouter,
} from "react-router-dom";
import Navbar from "../page/Navbar";
import Registration from "../page/Registration";
import Information from "../page/Information";
import Feedback from "../page/Feedback";
import Chat from "../page/Chatbox";
import Report from "../page/report";
import GetRepo from "../page/Get";



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
        {
            path:"/report",
            element:<Report/>
        },
        {
            path:"/get",
            element:<GetRepo/>
        },
    ],
)
export { router}