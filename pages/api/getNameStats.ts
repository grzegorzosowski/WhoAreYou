import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { isValidName } from '@/lib/validators/isValidName';
import { isValidGenderData } from '@/lib/validators/isValidGenderData';
import { isValidNationalityData } from '@/lib/validators/isValidNationalityData';
import { findNameInRequestHistory, saveRequest } from '@/lib/db/mongoRequests';
import { UserGenderData, UserNationalityData } from '@/lib/types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.query as { name: string };
  if (!isValidName(name)) {
    res.status(400).json({
      error: 'Invalid name',
    });
  }
  try {
    const foundName = await findNameInRequestHistory(name);
    if (
      foundName &&
      isValidGenderData({ genderData: foundName.genderData }) &&
      isValidNationalityData({ nationalityData: foundName.nationalityData })
    ) {
      res.status(200).json({
        userGenderData: foundName.genderData,
        userNationalityData: foundName.nationalityData,
      });
      return;
    }
  } catch (error) {
    console.error('DB error: ', error);
    res.status(500).json({ message: 'Some error has occured, please try again later' });
  }

  try {
    const genderResponse = await axios(`https://api.genderize.io/?name=${name}`);
    const userGenderData: UserGenderData = genderResponse.data;

    const nationalityResponse = await axios(`https://api.nationalize.io/?name=${name}`);
    const userNationalityData: UserNationalityData = nationalityResponse.data;

    await saveRequest({
      name: name,
      genderData: userGenderData,
      nationalityData: userNationalityData,
    });

    if (
      !isValidNationalityData({ nationalityData: userNationalityData }) ||
      !isValidGenderData({ genderData: userGenderData })
    ) {
      res.status(422).json({
        message: 'Something went wrong, try another name',
      });
    }

    const { count, ...genderRestData } = userGenderData;
    const { count: count2, ...nationalityRestData } = userNationalityData;

    res.status(200).json({
      userGenderData: genderRestData,
      userNationalityData: nationalityRestData,
    });
  } catch (error: any) {
    console.error('Error: ', error);
    res.status(error.response.status).json({ message: 'External API error' });
  }
};
