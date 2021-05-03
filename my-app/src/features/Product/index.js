import React from 'react';
import PropTypes from 'prop-types';
import ListPage from './pages/ListPage';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Box } from '@material-ui/core';

const ProductFeature = props => {
    const match = useRouteMatch();
    return (
        <Box pt={4}>
            <Switch>
                <Route path={match.url} exact component={ListPage}/>
            </Switch>
        </Box>
    );
};

ProductFeature.propTypes = {
    
};

export default ProductFeature;