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

  const foundUser = await UserServices.getAllInformation(nickName, ACCESS_TOKEN);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const getShortInfoByNickName = async(req: Request, res: Response) => {
  const nickName = req.params.nickname;

  if (!nickName) {
    res.sendStatus(400);

    return;
  }

  const foundUser = await UserServices.getShortInfoByNickName(nickName, ACCESS_TOKEN);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

export default {
  getByNickName,
  getShortInfoByNickName,
};
