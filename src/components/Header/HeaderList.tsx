import { Divider, Menu, MenuItem } from '@mui/material';
import { signOut } from 'next-auth/react';

interface HeaderListProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

function HeaderList({ anchorEl, open, onClose }: HeaderListProps) {
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
      sx={{ marginTop: '10px' }}
    >
      <MenuItem component="a" href="/mypage/account">
        Account
      </MenuItem>
      <MenuItem component="a" href="/mypage/category">
        Category
      </MenuItem>
      <MenuItem component="a" href="/mypage/faq">
        FAQ
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => signOut({ callbackUrl: '/landing' })}>Logout</MenuItem>
    </Menu>
  );
}

export default HeaderList;
