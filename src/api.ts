import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import Cookie from 'js-cookie';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8001/api/v1/', // 이 domain(3001)에서 만든 cookie를 다시 같은 domain(8001)으로 보내는 것
  withCredentials: true, // api에 요청을 할때 cookie를 보내겠다는 의미 (자바스크립트는 자동으로 cookie 보내지 않기 때문)
});

export const getRooms = () =>
  instance.get('rooms/').then((response) => response.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) => {
  const [, roomPk] = queryKey; // ${roomPk} 대신 바로 ${queryKey[1]} 이런 식으로 써도 되지만 queryKey안에 roomPk 있다고 협업 위해 명시하는 것이 좋음.
  return instance.get(`rooms/${roomPk}`).then((response) => response.data);
};

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
  const [, roomPk] = queryKey; // ${roomPk} 대신 바로 ${queryKey[1]} 이런 식으로 써도 되지만 queryKey안에 roomPk 있다고 협업 위해 명시하는 것이 좋음.
  return instance
    .get(`rooms/${roomPk}/reviews`)
    .then((response) => response.data);
};

export const getMe = () =>
  instance.get(`users/me`).then((response) => response.data);

export const logOut = () =>
  instance
    .post(`users/log-out`, null, {
      headers: {
        'X-CSRFToken': Cookie.get('csrftoken') || '',
      },
    })
    .then((response) => response.data);

export const githubLogIn = (code: string) =>
  instance
    .post(
      `users/github`,
      { code },
      {
        headers: {
          'X-CSRFToken': Cookie.get('csrftoken') || '',
        },
      }
    )
    .then((response) => response.status);

export const kakaoLogIn = (code: string) =>
  instance
    .post(
      `users/kakao`,
      { code },
      {
        headers: {
          'X-CSRFToken': Cookie.get('csrftoken') || '',
        },
      }
    )
    .then((response) => response.status);

export interface IUsernameLoginVariables {
  username: string;
  password: string;
}

export interface IUsernameLoginSuccess {
  ok: string;
}

export interface IUsernameLoginError {
  error: string;
}

export const usernameLogIn = ({
  username,
  password,
}: IUsernameLoginVariables) =>
  instance
    .post(
      `users/log-in`,
      { username, password },
      {
        headers: {
          'X-CSRFToken': Cookie.get('csrftoken') || '',
        },
      }
    )
    .then((response) => response.data);

export const getAmenities = () =>
  instance.get(`rooms/amenities`).then((response) => response.data);

export const getCategories = () =>
  instance.get(`categories`).then((response) => response.data);

export interface IUploadRoomVariables {
  name: string;
  country: string;
  city: string;
  price: number;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_friendly: boolean;
  kind: string;
  amenities: number[];
  category: number;
}

export const uploadRoom = (variables: IUploadRoomVariables) =>
  instance
    .post(`rooms/`, variables, {
      headers: {
        'X-CSRFToken': Cookie.get('csrftoken') || '',
      },
    })
    .then((response) => response.data);
