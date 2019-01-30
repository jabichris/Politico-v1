import express from 'express';
import router from './Routes/parties'

// const router = express.Router();
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use('/api/v1/parties', router)
export default app;