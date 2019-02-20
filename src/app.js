import express from 'express';
import partiesRouter from './Routes/parties';
import officesRouter from './Routes/offices';
import usersRouter from './Routes/users';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
app.use('/api/v1/parties', partiesRouter);
app.use('/api/v1/offices', officesRouter);
app.use('/api/v1/auth', usersRouter);

export default app;
