import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { Box, Typography, Tabs, Tab } from '@mui/material';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';

import UserBusinesses from './UserBusinesses/UserBusinesses'
import UserReviews from './UserReviews/UserReviews'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


function SelectPanel({ id }) {
    const user = useSelector((state) => state?.user[id])

    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', gap: 8 }}>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant='h3' sx={{ fontSize: '16px', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-end', paddingRight: 2 }}>{`${user?.first_name}'s Profile`}</Typography>
                <Box>
                    <Tabs value={value} onChange={handleChange} orientation='vertical' sx={{ fontSize: '14px', borderRight: 1, borderColor: 'divider' }}>
                        <Tab icon={<ReviewsOutlinedIcon />} label="Reviews" iconPosition="start" />
                        <Tab icon={<BusinessOutlinedIcon />} label="Businesses" iconPosition="start" />
                    </Tabs>
                </Box>
            </Box>

            <Box sx={{ width: '60%' }}>
                <TabPanel value={value} index={0}>
                    <UserReviews id={id} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <UserBusinesses id={id} />
                </TabPanel>
            </Box>


        </Box>
    )
}

export default SelectPanel;