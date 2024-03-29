import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import { Alert } from "../utils/Alert";

function Signup() {
  const { signup, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const name = useRef();
  const email = useRef();
  const phone = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const checkbox = useRef();

  const displayMessage = (type, message) => {
    setShowAlert(true);
    setAlert({ type: type, message: message });
    setTimeout(() => {
      setShowAlert(false);
    }, 1500);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      const myname = name.current.value;
      const myemail = email.current.value;
      const myphone = phone.current.value;
      const mypassword = password.current.value;
      const myconfirmPassword = confirmPassword.current.value;
      const mychecked = checkbox.current.checked;

      if (mypassword != myconfirmPassword) {
        displayMessage("danger", "Password doesn't Match.");
      
      } else if (mypassword.length < 5) {
        displayMessage(
          "danger",
          "Password shouldn't be less than 5 character."
        );
      } else {
        const myresponse = await signup(myname, myemail, myphone, mypassword, mychecked);

        if (
          myresponse.data.status == "Successful"
        ) {
          displayMessage("success", myresponse.data.message);

          setTimeout(() => {
            window.location.replace("/login");
          }, 1500);
          
        } else {
          displayMessage("danger", myresponse.data.message);
        }
      }

      setLoading(false);

    } catch (error) {
      console.log("Internal Error: ", error);
      displayMessage("danger", "Internal Error Occured");
      setLoading(false);
    }
  };

  if (isAuthenticated()) {
    {
      window.location.replace("/");
    }
  } else {
      return (
        <>
          {showAlert && <Alert alert={alert} />}
          <div
            className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
          >
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <Link to={"/"}><img
                className="mx-auto h-10 w-auto invert"
                src="/Logo.png"
                alt="Epichimachal"
              /></Link>
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign up to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSignup}>

              <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      ref={name}
                      value={formData.name || ""}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 p-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address*
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      ref={email}
                      value={formData.email || ""}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 p-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone Number*
                  </label>
                  <div className="mt-2">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      ref={phone}
                      value={formData.phone || ""}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 p-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password*
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      ref={password}
                      value={formData.password || ""}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 p-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm Password*
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      ref={confirmPassword}
                      value={formData.confirmPassword || ""}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 p-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-start">
                    <div className="">
                      <input
                        id="subscription"
                        name="subscription"
                        type="checkbox"
                        ref={checkbox}
                        onChange={handleChange}
                        defaultChecked={formData.subscription}
                        className="mx-2"
                      />
                    </div>
                    <label
                      htmlFor="subscription"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Subscribe to our Newsletter
                    </label>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={loading}
                  >
                    {loading?<img className="animate-spin mr-2 invert" src="/rotate_right.svg"/>:null}
                    Sign up!
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Already have an account! {"  "}
                <Link
                  to="/login"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Sign In!
                </Link>
              </p>
            </div>
          </div>
        </>
      );
    }
  }

export { Signup };
