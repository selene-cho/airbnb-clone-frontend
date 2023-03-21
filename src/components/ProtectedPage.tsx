import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../lib/useUser';

export interface IProtectedPageProps {
  children: React.ReactNode;
}

/* 사용자 로그인 여부 확인하여 페이지 보호 */
// children은 component 안에 있는 element들을 말함
export default function ProtectedPage({ children }: IProtectedPageProps) {
  const { isLoggedIn, userLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (!isLoggedIn) {
        navigate('/');
      }
    }
  }, [userLoading, isLoggedIn, navigate]);
  return <>{children}</>;
}
