import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  Skeleton,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getRoom } from '../api';
import { IRoomDetail } from '../types';

export default function RoomDetail() {
  const { roomPk } = useParams(); //uesParams : 해당 URL에 있는 파라미터 가져다 줌.
  const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom); // 데이터를 캐시에다, key를 써서 저장해야 함.

  return (
    <Box
      mt={10}
      px={{
        sm: 10,
        lg: 40,
      }}
    >
      <Skeleton height={'43px'} width="25%" isLoaded={!isLoading}>
        <Heading>{data?.name}</Heading>
      </Skeleton>
      <Grid
        mt={8}
        rounded="xl"
        overflow="hidden"
        gap={3}
        height="60vh"
        templateRows={'1fr 1fr'}
        templateColumns={'repeat(4, 1fr)'}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            key={index}
            overflow={'hidden'}
          >
            <Skeleton isLoaded={!isLoading} h="100%" w="100%">
              <Image
                w="100%"
                h="100%"
                objectFit={'cover'}
                src={data?.photos[index].file}
              />
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
