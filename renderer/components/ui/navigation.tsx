import { useRouter } from 'next/router';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ChatIcon from '@mui/icons-material/Chat';

export default function Navigation(props) {
  const router = useRouter();

  if (['/login', '/signup'].includes(router.pathname)) {
    return (
      <></>
    );
  } else {
    return (
      <BottomNavigation
        className='bottom-navigation'
        showLabels
        value={props.value}
        onChange={(event, newValue) => changeTab(newValue)} >
        <BottomNavigationAction label='users' icon={<PeopleAltIcon />} />
        <BottomNavigationAction label='chattings' icon={<ChatIcon />} />
      </BottomNavigation>
    );
  }

  function changeTab(newValue) {
    props.setValue(newValue);

    const url = ['/users', 'chat'][newValue];
    router.push(url);
  }
}