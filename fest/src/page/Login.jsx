import {  useState } from "react";
import {useNavigate} from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setShowPassword] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword(!password);
  };
  let Navigate = useNavigate()
  const handleOneSubmit = async (e) => {
    e.preventDefault()
    try{
      const response = await fetch(`http://localhost:8080/participant?email=${email}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
              const userDataArray = await response.json();
              if (userDataArray.length > 0) {
                const userWithEnteredEmail = userDataArray.find((user) => user.email === email);
          
                if (userWithEnteredEmail) {
                  if (password === "rajit") {
                    console.log("Login successful!");
                    alert('login successfull')
                    Navigate('/info');
                  } else {
                    alert('enter correct password')
                    console.error('Incorrect password');
                  }
                } else {
                  alert('email not found')
                  console.error('Entered email does not match any in the database');
                }
              } else {
                alert('user not found')
                console.error('User not found in the database');
              }
            } else {
              alert('error occuring in login')
              console.error('Error in login:', response.status);
            }
          } catch (error) {
            alert('errorrrrrrrrr')
            console.error('Error during login', error);
          }
 }

  return (
    <>
      <div>
        <div className=" mx-40 my-40 border-2 dark:ring-8 bg-slate-200 w-96 h-96 rounded-3xl py-4 px-4">
          <h1 className=" mx-6 my-5 font-bold text-6xl">Welcome</h1>
          <form
            id="login-form"
            action="/login"
            method="get"
            onSubmit={handleOneSubmit}
          >
            <h1 className=" mx-5 text-2xl font-bold">email</h1>
            <input
              className=" mx-3 my-1 w-80 text-xl rounded-xl font-bold px-5"
              type="text"
              placeholder="enter email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h2 className=" mx-5 my-1 text-2xl font-bold">password</h2>
            <div className="relative">
              <input
                className="mx-3 w-80 text-xl rounded-xl font-bold px-5"
                type={password ? "text" : "password"}
                placeholder="enter password..."
                value={password}
                onChange={(e) => setShowPassword(e.target.value)}
              />
              <span
                className=" absolute top-1 right-4 cursor-pointer "
                onClick={togglePasswordVisibility}
              >
                {password ? "👁️" : "👁️"}
              </span>
            </div>
            {/* <Link
              to="/signup"
              className=" my-2 mx-20 text-2xl font-bold hover:text-green-500"
            >
              new user
            </Link> */}
            <button
              className=" my-10 mx-20 text-3xl font-bold bg-red-500 h-14 px-2 py-2 rounded-2xl hover:bg-blue-800 hover:text-white"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
