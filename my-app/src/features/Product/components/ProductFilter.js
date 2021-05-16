import { Box } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import FilterByCategory from "./Filters/FilterByCategory";
import FilterByPrice from "./Filters/FilterByPrice";
import FilterByService from "./Filters/FilterByService";

const ProductFilter = (props) => {
  const { filters, onChange } = props;

  const handleCategoryChange = (newCategoryId, newCategoryName) => {
    if (!onChange) return;

    const newFilters = {
      "category.id": newCategoryId,
      "category.name": newCategoryName,
    };
    onChange(newFilters);
  };

  const handleChange = (values) => {
    if(onChange) onChange(values)
  }

  return (
    <Box>
      <FilterByCategory onChange={handleCategoryChange} />
      <FilterByPrice onChange={handleChange} />
      <FilterByService filters={filters} onChange={handleChange} />
    </Box>
  );
};

ProductFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

export default ProductFilter;
