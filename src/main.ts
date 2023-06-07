'use strict';

import express from 'express';
import cors from 'cors';
import { router } from './routes/user';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 4152;
export const app = express();

app.use(cors());
app.use(express.json());
app.use('/', router);

app.listen(PORT)
