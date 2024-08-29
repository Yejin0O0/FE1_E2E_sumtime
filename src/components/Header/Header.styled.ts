import styled from '@emotion/styled';
import Link from 'next/link';
import { Flex } from '../common';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 100;
  background-color: white;

  width: 100%;
  max-width: 960px;

  height: 65px;
  margin: 0 auto;
  padding: 10px;
  border-bottom: 1px solid #dadce0;
`;

export const Logo = styled.img`
  height: 100%;
  cursor: pointer;
  width: 170px;
`;

export const ProfileDiv = styled(Flex)`
  height: 100%;
`;

export const MenuButton = styled.button`
  position: relative;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const UserP = styled.p`
  height: 100%;
  line-height: 3;
`;

export const UserName = styled(UserP)`
  font-weight: 700;
`;

export const IconWrapper = styled(Flex)`
  background-color: white;
  width: 20px;
  margin: 0 10px;
  cursor: pointer;
`;

export const HeaderLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
