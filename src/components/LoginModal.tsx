import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaLock, FaUserNinja } from 'react-icons/fa';
import SocialLogin from './SocialLogin';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const onChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.includes('@')) {
      setEmailError('please write a valid email');
    }
    console.log(username, password);
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay /> {/* 모달클릭시 배경 약간 어둡게 overlay 적용 */}
      <ModalContent>
        <ModalHeader>Log in</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={onSubmit as any}>
          <VStack>
            <InputGroup size={'md'}>
              <InputLeftElement
                children={
                  <Box color={'gray.500'}>
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input
                name="username"
                onChange={onChange}
                value={username}
                variant={'filled'}
                placeholder="Username"
                required
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={'gray.500'}>
                    <FaLock />
                  </Box>
                }
              />
              <Input
                name="password"
                onChange={onChange}
                value={password}
                type="password"
                variant={'filled'}
                placeholder="Password"
                required
              />
            </InputGroup>
          </VStack>
          <Button type="submit" mt={4} colorScheme={'red'} w="100%">
            Log in
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
