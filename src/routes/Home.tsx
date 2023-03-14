import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Image,
  Img,
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
      {[1, 2, 3, 4, 5, 6, 4, 5, 6, 6, 7, 8, 9, 4, 5, 6, 3, 6, 56, 5, 6, 3].map(
        (index) => (
          <Room key={index} />
        )
      )}
    </Grid>
  );
}
