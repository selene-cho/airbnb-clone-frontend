import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getRoom } from '../api';

export default function RoomDetail() {
  const { roomPk } = useParams(); //uesParams : 해당 URL에 있는 파라미터 가져다 줌.
  const { isLoading, data } = useQuery([`room:${roomPk}`], getRoom); // 데이터를 캐시에다, key를 써서 저장해야 함.
  console.log(data);

  return <div>hello</div>;
}
