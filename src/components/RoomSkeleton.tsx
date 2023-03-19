import { Box, HStack, Skeleton } from '@chakra-ui/react';

export default function RoomSkeleton() {
  return (
    <Box>
      <Skeleton h={'280px'} rounded="2xl" mb={6} />
      <HStack justifyContent={'space-between'}>
        <Skeleton rounded="lg" w="70%" h={4} mb={1} />
        <Skeleton rounded="lg" w="15%" h={4} />
      </HStack>
      <Skeleton rounded="lg" w="40%" h={4} mb={4} />
      <Skeleton rounded="lg" w="45%" h={4} />
    </Box>
  );
}
