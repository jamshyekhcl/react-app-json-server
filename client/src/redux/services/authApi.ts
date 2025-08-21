import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addAuthHeader } from "../../utils/addAuthHeader";
// import { roles } from "../../interface/role";
import { endPoints } from "../../utils/endPoints";

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password?: string;
  token?: string;
}

export interface IRawUser {
  id: string;
  name: string;
  email: string;
  password: string;
  token: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface LoginRequest {
  email: string;
  password: string;
}

const baseApiUrl = import.meta.env.VITE_API_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseApiUrl}`,
    prepareHeaders: addAuthHeader,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<LoginResponse, IUser>({
      query: (body) => ({
        url: endPoints.USERS,
        method: "POST",
        body,
      }),
      transformResponse: (rawData: IRawUser): LoginResponse => {
        return {
          token: rawData.token,
          user: {
            id: rawData.id,
            name: rawData.name,
            email: rawData.email,
          },
        };
      },
    }),
    login: builder.query<LoginResponse, LoginRequest>({
      query: ({ email, password }) => ({
        url: endPoints.USERS,
        params: { email, password },
      }),

      transformResponse: (rawData: IRawUser[]): LoginResponse => {
        const user = rawData[0]; // assuming you want the first user
        return {
          token: user.token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        };
      },
    }),
    userExist: builder.query<IUser[], string>({
      query: (email) => `${endPoints.USERS}?email=${email}`,
      transformResponse: (response: IUser[]) => response,
    }),

    profile: builder.query<IUser, string>({
      query: (userId) => `${endPoints.USERS}?id=${userId}`,
      transformResponse: (response: IRawUser[]): IUser => {
        const user = response[0];
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLazyLoginQuery,
  useLazyUserExistQuery,
  useProfileQuery,
} = authApi;
