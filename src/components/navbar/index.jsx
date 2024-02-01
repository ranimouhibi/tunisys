import React,{useState,useEffect} from "react";
import moment from 'moment';
import Dropdown from "components/dropdown";
import { FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import {useLogout} from 'views/auth/hooks/useLogout'
import {useAuthContext} from 'views/auth/hooks/useAuthContext'
import {IoMdNotificationsOutline,}from "react-icons/io";
import {MdDelete, MdPerson } from "react-icons/md";
const Navbar = (props) => {
  const [notifications, setNotifications] = useState([]);
  const { onOpenSidenav, brandText, socket } = props; // Destructure socket from props
  const [darkmode, setDarkmode] = React.useState(false);
  const {user} = useAuthContext()
  const {logout} = useLogout()

  const handleClick= () =>{
    logout()
    console.log("disconnected")
  }
  const handleDeleteNotification = async (notificationId) => {
    try {
      const response = await fetch(`/api/notification/delete/${notificationId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
  
      if (response.ok) {
        // If the delete request is successful, update the state to remove the deleted notification
        setNotifications(prevNotifications => prevNotifications.filter(notification => notification._id !== notificationId));
      } else {
        console.error('Error deleting notification');
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  }
  
  
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/notification/get", {
          headers: {
            Authorization: `Bearer ${user.token}`, 
          },
        });
        const data = await response.json();
          const notificationsWithDate = data.notifications.map(notification => ({
          ...notification,
          date: moment(notification.date).toDate(),
        }));
  
        setNotifications(notificationsWithDate);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
  
    fetchNotifications();
  }, [user.token]);
  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a
            className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white" 
          >
            Dashboard
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              {" "}
              /{" "}
            </span>
          </a>
          <Link
            className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            to="#"
          >
            {brandText}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </Link>
        </p>
      </div>
      <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
        <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
          <p className="pl-3 pr-2 text-xl">
            <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
          </p>
          <input
            type="text"
            placeholder="Recherche..."
            className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
          />
        </div>
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>
        <Dropdown
  button={
    <p className="cursor-pointer">
      <div className="counter bg-red-700 border w-[19px] h-[19px] rounded-[50%] ml-2 mt-[-15px]">
        <p className="text-[13px] text-white text-center">{notifications.length || 0}</p>
      </div>
      <IoMdNotificationsOutline className="h-4 w-4 text-gray-600 dark:text-white" />
    </p>
  }
  animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
  children={
    <div className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none sm:w-[460px]">
      <div className="flex items-center justify-between">
        <p className="text-base font-bold text-navy-700 dark:text-white">
          Notification
        </p>
      </div>
      <div className="notification-scroll max-h-48 overflow-y-auto">

      {notifications.length > 0 ? (
  notifications
    .slice(0,5 )
    .map((notification) => (
          <button className="flex w-full space-x-1 items-center" key={notification.id}>
            <div className="flex-shrink-0  h-6 w-6 mr-2 bg-red-500 text-white rounded-full flex items-center justify-center">
              <IoMdNotificationsOutline className="h-4 w-4" />
            </div>
            <p className="text-sm text-navy-700 dark:text-white">{notification.message}</p>
            <p className="text-sm font-bold text-navy-700 dark:text-white">
            {new Date(notification.createdAt).toLocaleString('fr-FR', {
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric'
                    })}</p>
            <button>

            <MdDelete className="h-4 w-4 text-red-500"  onClick={() => handleDeleteNotification(notification._id)} />
            </button>
          </button>
        ))
      ) : (
        <p className="text-sm text-navy-700 dark:text-white">Pas de notifications</p>
      )}
      </div>
    </div>
  }
  classNames={"py-2 top-4 -left-[230px] md:-left-[440px] w-max"}
/>

        <div
          className="cursor-pointer text-gray-600"
          onClick={() => {
            if (darkmode) {
              document.body.classList.remove("dark");
              setDarkmode(false);
            } else {
              document.body.classList.add("dark");
              setDarkmode(true);
            }
          }}
        >
          {darkmode ? (
            <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
          )}
        </div>
        <Dropdown
          button={
            <MdPerson className="h-6 w-6 text-gray-600 dark:text-white" />
          }
          children={
            <div className="flex h-39 w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="mt-3 ml-4">
              
                <div className="flex items-center gap-2">
                {user && (
                  <p className="text-sm font-bold text-navy-700 dark:text-white">
                    {user.email}
                  </p>
                  )}                  
                </div>
               
              </div>
              <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />

              <div className="mt-3 ml-4 flex flex-col">
                <a
                onClick={handleClick}
                  href=" "
                  className="mt-1 text-sm font-medium text-red-500 hover:text-red-500"
                >
                  Se déconnecter 
                </a>
              </div>
            </div>
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        />
      </div>
    </nav>
  );
};

export default Navbar;



