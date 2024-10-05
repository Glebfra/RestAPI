import * as React from 'react';
import {createTheme} from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import {AppProvider} from '@toolpad/core/AppProvider';
import {DashboardLayout} from '@toolpad/core/DashboardLayout';

const navigation = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon/>,
    },
    {
        segment: 'orders',
        title: 'Orders',
        icon: <ShoppingCartIcon/>,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <BarChartIcon/>,
        children: [
            {
                segment: 'sales',
                title: 'Sales',
                icon: <DescriptionIcon/>,
            },
            {
                segment: 'traffic',
                title: 'Traffic',
                icon: <DescriptionIcon/>,
            },
        ],
    },
    {
        segment: 'integrations',
        title: 'Integrations',
        icon: <LayersIcon/>,
    },
];

const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: {light: true, dark: true},
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

const branding = {
    title: 'RestAPI'
}

function BaseDashboardLayout(props) {
    return (
        <AppProvider
            navigation={navigation}
            theme={theme}
            branding={branding}
        >
            <DashboardLayout>
                {props.children}
            </DashboardLayout>
        </AppProvider>
    )
}

export default BaseDashboardLayout;