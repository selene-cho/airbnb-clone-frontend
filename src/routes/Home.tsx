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
  pk: number;
  name: string;
  country: string;
  city: string;
  price: number;
  rating: number;
  is_owner: boolean;
  photos: IPhoto[];
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const fetchRooms = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/v1/rooms/');
    const json = await response.json();
    setRooms(json);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchRooms();
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
        '2xl': 'reapet(5, 1fr)',
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
