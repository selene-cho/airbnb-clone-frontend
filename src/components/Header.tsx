import {
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
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
  const Icon = useColorModeValue(FaMoon, FaSun);

  return (
    <HStack
      justifyContent={'space-between'}
      py={5}
      px={10}
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
    </HStack>
  );
}
