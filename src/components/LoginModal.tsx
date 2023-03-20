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
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form'; // react-hook-form은 페이지에 어떤 input이 있는지 몰라서 input이 어떤건지 어디에 있는지 알려줘야함
import { FaLock, FaUserNinja } from 'react-icons/fa';
import {
  IUsernameLoginError,
  IUsernameLoginSuccess,
  IUsernameLoginVariables,
  usernameLogIn,
} from '../api';
import SocialLogin from './SocialLogin';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  username: string;
  password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>(); // Form에 Input을 register_등록하는데 사용함.
  // handleSubmit은 data를 validate_검증하는 함수 -> event.preventDefault 기본으로 해줌
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation<
    // <IUsernameLoginSuccess, ~...> 생략해도 됨
    IUsernameLoginSuccess,
    IUsernameLoginError,
    IUsernameLoginVariables
  >(usernameLogIn, {
    // onMutate: () => {
    //   console.log('mutation starting');
    // },
    onSuccess: (data) => {
      // data.ok
      toast({
        title: 'welcome back!',
        status: 'success',
      });
      // console.log('mutation is successful');
      onClose();
      queryClient.refetchQueries(['me']);
      reset();
    },
    // onError: (error) => {
    //   // error.error
    //   console.log('mutation has an error');
    // },
  });
  const onSubmit = ({ username, password }: IForm) => {
    mutation.mutate({ username, password });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay /> {/* 모달클릭시 배경 약간 어둡게 overlay 적용 */}
      <ModalContent>
        <ModalHeader>Log in</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          {/* handleSubmit 함수와 함께 onSubmit 실행 -> 여기서 validation preventDefault 해줌 */}
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
                isInvalid={Boolean(errors.username?.message)} // username errors object에 어떤 message가 있다면 해당 input은 invalid 한 것.
                {...register('username', {
                  required: 'Please write a username',
                })} // ...으로 모든 property를 넣음!
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
                isInvalid={Boolean(errors.password?.message)}
                {...register('password', {
                  required: 'Please write a password',
                })}
                type="password"
                variant={'filled'}
                placeholder="Password"
                required
              />
              {mutation.isError}
              {/* <Text fontSize={'sm'} color="red.500">
                {errors.password?.message}
              </Text> */}
            </InputGroup>
          </VStack>
          {mutation.isError ? (
            <Text color="red.500" textAlign={'center'} fontSize="sm">
              Username of Password are wrong
            </Text>
          ) : null}
          <Button
            isLoading={mutation.isLoading}
            type="submit"
            mt={4}
            colorScheme={'red'}
            w="100%"
          >
            Log in
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
