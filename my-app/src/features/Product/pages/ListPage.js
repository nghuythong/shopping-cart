import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import productApi from '../../../api/productApi';
import ProductSkeleton from '../components/ProductSkeleton';
import ProductList from '../components/ProductList';


const useStyle = makeStyles(theme => ({
    root: {},

    left: {
        width: "250px"
    },

    right: {
        flex: '1 1 0'
    }
}))

const ListPage = props => {
    const classes = useStyle();
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const {data} = await productApi.getAll({ _page: 1, _limit: 10});    
                setProductList(data);
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
        })()

    }, [])
    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>Left</Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                    <Paper elevation={0}>
                        {loading ? <ProductSkeleton/> : <ProductList data={productList} />}
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