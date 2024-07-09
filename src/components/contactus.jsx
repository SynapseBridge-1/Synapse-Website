import React, { useState } from "react";
import axios from "axios";
import { FiUser, FiMail, FiMessageCircle } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false); // State to manage loading

  const handleSubmit = async (e) => {
    const basePath = process.env.VITE_backendURL;
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted

    try {
      const response = await axios.post(`${basePath}/api/contact`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        toast.success("Your message was sent successfully!");
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      toast.error("Failed to send message.");
    }
    setLoading(false); // Set loading to false when the submission is complete
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div>
        <ToastContainer
          className="custom-toast-container"
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      <div className="flex flex-col min-h-screen bg-cyan-50">
        <div className="container mx-auto mt-20 flex-grow">
          <h1 className="text-blue-900 text-4xl font-bold mb-8 text-center">
            Contact Us
          </h1>
          <p className="text-center mb-12 text-lg text-blue-700">
            Our dedicated team is here to answer your inquiries and provide
            expert guidance on integrating our services into your workflow.
          </p>
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg"
          >
            <div className="mb-6 flex items-center">
              <FiUser className="text-blue-500 mr-3 h-8 w-8" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border-b-2 border-blue-500 py-2 px-3 focus:outline-none focus:border-blue-600"
                placeholder="Your name"
                required
              />
            </div>
            <div className="mb-6 flex items-center">
              <FiMail className="text-blue-500 mr-3 h-8 w-8" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b-2 border-blue-500 py-2 px-3 focus:outline-none focus:border-blue-600"
                placeholder="Your email"
                required
              />
            </div>
            <div className="mb-6 flex items-start">
              <FiMessageCircle className="text-blue-500 mr-3 h-8 w-8" />
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full border-b-2 border-blue-500 py-2 px-3 focus:outline-none focus:border-blue-600"
                placeholder="Your message"
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="content-center    mt-3   hover:bg-blue-700 w-3/4 transition duration-300  text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                disabled={loading} // Disable button when loading
              >
                {loading ? "Submitting..." : "Submit"} 
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
