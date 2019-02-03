import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const {
    expect
  } = chai;
chai.use(chaiHttp);

describe('POST /api/v1/parties', () => {
    it('it should create a party', (done) => {
      chai.request(app)
        .post('/api/v1/parties')
        .set('access-token', token)
        .send({
            id: 1,
            name: 'PDC',
            hqAddress: 'Kacyiru'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(Object.keys(res.body.data).length).to.be.above(0);
          done();
        });
    }); 
  });