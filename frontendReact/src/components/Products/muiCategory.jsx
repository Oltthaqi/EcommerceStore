import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

var MAX;
var MIN;
const marks = [
  {
    value: MIN,
    label: "",
  },
  {
    value: MAX,
    label: "",
  },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};
function valuetext(value) {
  return `${value}€`;
}

function getStyles(name, selectedCategories, theme) {
  return {
    fontWeight:
      selectedCategories.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const CategoryFilter = ({
  category,
  onCategoryChange,
  onChangePrice,
  showAvailableOnly,
  onChangeAvailability,
}) => {
  const theme = useTheme();
  const [availableCategories, setAvailableCategories] = useState([]);
  const [value, setValue] = React.useState([]);
  const [minValue, setMinValue] = React.useState("");
  const [checked, setChecked] = React.useState(true);
  // const [MAXtext , setMAXtext] = React.useState(0)
  // const [MINtext , setMINtext] = React.useState(0)
  const handleCheckboxCheck = (event) => {
    onChangeAvailability(event.target.checked);
  };

  const handleChangeSlider = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minValue), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minValue)]);
    }
    if (typeof onChangePrice === "function") {
      onChangePrice(newValue);
    } else {
      console.error("onChangePrice is not a function:", onChangePrice);
    }
  };
  useEffect(() => {
    axios
      .get("https://localhost:7196/api/Product")
      .then((response) => {
        const prices = response.data.map((product) => product.price);
        const minValue = Math.min(...prices);
        const maxValue = Math.max(...prices);
        // console.log(minValue);
        setValue([minValue, maxValue]);
        MAX = maxValue;
        MIN = minValue;
      })
      .catch((error) => {
        console.error("Error fetching Prices:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7196/api/Product")
      .then((response) => {
        const categories = Array.from(
          new Set(response.data.map((product) => product.category))
        );

        setAvailableCategories(categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    if (typeof onCategoryChange === "function") {
      onCategoryChange(event);
    } else {
      console.error("onCategoryChange is not a function:", onCategoryChange);
    }
  };

  const selectedCategories = Array.isArray(category) ? category : [];

  return (
    <div className="StickyFilter">
      <FormControl sx={{ m: 3, width: 170 }}>
        <InputLabel id="demo-multiple-name-label">Category</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedCategories}
          onChange={handleChange}
          input={<OutlinedInput label="Category" />}
          MenuProps={MenuProps}
        >
          {availableCategories.map((cat) => (
            <MenuItem
              key={cat}
              value={cat}
              style={getStyles(cat, selectedCategories, theme)}
            >
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ width: 170, m: 3 }}>
        <Slider
          marks={marks}
          step={1}
          value={value}
          valueLabelDisplay="auto"
          min={MIN}
          max={MAX}
          onChange={handleChangeSlider}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="body2"
            onClick={() => setValue([MIN, value[1]])}
            sx={{ cursor: "pointer" }}
          >
            {MIN} min
          </Typography>
          <Typography
            variant="body2"
            onClick={() => setValue([value[0], MAX])}
            sx={{ cursor: "pointer" }}
          >
            {MAX} max
          </Typography>
        </Box>
      </Box>
      <Box sx={{ m: 2 }}>
        <FormControlLabel
          label="Show Only availeable"
          control={
            <Checkbox
              checked={showAvailableOnly}
              onChange={handleCheckboxCheck}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
        />
      </Box>
    </div>
  );
};

export default CategoryFilter;
