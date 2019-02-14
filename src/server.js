import app from './app';

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.status(200).send({ message: 'Youpi! Server is up and running!' }));
app.listen(port);
// eslint-disable-next-line no-console
console.log('Server running on port,', port);
