import {
  Box,
  Button,
  HStack,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { FaAirbnb, FaMoon } from 'react-icons/fa';

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

  return (
    <HStack
      justifyContent={'space-between'}
      py={5}
      px={10}
      borderBottomWidth={1}
    >
      {/* react Icons에 색적용 하려면 일일히 색 가져와야하니까 chakra UI 컴포넌트 Box(div)로 감싸서 chakra UI 문법 color 적용하면 간단 */}
      <Box color={'red.500'}>
        <FaAirbnb size={'48'} />
      </Box>
      <HStack spacing={2}>
        <IconButton
          variant={'ghost'}
          aria-label="Toggle dark mode"
          icon={<FaMoon />}
        />
        {/* Screen Reader가 읽어주는 Text */}
        <Button onClick={onLoginOpen}>Log in</Button>
        <Button onClick={onSignUpOpen} colorScheme={'red'}>
          Sign in
        </Button>
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </HStack>
  );
}
