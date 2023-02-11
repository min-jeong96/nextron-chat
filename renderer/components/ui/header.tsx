import Button from '@mui/material/Button';

export default function Header(props) {
  if (props.user) {
    return (
      <div className='header'>
        <div className='id'>{props.user.id}</div>
        <Button
          className='logout'
          variant='text'
          onClick={() => props.logout()} >
          로그아웃
        </Button>
      </div>
    );
  } else {
    return (
      <div className='header'>
        <div className='id'></div>
        <Button
          className='login'
          variant='text'
          href='/login' >
          로그인
        </Button>
      </div>
    );
  }
}