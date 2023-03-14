import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Image,
  Img,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import Room from '../components/Room';

export default function Home() {
  return (
    <Grid
      my={10}
      px={{
        sm: 10,
        lg: 40,
      }}
      columnGap={4}
      rowGap={8}
      templateColumns={{
        sm: '1fr', // 스마트폰 사용자 위한 반응형 UI
        md: '1fr 1fr',
        lg: 'repeat(3, 1fr)', // larger UI
        xl: 'repeat(4, 1fr)',
        '2xl': 'reapet(5, 1fr)',
      }}
    >
      <Box>
        <Skeleton height={280} rounded="2xl" mb={7} />
        <SkeletonText w="80%" noOfLines={2} mb={7} />
        <SkeletonText w="50%" noOfLines={1} />
      </Box>
      <Room />
    </Grid>
  );
}
