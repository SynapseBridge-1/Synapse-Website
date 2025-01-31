import React from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
// import { scrolldetect } from "./scroll";
import "../assets/css/hero.css";
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false); // State to manage loading

  const handleSubmit = async (e) => {
    const basePath = import.meta.env.VITE_backendURL;
    // const port=import.meta.env.VITE_PORT;
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
      <section
        id="contactSection"
        className="relative  py-3 overflow-hidden bg-blue-50 sm:py-16 lg:py-10 xl:py-24 dark:bg-slate-800"
        data-block-content="true"
      >
        <div className="absolute bottom-0 dark:bg-slate-700 left-0 lg:w-[50%] bg-sky-200 lg:h-[75%] hidden lg:block"></div>
        <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 gap-y-3 lg:grid-cols-2 lg:gap-x-16 xl:gap-x-36">
            <div className="xl:pl-8 lg:order-2">
              <h2 className="text-4xl font-semibold tracking-tight text-blue-900 md:text-5xl dark:text-white/90">
                Connect with Synapse Bridge
              </h2>
              <div className="bg-white p-8 mt-7 rounded-lg shadow-md">
                {/* <h2 className="text-3xl font-bold text-blue-900 mb-6">Contact Us</h2> */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your Name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your Email"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      name="message"
                      value={formData.message}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your Message"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      className="content-center  mt-3   hover:bg-blue-700 w-3/4 transition duration-300  text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      disabled={loading} // Disable button when loading
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
                {/* Email Section */}
                <div className="flex flex-col items-center mt-8 px-4 sm:px-0">
                  <p className="text-lg font-medium text-gray-700 mb-2 text-center ">
                    Or reach us via email:
                  </p>
                  <a
                    href="mailto:synapse.bridge@outlook.com"
                    className="text-xl sm:text-2xl text-blue-600 font-semibold hover:text-blue-800 hover:underline no-underline transition duration-300 break-all"
                  >
                    synapse.bridge@outlook.com
                  </a>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="large_screen relative bottom-16 px-6 lg:px-0 lg:order-1">
              <div className="absolute bottom-0 left-0 w-full dark:bg-slate-700 -mb-12 bg-sky-300 sm:h-96 sm:-mb-16 h-72 lg:hidden"></div>
              <div style={{ opacity: 1, transform: "none" }}>
                <img
                  alt="Connect with Synapse Bridge"
                  className="relative object-cover w-full h-full rounded-2xl bg-slate-100 aspect-[4/3]"
                  src="https://cdn.a1.art/assets/images/app_1811317900177637378/1811317900181831681/fd2fa64a-eaa8-45d6-bcf8-7d70ed6a8354.jpeg"
                />
              </div>
            </div>
          </div>
          {/* small screen Image Section */}
          <div className="small_screen mt-4  bg-sky-300 relative lg:order-1">
            <div className="aspect-w-4 aspect-h-3">
              <img
                alt="Connect with Synapse Bridge"
                className="object-cover w-full h-full  bg-slate-100 rounded-lg shadow-md"
                src="https://cdn.a1.art/assets/images/app_1811317900177637378/1811317900181831681/fd2fa64a-eaa8-45d6-bcf8-7d70ed6a8354.jpeg"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
