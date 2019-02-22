import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../models/db';
import app from '../app';

const {
  expect,
} = chai;

chai.use(chaiHttp);
/* Sign-up */
describe('Sign-up', () => {
  before(async () => {
    try {
      await db.query('TRUNCATE users CASCADE; ALTER SEQUENCE users_id_seq RESTART WITH 1;');
    } catch (error) {
      console.log(error);
    }
  });

  // eslint-disable-next-line no-undef
  describe('POST /api/v1/auth/signup', () => {
    // test 1
    it('should return the status code and the information of the created user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'JABIRO',
          lastName: 'Christian',
          otherName: 'jean',
          email: 'jabichris@gmail.com',
          phone: '0788875200',
          username: 'jabichris',
          password: 'hdrbj',
          photoUrl: 'www.img.com/sh.jpg',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(Object.keys(res.body.data).length).to.be.above(0);
          done();
        });
    });
    it('Verify your inputs', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'JABIRO',
          lastName: 'Christian',
          otherName: 'jean',
          email: 'jabichris@gmail.com',
          phone: '0788875200',
          username: 'jabichris',
          password: 'hdrbj',
          photoUrl: 'www.img.com/sh.jpg',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error.toLowerCase()).to.be.equal('Verify your inputs');
          done();
        });
    });
  });
});
describe('Sign-in', () => {
  describe('POST /api/v1/auth/login', () => {
    it('should return the user information if the account exists', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'jabichris@gmail.com',
          password: 'hdrbj',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(Object.keys(res.body.data).length).to.be.above(0);
          done();
        });
    });
    it('should display \'Try again,Username and Password are not matching\'', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'jabichris@gmail.com',
          password: '11111',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error.toLowerCase()).to.be.equal('try again,username or password is incorrect');
          done();
        });
    });
  });
});
