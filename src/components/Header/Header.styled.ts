import styled from '@emotion/styled';
import { Flex } from '../common';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 1440px;
  height: 65px;
  margin: 0 auto;
  padding: 10px;
  border-bottom: 1px solid #dadce0;
`;

export const Logo = styled.img`
  height: 100%;
  cursor: pointer;
`;

export const ProfileDiv = styled(Flex)`
  height: 100%;
`;

export const UserP = styled.p`
  height: 100%;
  line-height: 3;
`;

export const UserName = styled(UserP)`
  font-weight: 700;
`;

export const SignOutButton = styled(Flex)`
  background-color: white;
  width: 20px;
  margin: 0 10px;
  cursor: pointer;
`;
