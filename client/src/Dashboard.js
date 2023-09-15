import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  FaRupeeSign,
  FaTimes,
  FaTags,
  FaBars,
  FaRegBell,
  FaTachometerAlt,
  FaExchangeAlt,
  FaCalendar,
  FaUsers,
  FaCog,
} from "react-icons/fa";
import {
  AiOutlineUsergroupAdd,
  AiOutlineLike,
  AiOutlineSearch,
} from "react-icons/ai";
import BarChart from "./BarChart";
import DonutChart from "./DonutChart";
import Toggleform from "./Toggleform";

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const callingdata = async () => {
    try {
      console.log("dash in");
      const res = await fetch("/dashboard", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        const error = new Error(res.error);
        console.log("terror");
        throw error;
      }
    } catch (error) {
      console.log(error);
      console.log("error from dash");
      navigate("/");
    }
  };

  useEffect(() => {
    callingdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row bg-color-[#F8FAFF] min-h-screen">
      {/* Menu Button */}
      <div className="lg:hidden">
        <button
          onClick={toggleMenu}
          className="bg-blue-500 text-white text-2xl w-full p-4 "
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Vertical Menu */}
      <aside
        className={`${
          isMenuOpen ? "block" : "hidden"
        }  lg:flex lg:flex-col w-full lg:w-1/5 lg:my-5 lg:ml-5 lg:rounded-3xl bg-gradient-to-b from-blue-600 to-blue-400 text-white`}
      >
        <div className="text-3xl font-bold px-6 p-4 xl:mb-8 ">Board.</div>
        <ul className="text-xl pb-5 md:space-y-4 ml-6 md:font-bold md:text-lg ">
          <MenuItem title="Dashboard" icon={<FaTachometerAlt />} />
          <MenuItem title="Transactions" icon={<FaExchangeAlt />} />
          <MenuItem title="Schedules" icon={<FaCalendar />} />
          <MenuItem title="Users" icon={<FaUsers />} />
          <MenuItem title="Settings" icon={<FaCog />} />
        </ul>
        <div className="bottom-menu-items mt-auto">
          <ul className="text-xl pb-3  pl-6 md:font-semibold">
            <MenuItem title="Help" />
            <MenuItem title="Contact Us" />
            <MenuItem title="Logout" link="/logout" />
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full xl:w-4/5 p-4 xl:mx-4 ">
        {/* Search Bar */}

        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold ">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <div className="flex items-center px-2 py-1 w-full md:w-auto hover:border">
              <input
                type="text"
                placeholder="Search..."
                className="w-full outline-none bg-[#FFFFFF]"
              />
              <div className="text-sm text-[#858585] ">
                <AiOutlineSearch className="text-xl" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className=" text-2xl px-4 flex items-center justify-center">
                <FaRegBell />
              </div>
              <div className="rounded-full h-10 w-10 bg-gray-200 flex items-center justify-center">
                {/* user profile image*/}
                <img
                  src={"user-dummy.png"}
                  alt="User Profile"
                  className="rounded-full h-10 w-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 ">
          <DashboardCard
            icon={<FaRupeeSign className="text-2xl text-bold" />}
            iconbg="#98D89E"
            title="Total Revenues"
            value="$2,129,430"
            bgColor="#FFFFFF"
            textColor="#000"
          />
          <DashboardCard
            icon={<FaTags className="text-2xl text-bold" />}
            iconbg="#DEBF85"
            title="Total Transactions"
            value="1,520"
            bgColor="#FFFFFF"
            textColor="#000"
          />
          <DashboardCard
            icon={<AiOutlineLike className="text-2xl text-bold" />}
            iconbg="#ECA4A4"
            title="Total Likes"
            value="9,721"
            bgColor="#FFFFFF"
            textColor="#000"
          />
          <DashboardCard
            icon={<AiOutlineUsergroupAdd className="text-2xl text-bold" />}
            iconbg="#A9B0E5"
            title="Total Users"
            value="892"
            bgColor="#FFFFFF"
            textColor="#000"
          />
        </div>

        {/* Bar Chart */}
        <div className="w-full mt-5 bg-white rounded-2xl shadow-xl border border-slate-300">
          <div className="ml-4 p-2">
            <h2 className="text-xl font-semibold mb-2">Activities</h2>
            <div className="text-md text-[#858585]">May - June 2021</div>
            <div className="md:p-2 rounded" style={{ height: "200px" }}>
              <BarChart />
            </div>
          </div>
        </div>

        {/* Donut Chart */}

        <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-3">
          <div className="col-span-1 mx-auto w-full py-2 rounded-xl shadow-xl border border-slate-300">
            <div className=" md:flex px-5 justify-between">
              <div>
                <h2 className="text-xl font-semibold">Top products</h2>
              </div>
              <div className="text-md text-[#858585] ">May - June 2021</div>
            </div>
            <DonutChart />
          </div>
          <div className="col-span-1 w-full p-1 rounded-xl shadow-xl flex justify-center items-center border border-slate-300">
            <div className="w-full p-1">
              <Toggleform />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const MenuItem = ({ title, link, icon }) => (
  <li className=" px-2 py-1 rounded hover:bg-gray-700">
    <Link to={link} className="block flex items-center">
      {icon}
      <span className="ml-4">{title}</span>
    </Link>
  </li>
);

const DashboardCard = ({ title, value, bgColor, textColor, icon, iconbg }) => (
  <div
    className="p-3 rounded-2xl shadow-xl border border-slate-300"
    style={{ backgroundColor: bgColor }}
  >
    <div
      className="mb-1 h-10 w-10 text-zinc-50 rounded-full  flex justify-center items-center"
      style={{ backgroundColor: iconbg }}
    >
      {icon}
    </div>
    <h2 className="font-semibold" style={{ color: textColor }}>
      {title}
    </h2>
    <p className="text-xl font-bold" style={{ color: textColor }}>
      {value}
    </p>
  </div>
);

export default Dashboard;
