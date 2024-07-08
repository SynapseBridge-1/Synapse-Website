import React from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { scrollToServices } from "./scroll_toServices";
import { scrollToProjects } from "./scroll_toProjects";
const Footer = () => {
  const navigate = useNavigate();

  const handleClickServices = () => {
    navigate("/");
    setTimeout(scrollToServices, 100);
  };

  const handleClickProjects = () => {
    navigate("/about");
    setTimeout(scrollToProjects, 20);
  };
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          {/* <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">Synapse Bridge</h3>
            <p>Empowering Your Business Through Technology</p>
          </div> */}
          <div className="flex  w-full md:w-1/3 px-4 mb-8 md:mb-0">
            <img
              src="../../public/images/logo.jpg"
              alt="Synapse Bridge Logo"
              className=" h-16 w-auto mx-2  border border-black rounded-full"
              style={{ maxHeight: "4rem" }} // Adjust the max height of the image
            />
            <span className=" pt-4">
              <h3 className="text-lg font-bold ">Synapse Bridge</h3>
              <p>Empowering Your Business Through Technology</p>{" "}
            </span>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
            <h3 className="text-xl text-yellow-300 hover:text-yellow-600  font-bold mb-4">
              Quick Links
            </h3>
            <ul>
              {/* <li className="mb-2"><a href="/" className="hover:underline">Home</a></li> */}

              <li>
                {" "}
                <Link to="/" className="hover:underline hover:text-orange-500">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:underline  hover:text-orange-500"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:underline hover:text-orange-500"
                >
                  Contact
                </Link>
              </li>
              <li>
                <button
                  onClick={handleClickServices}
                  className="hover:underline hover:text-orange-500"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={handleClickProjects}
                  className="hover:underline hover:text-orange-500"
                >
                  Projects
                </button>
              </li>
              {/* <li><Link to="/" className="hover:underline">Projects</Link> </li>*/}
            </ul>
          </div>
          <div className="w-full md:w-1/3 px-4">
            <h3 className="text-xl font-bold mb-4 text-yellow-300 hover:text-yellow-600 ">
              Connect with Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500"
              >
                <FaLinkedin size="2em" />
                <p>LinkedIn</p>
              </a>
              <a
                href="https://www.instagram.com/synapse.bridge/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500"
              >
                <FaInstagram size="2em" />
                <p>Instagram</p>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61555969960505&mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700"
              >
                <FaFacebook size="2em" />
                <p>Facebook</p>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 Synapse Bridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
