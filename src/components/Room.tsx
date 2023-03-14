import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { FaRegHeart, FaStar } from 'react-icons/fa';

export default function Room() {
  const gray = useColorModeValue('gray.600', 'gay.300');
  return (
    <VStack alignItems={'flex-start'}>
      {/* gap 값은 rem / 5개 같은 크기로 한줄에 꽉차게 반복*/}
      <Box position="relative" overflow={'hidden'} mb={3} rounded="2xl">
        <Image
          minH="280"
          src="https://a0.muscache.com/im/pictures/miso/Hosting-659600087552092324/original/45fe0ffd-7569-4bad-8ccc-620d0a625c65.jpeg?im_w=720"
        />
        <Button
          variant={'unstyled'}
          position="absolute"
          top={0}
          right={0}
          color="white"
        >
          <FaRegHeart size="20px" />
        </Button>
      </Box>
      <Box>
        <Grid gap={2} templateColumns={'6fr 1fr'}>
          <Text display={'block'} as="b" noOfLines={1} fontSize="md">
            완산구, 전주시, 전라북도, 한국
          </Text>
          <HStack spacing={1} alignItems="center">
            <FaStar size={12} />
            <Text fontSize={'sm'}> 5.0</Text>
          </HStack>
        </Grid>
        <Text fontSize={'sm'} color={gray}>
          대한민국 서울
        </Text>
      </Box>
      <Text fontSize={'sm'} color={gray}>
        <Text as="b">₩317,899</Text> / 박
      </Text>
    </VStack>
  );
}
