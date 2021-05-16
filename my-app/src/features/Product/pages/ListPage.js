import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect, useState } from 'react';
import productApi from '../../../api/productApi';
import FilterViewer from '../components/FilterViewer';
import ProductFilter from '../components/ProductFilter';
import ProductList from '../components/ProductList';
import ProductSkeleton from '../components/ProductSkeleton';
import ProductSort from '../components/ProductSort';


const useStyle = makeStyles(theme => ({
    root: {},

    left: {
        width: "250px"
    },

    right: {
        flex: '1 1 0'
    },

    pagination: {
        display: 'flex',
        flexFlow: 'nowrap',
        justifyContent: 'center',

        marginTop: '20px',
        paddingBottom: '10px'
    }
}))

const ListPage = props => {
    const classes = useStyle();
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        _page: 1,
        _limit: 8,
        _sort: 'salePrice:ASC'
    })
    const [pagination, setPagination] = useState({
        limit: 8,
        total: 10,
        page: 1
    })

    useEffect(() => {
        (async () => {
            try {
                const filtersClone = {...filters};
                if(filtersClone['category.name']) {
                    delete filtersClone['category.name']
                } 
                const {data, pagination} = await productApi.getAll(filtersClone);
                setProductList(data);
                setPagination(pagination)
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
        })()

    }, [filters])

    const handlePageChange = (e,page) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            _page: page
        }))
    }

    const handleSortChange = (newSortValue) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            _sort: newSortValue
        }))
    }

    const handleFilterChange = (newFilters) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            ...newFilters
        }))
    }    

    const setNewFilters = (newFilters) => {
        setFilters(newFilters)
    }
    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            <ProductFilter filters={filters} onChange={handleFilterChange} />
                        </Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            <ProductSort currentSort={filters._sort} onChange={handleSortChange}/>
                            <FilterViewer filters={filters} onChange={setNewFilters}/>
                            {loading ? <ProductSkeleton length={8}/> : <ProductList data={productList} />}
                            <Box className={classes.pagination}>
                                <Pagination 
                                    onChange={handlePageChange} 
                                    color="primary" 
                                    count={Math.ceil(pagination.total/ pagination.limit)} 
                                    page={pagination.page}>
                                </Pagination>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

ListPage.propTypes = {
    
};

export default ListPage;