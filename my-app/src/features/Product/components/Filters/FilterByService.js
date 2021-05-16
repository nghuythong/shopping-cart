import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
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
    list: {
        padding: 0,
        margin: 0,
        listStyleType: 'none',

        "& > li": {
            margin: 0,
        }
    }
  }));
  
  const FilterByService = (props) => {
    const classes = useStyles();
    const { onChange, filters } = props;
  
    const handleChange = (e) => {
        if(!onChange) return;
      const { name, checked } = e.target;
      onChange({[name] : checked})
    };
  
    return (
      <Box className={classes.root}>
        <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
          Service
        </Typography>
        <ul className={classes.list}>
            {[{key: 'isPromotion', value: 'Promotion'}, {key: 'isFreeShip', value: 'FreeShip'}].map((service) => (
                <li key={service.key}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={Boolean(filters[service.key])}
                                onChange={handleChange}
                                name={service.key}
                                color="primary"
                            />
                        }
                        label={service.value}
                    />
                </li>
            ))}
        </ul>
      </Box>
    );
  };
  
  FilterByService.propTypes = {
      filters: PropTypes.object,
    onChange: PropTypes.func,
  };
  
  export default FilterByService;
  