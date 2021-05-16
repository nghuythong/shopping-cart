import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";
import categoryApi from "../../../../api/categoryApi";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },

    category: {
        fontWeight: 'bold'
    },

    menu: {
        padding: 0,
        margin: 0,
        listStyleType: 'none',

        '& > li' : {
            marginTop: theme.spacing(1),
            transition: 'all .25s',
            '&:hover' : {
                color: theme.palette.primary.main,
                cursor: 'pointer'
            }
        }
    }
}))

const FilterByCategory = (props) => {
  const { onChange } = props;
  const classes = useStyles()
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        setCategoryList(
          list.map((category) => ({
            id: category.id,
            name: category.name,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleCategoryClick = (category) => {
    if (onChange) {
      onChange(category.id, category.name);
    }
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2" className={classes.category}>Category</Typography>

      <ul className={classes.menu}>
        {categoryList.map((category) => (
          <li key={category.id} onClick={() => handleCategoryClick(category)}>
            <Typography variant="body2">{category.name}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
};

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

export default FilterByCategory;
