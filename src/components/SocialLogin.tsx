import { Box, Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { FaComment, FaGithub } from 'react-icons/fa';

export default function SocialLogin() {
  const kakaoParams = {
    client_id: '265e7f2b838fa7fb33b69ff6d9364c7a',
    redirect_uri: 'http://127.0.0.1:3001/social/kakao',
    response_type: 'code',
  };
  const params = new URLSearchParams(kakaoParams).toString();

  return (
    <Box mb={4}>
      <HStack my={8}>
        <Divider />
        <Text textTransform={'uppercase'} color="gray.500" fontSize="xs" as="b">
          Or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button
          as="a"
          href="https://github.com/login/oauth/authorize?client_id=edcf66f77540403846ca&scope=read:user,user:email"
          // scope: 사용자로부터 얻고 싶은 정보
          w="100%"
          leftIcon={<FaGithub />}
        >
          Continue with Github
        </Button>
        <Button
          as="a"
          href={`https://kauth.kakao.com/ouath/authorize?${params}`}
          w="100%"
          leftIcon={<FaComment />}
          colorScheme={'yellow'}
        >
          Continue with Kakao
        </Button>
      </VStack>
    </Box>
  );
}
