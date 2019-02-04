import express from 'express';
import partiesRouter from './Routes/parties';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use('/api/v1/parties', partiesRouter)

export default app;