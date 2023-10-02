import React from "react";
import { useSelector } from "react-redux";
import { authSelect } from "../redux/features/slices/authSlice";
import { Avatar, Button, Typography } from "@material-tailwind/react";
import { icons } from "../utils/icons";

const Header = () => {
  const { isLoggedIn, user } = useSelector(authSelect);

  return (
    <div className="flex items-center justify-between bg-[#212f3f] h-full px-6">
      <img src="" alt="" />
      <Button
        variant="text"
        className="text-base font-normal capitalize tracking-normal shadow-none active:shadow-none flex items-center gap-2 p-[4px] rounded-full bg-cyan-800 cursor-pointer hover:bg-cyan-900 transition-all"
      >
        <Avatar
          variant="circular"
          alt={`${user?.firstName} ${user?.lastName}`}
          className="h-9 w-9 border-2 border-white hover:z-10 focus:z-10 "
          src={user?.avatar}
        />
        {isLoggedIn && (
          <div>
            <Typography className="text-xs font-bold">{`${user?.firstName} ${user?.lastName}`}</Typography>
            <Typography className="text-xs text-white">
              {user?.email}
            </Typography>
          </div>
        )}
        <icons.FiChevronDown />
      </Button>
    </div>
  );
};

export default Header;
