import React from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "./ColorModeContext";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MultipleSelect from "./muiCategory";

const Sidebar = ({
  category,
  onCategoryChange,
  onChangePrice,
  showAvailableOnly,
  onChangeAvailability,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `#FAF9F6 !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "#ffffff !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        border: "1px solid black",
        backgroundColor: "white",
      }}
    >
      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem
            style={{
              margin: "10px 0 20px 0",
              color: colors.blueAccent[400],
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
            >
              <Typography
                style={{ marginLeft: "45px" }}
                variant="h3"
                color={colors.grey[100]}
              >
                Filter
              </Typography>
              <IconButton>
                <MenuOutlinedIcon />
              </IconButton>
            </Box>
          </MenuItem>

          <Box mb="25px">
            <Box textAlign="center">
              <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              ></Typography>
            </Box>
          </Box>

          <Box>
            <MenuItem>
              <MultipleSelect
                category={category}
                onCategoryChange={onCategoryChange}
                onChangePrice={onChangePrice}
                showAvailableOnly={showAvailableOnly}
                onChangeAvailability={onChangeAvailability}
              />
            </MenuItem>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
