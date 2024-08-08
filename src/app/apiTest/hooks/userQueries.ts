import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import { createUser, deleteUser, emailValidation, getUserIdByEmail, login } from '@/app/apiTest/calls/userCalls';

interface User {
  userId: number;
  email: string;
  nickname: string;
}

export const useCreateUser = (): UseMutationResult<string, Error, { email: string; password: string; nickname: string }> =>
  useMutation({
    mutationFn: ({ email, password, nickname }) => createUser(email, password, nickname),
  });

export const useGetUserId = (email: string): UseQueryResult<string, Error> =>
  useQuery({
    queryKey: ['userId', email],
    queryFn: () => getUserIdByEmail(email),
    enabled: !!email,
  });

export const useEmailValidation = (email: string): UseQueryResult<boolean, Error> =>
  useQuery({
    queryKey: ['emailValidation', email],
    queryFn: () => emailValidation(email),
    enabled: !!email,
  });

export const useLogin = (email: string, password: string): UseQueryResult<User, Error> =>
  useQuery({
    queryKey: ['login', email, password],
    queryFn: () => login(email, password),
    enabled: !!email && !!password,
  });

export const useDeleteUser = (): UseMutationResult<string, Error, string> =>
  useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
  });
