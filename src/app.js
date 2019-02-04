import express from 'express';
import partiesRouter from './Routes/parties';
import officeRouter from './Routes/offices';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use('/api/v1/parties', partiesRouter)
app.use('/api/v1/offices', officeRouter)

export default app;