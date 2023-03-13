import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { FaAirbnb, FaLock, FaMoon, FaUserNinja } from 'react-icons/fa';

export default function Root() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box>
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
          <Button onClick={onOpen}>Log in</Button>
          <Button colorScheme={'red'}>Sign in</Button>
        </HStack>
        <Modal onClose={onClose} isOpen={isOpen}>
          <ModalOverlay /> {/* 모달클릭시 배경 약간 어둡게 overlay 적용 */}
          <ModalContent>
            <ModalHeader>Log in</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <InputGroup>
                  <InputLeftElement
                    children={
                      <Box color={'gray.500'}>
                        <FaUserNinja />
                      </Box>
                    }
                  />
                  <Input variant={'filled'} placeholder="Username" />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement
                    children={
                      <Box color={'gray.500'}>
                        <FaLock />
                      </Box>
                    }
                  />
                  <Input variant={'filled'} placeholder="Password" />
                </InputGroup>
                <Button mt={4} colorScheme={'red'} w="100%">
                  Log in
                </Button>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </HStack>
      <Outlet />
    </Box>
  );
}
