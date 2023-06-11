import PeopleIcon from '@mui/icons-material/People';
import WatchList from './WatchList';
import WatchShow from './WatchShow';


export default {
    list: WatchList,
    show: WatchShow,
    icon: PeopleIcon,
    recordRepresentation: record => `${record.name} (${record.role})`,
};
