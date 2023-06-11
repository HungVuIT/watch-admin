/* eslint react/jsx-key: off */
import PeopleIcon from '@mui/icons-material/People';
import memoize from 'lodash/memoize';
import { useMediaQuery, Theme } from '@mui/material';
import * as React from 'react';
import {
    BulkDeleteWithConfirmButton,
    DeleteButton,
    Datagrid,
    List,
    SearchInput,
    SimpleList,
    TextField,
    TextInput,
    EditButton,
    ShowButton,

} from 'react-admin';
import WatchEditEmbedded from './WatchEditEmbedded';
import Aside from './Aside';



export const WatchIcon = PeopleIcon;

// const getWatchFilters = permissions =>
//     [
//         <SearchInput source="q" alwaysOn />,
//         <TextInput source="name" />,
//         permissions === 'admin' ? <TextInput source="role" /> : null,
//     ].filter(filter => filter !== null);

const WatchBulkActionButtons = props => (
    <BulkDeleteWithConfirmButton {...props} />
);

const rowClick = memoize(permissions => (id, resource, record) => {
    // return permissions === 'admin'
    //     ? Promise.resolve('edit')
    //     : Promise.resolve('show');
    return Promise.resolve('edit')
});

const WatchList = () => {
    // const { permissions } = usePermissions();
    return (
        <List
            // filters={getWatchFilters(permissions)}
            // filterDefaultValues={{ role: 'watch' }}
            // sort={{ field: 'name', order: 'ASC' }}
            aside={<Aside />}
        >
            {/* {useMediaQuery((theme: Theme) => theme.breakpoints.down('md')) ? (
                <SimpleList
                    primaryText={record => record.name}
                    secondaryText={record =>
                        permissions === 'admin' ? record.role : null
                    }
                />
            ) : ( */}
                <Datagrid
                    // rowClick={rowClick(permissions)}
                    expand={<WatchEditEmbedded />}
                    bulkActionButtons={<WatchBulkActionButtons />}
                    // optimized
                >
                    {/* <TextField source="id" />
                    <TextField source="name" /> */}
                                <TextField source="id" />
            <TextField source="name" />
                <EditButton/>
                <ShowButton/>
        
                <DeleteButton />
                </Datagrid>
            {/* )} */}
        </List>
    );
};

export default WatchList;