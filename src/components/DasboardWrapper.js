import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import { logoutUser } from "@/reduxStore/slices/auth";

import { useDispatch, useSelector } from "react-redux";

function refreshMessages() {
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

  return Array.from(new Array(50)).map(
    () => messageExamples[getRandomInt(messageExamples.length)]
  );
}

const tabs = [
  {
    label: "Home",
    icon: <RestoreIcon />,
    pathname: "/user/dashboard",
    id: 0,
  },
  {
    label: "Wallet",
    icon: <ArchiveIcon />,
    pathname: "/user/wallet",
    id: 1,
  },
  {
    label: "Settings",
    icon: <FavoriteIcon />,
    pathname: "/user/settings",
    id: 2,
  },
  {
    label: "Logout",
    icon: <FavoriteIcon />,
    pathname: "/logout",
    id: 2,
  },
];

export default function DasboardWrapper({ children }) {
  const router = useRouter();
  const currentTabPage = tabs.find(
    (tab) => tab.pathname === router?.pathname
  )?.id;

  const dispatch = useDispatch();
  const onClickOnTab = (value) => {
    // if the last tab is clicked, then log user out
    if (value === tabs.length - 1) return dispatch(logoutUser());
    router.push(tabs[value]?.pathname);
  };

  // GET UPDATES FROM REDUX STORE
  const authSlice = useSelector((state) => state.auth);
  React.useEffect(() => {
    //  LISTEN TO TO STORE, ANYTIME A TOKEN IS NOT DETECTED FORCE USER TO GO TO LOGIN PAGE
    if (!authSlice?.token) router.push("/user/login");
  }, [authSlice?.token]);

  return (
    <div
      style={{
        background: "#00000020",
      }}
    >
      <Box
        sx={{
          pb: 7,
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
          border: "1px solid whitesmoke",
          background: "whitesmoke",
          p: 1,
          minHeight: "auto",
        }}
      >
        <CssBaseline />
        {children}
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={currentTabPage}
            onChange={(event, newValue) => {
              onClickOnTab(newValue);
            }}
          >
            {tabs.map((t) => {
              return (
                <BottomNavigationAction
                  key={t.label}
                  label={t.label}
                  icon={t.icon}
                />
              );
            })}
          </BottomNavigation>
        </Paper>
      </Box>
    </div>
  );
}
