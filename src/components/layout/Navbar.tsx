import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo1.png";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="navbar max-w-screen-xl mx-auto fixed top-0 left-0 right-0 backdrop-blur-md shadow-lg z-50 h-16">
        <div className="navbar-start">
          <img src={logo} style={{ width: 160 }} alt="" />
        </div>
        <div className="navbar-end hidden md:flex  w-full   justify-end space-x-2">
          <button
            onClick={() => navigate("/services")}
            className=" max-w-24 text-white flex-grow btn hover:shadow-sm bg-inherit border-none h-12"
          >
            Services
          </button>
          <button
            onClick={() => navigate("/services")}
            className="bg-transparent max-w-24 text-white flex-grow btn hover:shadow-sm h-12"
          >
            Bookings
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-transparent max-w-24 text-white flex-grow btn btn-outline hover:text-white border-none hover:bg-sky-500 h-12"
          >
            Login
          </button>
        </div>

        <div className="navbar-end md:hidden">
          <div className="drawer">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex justify-end">
              <label
                htmlFor="my-drawer-4"
                className="drawer-button btn bg-transparent border-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                <li>
                  <a>Sidebar Item 1</a>
                </li>
                <li>
                  <a>Sidebar Item 2</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-16"></div>
    </>
  );
};

export default Navbar;
