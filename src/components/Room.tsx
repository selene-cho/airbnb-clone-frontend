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
import { FaCamera, FaRegHeart, FaStar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

interface IRoomProps {
  // props의 type 명시
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
  pk: number;
  isOwner: boolean;
}

export default function Room({
  pk,
  imageUrl,
  isOwner,
  name,
  rating,
  city,
  country,
  price,
}: IRoomProps) {
  // typescript는 props 쓰기 위해서 어떤 종류의 props인지 알려줘야함 :IRoomProps에 정의해놨다는 것 알려주기
  const gray = useColorModeValue('gray.600', 'gay.300');
  const navigate = useNavigate();
  const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/rooms/${pk}/photos`);
  };
  return (
    <Link to={`/rooms/${pk}`}>
      <VStack alignItems={'flex-start'}>
        {/* gap 값은 rem / 5개 같은 크기로 한줄에 꽉차게 반복*/}
        <Box
          w="100%"
          position="relative"
          overflow={'hidden'}
          mb={3}
          rounded="2xl"
        >
          {imageUrl ? (
            <Image minH="280" src={imageUrl} />
          ) : (
            <Box minH="280" h="100%" w="100%" p={10} bg="green.400" />
          )}
          <Button
            variant={'unstyled'}
            position="absolute"
            top={0}
            right={0}
            onClick={onCameraClick}
            color="white"
          >
            {isOwner ? <FaCamera size="20px" /> : <FaRegHeart size="20px" />}
          </Button>
        </Box>
        <Box>
          <Grid gap={2} templateColumns={'6fr 1fr'}>
            <Text display={'block'} as="b" noOfLines={1} fontSize="md">
              {name}
            </Text>
            <HStack spacing={1} alignItems="center">
              <FaStar size={12} />
              <Text fontSize={'sm'}>{rating}</Text>
            </HStack>
          </Grid>
          <Text fontSize={'sm'} color={gray}>
            {city}, {country}
          </Text>
        </Box>
        <Text fontSize={'sm'} color={gray}>
          <Text as="b">₩{price}</Text> / 박
        </Text>
      </VStack>
    </Link>
  );
}
