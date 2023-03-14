import {
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { FaAirbnb, FaMoon, FaSun } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';

export default function Header() {
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();

  const { toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue('red.500', 'red.200'); // light Mode 일ㄷ 때 값, dark Mode 일 때 값 -> chakara 기본 Hook
  const Icon = useColorModeValue(FaMoon, FaSun); // 컴포넌트 만들기 위해 첫글자 대문자로 시작

  return (
    <Stack
      justifyContent={'space-between'}
      py={5}
      px={40}
      alignItems="center"
      direction={{
        // 반응형으로 direction 위치 변경 위하면 HStack VStack 대신 Stack 써야 반응형 적용됨
        sm: 'column',
        md: 'row', // md 이상의 크기라면 row로 적용됨
      }}
      spacing={{
        sm: 4,
        md: 0,
      }}
      borderBottomWidth={1}
    >
      {/* react Icons에 색적용 하려면 일일히 색 가져와야하니까 chakra UI 컴포넌트 Box(div)로 감싸서 chakra UI 문법 color 적용하면 간단 */}
      <Box color={logoColor}>
        <Link to="/">
          <FaAirbnb size={'48'} />
        </Link>
      </Box>
      <HStack spacing={2}>
        <IconButton
          onClick={toggleColorMode}
          variant={'ghost'}
          aria-label="Toggle dark mode"
          icon={<Icon />}
        />
        {/* Screen Reader가 읽어주는 Text */}
        <Button onClick={onLoginOpen}>Log in</Button>
        <LightMode>
          <Button onClick={onSignUpOpen} colorScheme={'red'}>
            Sign in
          </Button>
        </LightMode>
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Stack>
  );
}
