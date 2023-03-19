import {
  Avatar,
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getRoom, getRoomReviews } from '../api';
import { IReview, IRoomDetail } from '../types';

export default function RoomDetail() {
  const { roomPk } = useParams(); //uesParams : 해당 URL에 있는 파라미터 가져다 줌.
  const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom); // 데이터를 캐시에다, key를 써서 저장해야 함.
  const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<
    IReview[]
  >([`rooms`, roomPk, `reviews`], getRoomReviews);
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
      <HStack width={'40%'} justifyContent={'space-between'} mt={10}>
        <VStack alignItems={'flex-start'}>
          <Skeleton isLoaded={!isLoading} height={'30px'}>
            <Heading fontSize={'2xl'}>
              House hosted by {data?.owner.name}
            </Heading>
          </Skeleton>
          <Skeleton isLoaded={!isLoading} height={'30px'}>
            <HStack justifyContent={'flex-start'} w="100%">
              <Text>
                {data?.toilets} toilet{data?.toilets === 1 ? '' : 's'}
              </Text>
              <Text>•</Text>
              <Text>
                {data?.rooms} room{data?.rooms === 1 ? '' : 's'}
              </Text>
            </HStack>
          </Skeleton>
        </VStack>
        <Avatar name={data?.owner.name} size={'xl'} src={data?.owner.avatar} />
      </HStack>
      <Box mt={10}>
        <Heading fontSize={'2xl'}>
          <HStack>
            <FaStar /> <Text>{data?.rating}</Text>
            <Text>•</Text>
            <Text>
              {reviewsData?.length} review
              {reviewsData?.length === 1 ? '' : 's'}
            </Text>
          </HStack>
        </Heading>
      </Box>
    </Box>
  );
}
