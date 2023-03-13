import { Box, Button, HStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { FaAirbnb } from 'react-icons/fa';

export default function Root() {
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
          <Button>Log in</Button>
          <Button colorScheme={'red'}>Sign in</Button>
        </HStack>
      </HStack>
      <Outlet />
    </Box>
  );
}
