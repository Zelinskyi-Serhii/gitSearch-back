'use strict';

import UserServices from '../services/user';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const { ACCESS_TOKEN = ''} = process.env;


const getByNickName = async(req: Request, res: Response) => {
  const nickName = req.params.nickname;

  if (!nickName) {
    res.sendStatus(400);

    return;
  }

  const foundHero = await UserServices.getAllInformation(nickName, ACCESS_TOKEN);

  res.send(foundHero);
};

const getShortInfoByNickName = async(req: Request, res: Response) => {
  const nickName = req.params.nickname;

  if (!nickName) {
    res.sendStatus(400);

    return;
  }

  const foundHero = await UserServices.getShortInfoByNickName(nickName, ACCESS_TOKEN);

  if (!foundHero) {
    res.sendStatus(404);

    return;
  }

  res.send(foundHero);
};

export default {
  getByNickName,
  getShortInfoByNickName,
};
