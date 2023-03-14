import {
  Box,
  Grid,
  Heading,
  HStack,
  Image,
  Img,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

export default function Home() {
  return (
    <Grid
      my={10}
      px={40}
      columnGap={4}
      rowGap={8}
      templateColumns={'repeat(6, 1fr)'}
    >
      {/* gap 값은 rem / 5개 같은 크기로 한줄에 꽉차게 반복*/}
      <VStack alignItems={'flex-start'}>
        <Box overflow={'hidden'} mb={'3'} rounded="3xl">
          <Image
            h="280"
            src="https://a0.muscache.com/im/pictures/miso/Hosting-659600087552092324/original/45fe0ffd-7569-4bad-8ccc-620d0a625c65.jpeg?im_w=720"
          />
        </Box>
        <Box>
          <Grid gap={2} templateColumns={'3fr 1fr'}>
            <Text display={'block'} as="b" noOfLines={1} fontSize="md">
              완산구, 전주시, 전라북도, 한국
            </Text>
            <HStack spacing={1}>
              <FaStar size={15} />
              <Text> 5.0</Text>
            </HStack>
          </Grid>
          <Text fontSize="sm" color="gray.600">
            대한민국 서울
          </Text>
        </Box>
        <Text fontSize={'sm'} color="gray.600">
          <Text as="b">₩317,899</Text> / 박
        </Text>
      </VStack>
    </Grid>
  );
}
