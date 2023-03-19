import { Grid } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(true); // 유저가 페이지 방문하면 기본적으로 화면 로딩중
  const [rooms, setRooms] = useState<IRoom[]>([]); // rooms는 array!
  const fetchRooms = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/v1/rooms/'); // 백엔드 해당 url에서 fetch
    const json = await response.json(); // response 로부터 json 추출
    setRooms(json); // json을 setRooms -> rooms 변수에 저장 -> typescript는 백엔드에서 추출한 json이 무슨 type인지 모르기 때문에 interface 적어줌
    setIsLoading(false); // 로딩중이었던 것은 false 바꿈
  };
  useEffect(() => {
    // 유저 방문시, useEffect 호출,
    fetchRooms(); // fetchRooms 함수 시작
  }, []);
  //CORS Error: 서버가 사용자들에게 무언가를 fetch하는 것을 허용하지 않는 것 -> 서버가 몇몇url fetch하도록 허용시켜야 함
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
      {rooms.map((room) => (
        <Room
          imageUrl={room.photos[0].file}
          name={room.name}
          rating={room.rating}
          city={room.city}
          country={room.country}
          price={room.price}
        />
      ))}
    </Grid>
  );
}
