// apiService.ts
import axios from 'axios';
import { interfaceUser } from './User'

const baseURL = 'https://65588307e93ca47020a965a7.mockapi.io/fathomTest';

// Obtener lista de usuarios
export const getUsers = async (): Promise<interfaceUser[]> => {
  const response = await axios.get(`${baseURL}/users`);
  return response.data;
};

// Crear nuevo usuario
export const createUser = async (user: interfaceUser): Promise<interfaceUser> => {
  const response = await axios.post(`${baseURL}/users`, user);
  return response.data;
};

// Actualizar usuario existente
export const updateUser = async (user: interfaceUser): Promise<interfaceUser> => {
  const response = await axios.put(`${baseURL}/users/${user.id}`, user);
  return response.data;
};

// Eliminar usuario
export const deleteUser = async (user: string): Promise<interfaceUser> => {
  const response = await axios.delete(`${baseURL}/users/${user}`);
  return response.data;
};
