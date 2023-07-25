import { GetServerSidePropsContext } from 'next';

export type RequestWithCookies = GetServerSidePropsContext['req'];

export type UserGenderData = {
  count: number;
  name: string;
  gender: string;
  probability: number;
};

export type UserNationalityData = {
  count: number;
  name: string;
  country: Array<CountryProbability>;
};

type CountryProbability = {
  country_id: string;
  probability: number;
};

export type UserGenderDataWithoutCount = Omit<UserGenderData, 'count'>;
export type UserNationalityDataWithoutCount = Omit<UserNationalityData, 'count'>;

export type RequestHistory = {
  timestamp: Date;
  name: string;
  genderData: UserGenderData;
  nationalityData: UserNationalityData;
};

export type RequestHistoryWithId = RequestHistory & {
  _id: string;
};

export type RequestHistoryData = {
  data: RequestHistoryWithId[];
  totalItems: number;
};

export type SaveRequestLogs = {
  name: string;
  genderData: UserGenderData;
  nationalityData: UserNationalityData;
};

export type UserValidation = {
  userId: number;
  username: string;
  password: string;
};

export type IFormValues = {
  [key: string]: string;
};
