import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { FaBed, FaMoneyBill, FaToilet } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  getAmenities,
  getCategories,
  IUploadRoomVariables,
  uploadRoom,
} from '../api';
import useHostOnlyPage from '../components/HostOnlyPage';
import ProtectedPage from '../components/ProtectedPage';
import { IAmenity, ICategory, IRoomDetail } from '../types';

export default function UploadRoom() {
  const { register, handleSubmit } = useForm<IUploadRoomVariables>();
  const toast = useToast();
  const navigate = useNavigate();
  const mutation = useMutation(uploadRoom, {
    onSuccess: (data: IRoomDetail) => {
      toast({
        status: 'success',
        title: 'Room created',
        position: 'bottom-right',
      });
      navigate(`/rooms/${data.id}`);
    },
  });
  // ['amenities'] = Query 이름, getAmenities 가져오는 fetch할 함수
  const { data: amenities } = useQuery<IAmenity[]>(['amenities'], getAmenities);
  // console.log(data, isLoading);

  const { data: categories } = useQuery<ICategory[]>(
    ['categories'],
    getCategories
  );
  // console.log(categories, isCategoriesLoading);
  useHostOnlyPage();
  // console.log(watch());

  // form이 submit 되었을 때 mutation.mutate 호출해서 모든 data 전송
  const onSubmit = (data: IUploadRoomVariables) => {
    mutation.mutate(data);
  };

  return (
    <ProtectedPage>
      <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
        <Container>
          <Heading textAlign={'center'}>Upload Room</Heading>
          <VStack
            spacing={10}
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            mt={5}
          >
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                {...register('name', { required: true })}
                required
                type="text"
              />
              <FormHelperText>Write the name of your room.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input
                {...register('country', { required: true })}
                required
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input
                {...register('city', { required: true })}
                required
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                {...register('address', { required: true })}
                required
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaMoneyBill />} />
                <Input
                  {...register('price', { required: true })}
                  type="number"
                  min={0}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Rooms</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaBed />} />
                <Input
                  {...register('rooms', { required: true })}
                  type="number"
                  min={0}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Toilets</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaToilet />} />
                <Input
                  {...register('toilets', { required: true })}
                  type="number"
                  min={0}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea {...register('description', { required: true })} />
            </FormControl>
            <FormControl>
              <Checkbox {...register('pet_friendly', { required: true })}>
                Pet friendly?
              </Checkbox>
            </FormControl>
            <FormControl>
              <FormLabel>Kind of room</FormLabel>
              <Select
                {...register('kind', { required: true })}
                placeholder="Choose a kind"
              >
                <option value="entire_place">Entire_place</option>
                <option value="private_room">Private_room</option>
                <option value="shared_room">Shared_room</option>
              </Select>
              <FormHelperText>
                What kind of room are you renting?
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                {...register('category', { required: true })}
                placeholder="Choose a category"
              >
                {categories?.map((category) => (
                  <option key={category.pk} value={category.pk}>
                    {category.name}
                  </option>
                ))}
              </Select>
              <FormHelperText>
                What category describes your room?
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Amenities</FormLabel>
              <Grid templateColumns={'1fr 1fr'} gap={5}>
                {amenities?.map((amenity) => (
                  <Box key={amenity.pk}>
                    <Checkbox
                      value={amenity.pk}
                      {...register('amenities', { required: true })}
                    >
                      {amenity.name}
                    </Checkbox>
                    <FormHelperText>{amenity.description}</FormHelperText>
                  </Box>
                ))}
              </Grid>
            </FormControl>
            {mutation.error ? (
              <Text color="red.500">Something went wrong</Text>
            ) : null}
            <Button
              type="submit"
              isLoading={mutation.isLoading}
              colorScheme={'red'}
              size="lg"
              w="100%"
            >
              Upload Room
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
