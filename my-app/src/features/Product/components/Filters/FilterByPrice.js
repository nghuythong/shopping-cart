import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  range: {
    display: "flex",
    flexFlow: "nowrap",
    alignItems: "center",

    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

    "& > span": {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
  },
}));

const FilterByPrice = (props) => {
  const classes = useStyles();
  const { onChange } = props;
  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  const handleSubmit = () => {
    if (onChange) {
      onChange(values);
    }
  };

  const handleChangePrice = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
        Price Range
      </Typography>
      <Box className={classes.range}>
        <TextField
          name="salePrice_gte"
          value={values.salePrice_gte}
          onChange={handleChangePrice}
        />
        <span>-</span>
        <TextField
          name="salePrice_lte"
          value={values.salePrice_lte}
          onChange={handleChangePrice}
        />
      </Box>
      <Button variant="contained" onClick={handleSubmit} size="small">
        Submit
      </Button>
    </Box>
  );
};

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

export default FilterByPrice;
