import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';

ProductSort.propTypes = {
    currentSort: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

function ProductSort(props) {
    const { currentSort, onChange } = props;

    const handleSortChange = (e, newValue) => {
        if(onChange) onChange(newValue)
    }

    return (
        <Tabs
            value={currentSort}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleSortChange}
            aria-label="disabled tabs example"
        >
            <Tab label="Price low to high" value="salePrice:ASC"></Tab>
            <Tab label="Price high to low" value="salePrice:DESC"></Tab>
        </Tabs>
    );
}

export default ProductSort;