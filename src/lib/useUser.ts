import { useQuery } from '@tanstack/react-query';
import { getMe } from '../api';
import { IUser } from '../types';

export default function useUser() {
  // API 작업을 하는 함수를 지겨봄 (스파이!)
  const { isLoading, data, isError } = useQuery<IUser>(['me'], getMe, {
    // useQuery가 getMe 함수를 가지고 와서 로딩중인지, 에러있는지, data있는지 알려줌
    retry: false,
  });
  return {
    userLoading: isLoading,
    user: data,
    isLoggedIn: !isError,
  };
}
