import React, { useState } from "react";
import { FaPlus, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube, AiOutlineMail } from "react-icons/ai";

const Toggleform = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBasicSection, setIsBasicSection] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    instagram: "",
    youtube: "",
  });
  const [submittedData, setSubmittedData] = useState(null);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
    console.log("form data in toggle", formData);

    setIsBasicSection(true);
  };

  const toggleSection = () => {
    setIsBasicSection(!isBasicSection);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = () => {
    console.log(formData);
    setSubmittedData(formData);

    setFormData({
      name: "",
      email: "",
      phone: "",
      instagram: "",
      youtube: "",
    });
    toggleForm();
  };

  return (
    <>
      <div>
        {submittedData ? (
          <div className="p-4">
            <h2 className="text-3xl font-semibold mb-5 md:mb-10">
              {submittedData.name}
            </h2>
            <Profileitems
              ficon={
                <div className="h-8 w-8 rounded-full mr-3 text-xl text-[#3CC952] flex justify-center items-center bg-[#E9F9EB] ">
                  <FaWhatsapp />
                </div>
              }
              sicon={
                <div className="h-8 w-8 rounded-full mr-3 text-xl text-[#FF0000] flex justify-center items-center bg-[#FFE9E9] ">
                  <FaInstagram />
                </div>
              }
              id_name={"+91 " + submittedData.phone}
              social={submittedData.instagram}
            />
            <Profileitems
              ficon={
                <div className="h-8 w-8 rounded-full mr-3 text-xl text-[#5C33CF] flex justify-center items-center bg-[#EBE6F9] ">
                  <AiOutlineMail />
                </div>
              }
              sicon={
                <div className="h-8 w-8 rounded-full mr-3 text-xl text-[#FF0000] flex justify-center items-center bg-[#FFE9E9] ">
                  <AiOutlineYoutube className=" " />
                </div>
              }
              id_name={submittedData.email}
              social={submittedData.youtube}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <div className="cursor-pointer my-auto h-full">
              <div
                onClick={toggleForm}
                className="bg-[#F2F2F2] h-20 w-20 px-4 py-2 flex justify-center items-center rounded-full"
              >
                <FaPlus className="text-[#999CA0] text-3xl" />
              </div>
              <div className="text-xl mt-4 text-center">Add Profile</div>
            </div>
          </div>
        )}
        {isFormOpen && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
            <div
              className="bg-white m-2  p-4 rounded-lg shadow-lg"
              style={{ width: "550px", maxHeight: "100vh" }} // Set maximum height
            >
              <div className="flex justify-end">
                <button
                  onClick={toggleForm}
                  className="text-gray-500 hover:text-gray-800 text-2xl"
                >
                  X
                </button>
              </div>
              <h2 className="text-2xl font-semibold mb-4">Add New Profile</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex  justify-between">
                    {/* Added this container */}
                    <button
                      className={`${
                        isBasicSection
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      } px-4 py-2 rounded`}
                      onClick={() => setIsBasicSection(true)}
                    >
                      Basic
                    </button>
                    <button
                      className={`${
                        !isBasicSection
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      } px-4 py-2 rounded`}
                      onClick={() => setIsBasicSection(false)}
                    >
                      Contact
                    </button>
                  </div>
                </div>
                <div
                  className="grid grid-cols-1 gap-4"
                  style={{ overflowY: "auto" }}
                >
                  {/* Add 'overflowY: auto' to allow scrolling if content exceeds the max height */}
                  {isBasicSection ? (
                    <>
                      <div>
                        <label htmlFor="name" className="block font-medium">
                          Enter Name*
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="border rounded w-full px-2 py-1"
                          placeholder="Eg. John Doe"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block font-medium">
                          Enter Email*
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="border rounded w-full px-2 py-1"
                          placeholder="Eg. John@xyz.com"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block font-medium">
                          Enter Phone*
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          className="border rounded w-full px-2 py-1"
                          placeholder="Eg. 9123456789"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label
                          htmlFor="instagram"
                          className="block font-medium"
                        >
                          Instagram Link
                        </label>
                        <input
                          type="text"
                          id="instagram"
                          className="border rounded w-full px-2 py-1"
                          placeholder="Instagram Link"
                          value={formData.instagram}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="youtube" className="block font-medium">
                          YouTube Link
                        </label>
                        <input
                          type="text"
                          id="youtube"
                          className="border rounded w-full px-2 py-1"
                          placeholder="YouTube Link"
                          value={formData.youtube}
                          onChange={handleChange}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                {isBasicSection ? (
                  <button
                    onClick={toggleSection}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Next
                  </button>
                ) : (
                  <>
                    <button
                      onClick={toggleSection}
                      className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Done
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const Profileitems = ({ id_name, social, ficon, sicon }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 justify-between xl:pb-10">
        <div className="col-span-1   ">
          <h1 className="flex text-md underline">
            {ficon} {id_name}
          </h1>
        </div>
        <div className="col-span-1 ">
          <h1 className="flex text-xl underline ">
            {sicon} {social}
          </h1>
        </div>
      </div>
    </>
  );
};

export default Toggleform;
