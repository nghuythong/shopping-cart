import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root : {
        display: "flex",
        flexFlow: "wrap",
        alignItems: "center",

        margin: theme.spacing(2, 0),
        listStyleType: 'none',

        '& > li' : {
            margin: 0,
            padding: theme.spacing(1),
        }
    },
}))

const FILTER_LIST = [
    {
        id: 1,
        getLabel: () => 'FreeShip',
        isActive: filters => filters.isFreeShip,
        isVisible: () => true,
        isRemovable: false,
        onRemove: () => {},
        onToggle: filters => {
            const newFilters = {...filters};
            if (newFilters.isFreeShip) {
                delete newFilters.isFreeShip
            } else {
                newFilters.isFreeShip = true;
            }
            return newFilters
        }
    },
    {
        id: 2,
        getLabel: () => 'Promotion',
        isActive: () => true,
        isVisible: filters => Object.keys(filters).includes('isPromotion'),
        isRemovable: true,
        onRemove: filters => {
            const newFilters = {...filters};
            delete newFilters.isPromotion
            return newFilters
        },
        onToggle: null
    },
    {
        id: 3,
        getLabel: (filters) => `From ${filters.salePrice_lte} to ${filters.salePrice_gte}`,
        isActive: () => true,
        isVisible: filters => Object.keys(filters).includes('salePrice_lte') && Object.keys(filters).includes('salePrice_gte'),
        isRemovable: true,
        onRemove: filters => {
            const newFilters = {...filters};
            delete newFilters.salePrice_lte
            delete newFilters.salePrice_lte
            return newFilters
        },        
        onToggle: null
    },
    {
        id: 4,
        getLabel: (filters) => `${filters['category.name']}`,
        isActive: () => true,
        isVisible: filters => Object.keys(filters).includes('category.id') && Object.keys(filters).includes('category.name'),
        isRemovable: true,
        onRemove: filters => {
            const newFilters = {...filters};
            delete newFilters['category.id']
            delete newFilters['category.name']
            return newFilters
        }, 
        onToggle: null
    },
]

const FilterViewer = props => {
    const { filters = {}, onChange = null } = props;
    const classes = useStyles();
    return (
        <Box component="ul"  className={classes.root}>
            {FILTER_LIST.filter(item => item.isVisible(filters)).map(item => (
                <li key={item.id}>
                    <Chip
                        label={item.getLabel(filters)}
                        color={item.isActive(filters) ? 'primary' : 'default'}
                        clickable={!item.isRemovable}
                        onClick={item.isRemovable ? null : () => {
                            if(!onChange) return;

                            const newFilters = item.onToggle(filters)
                            onChange(newFilters)
                        }}
                        onDelete={item.isRemovable ? () => {
                            if(!onChange) return;
                            
                            const newFilters = item.onRemove(filters)
                            onChange(newFilters)
                        } 
                        : null}
                    />
                </li>
            ))}
        </Box>
    );
};

FilterViewer.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

export default FilterViewer;