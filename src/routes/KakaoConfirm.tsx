import { Heading, Spinner, Text, useToast, VStack } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { kakaoLogIn } from '../api';

export default function KakaoConfirm() {
  const { search } = useLocation(); // 우리가 있는 곳 알려 줌
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code) {
      // code 없을 수도 있기 때문에 있는지 없는지 확인
      const status = await kakaoLogIn(code);
      if (status === 200) {
        // 백엔드에서 status 코드 200번 받으면
        toast({
          status: 'success',
          title: 'Welcome!',
          position: 'bottom-right',
          description: 'Happy to have you back!',
        });
        queryClient.refetchQueries(['me']); // me query refetch -> me query header에서 사용
        navigate('/'); // 로그인 완료후 로그인 페이지에서 다시 home으로 돌려보냄
      }
    }
  };
  useEffect(() => {
    // 이 화면이 처음 나왔을 때
    confirmLogin();
  }, []);

  return (
    <VStack justifyContent={'center'} mt={40}>
      <Heading>Processing Login...</Heading>
      <Text>Don't go anywhere.</Text>
      <Spinner size="lg" />
    </VStack>
  );
}
