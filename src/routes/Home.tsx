import { Grid } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getRooms } from '../api';
import Room from '../components/Room';
import RoomSkeleton from '../components/RoomSkeleton';

interface IPhoto {
  pk: string;
  file: string;
  description: string;
}

interface IRoom {
  // interface 이름은 앞에 I 붙여주는 것이 좋음! 이름 중복 피하기 위함
  pk: number;
  name: string;
  country: string;
  city: string;
  price: number;
  rating: number;
  is_owner: boolean;
  photos: IPhoto[]; // Room은 photos라는 array가지고 있음!
}

export default function Home() {
  // Query에는 queryKey 만들어줘야함
  // key는 fetch한 결과물을 기억하는 캐싱작업에 사용, key는 array여야 함
  const { isLoading, data } = useQuery<IRoom[]>(['rooms'], getRooms); // rooms라는 key에 fetch 해온 것 담김
  // getRooms 함수가 API로부터 Query 가져옴
  // -> isLoading 중인지 아닌지 알려줌
  // -> json을 retrun 하니까 그것을 data로 받아와서 data 준비여부 알려줌 (함수가 리턴하는 결과물 data로 받아옴)
  // -> 그 결과를 rooms 라는 캐시에 저장
  return (
    <Grid
      mt={10}
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
        '2xl': 'repeat(5, 1fr)',
      }}
    >
      {isLoading ? (
        <>
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
        </>
      ) : null}
      {data?.map(
        (
          room // data undefined일 수도 있기 때문에 ? 붙여주기
        ) => (
          <Room
            key={room.pk}
            pk={room.pk}
            imageUrl={room.photos[0].file}
            name={room.name}
            rating={room.rating}
            city={room.city}
            country={room.country}
            price={room.price}
          />
        )
      )}
    </Grid>
  );
}
