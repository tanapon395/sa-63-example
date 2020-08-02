import http from 'axios';
import { IUsers } from '../components/Users/user.interface';

const url = 'http://localhost:8080';

// const getUsers = async () => {
//   const { res } = await http.get(`${url}/api/v1/users`);
//   return res;
// };

const getUsers = async () => {
  try {
    const response = await http.get(`${url}/api/v1/users`);
    console.log('response: ', response);
    return new Promise<IUsers>(() => response);
  } catch (error) {
    console.error(error);
    return error;
  }
};

const createUser = async (data: any) => {
  const { res } = await http.post(`${url}/api/v1/users`, data);
  return res;
};

export { getUsers, createUser };
