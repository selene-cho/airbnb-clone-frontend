import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8001/api/v1/',
});

export const getRooms = () =>
  instance.get('rooms/').then((response) => response.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) => {
  const [, roomPk] = queryKey; // ${roomPk} 대신 바로 ${queryKey[1]} 이런 식으로 써도 되지만 queryKey안에 roomPk 있다고 협업 위해 명시하는 것이 좋음.
  return instance.get(`rooms/${roomPk}`).then((response) => response.data);
};
