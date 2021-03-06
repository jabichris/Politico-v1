/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import chai from 'chai';
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

/** test for creating a partie */
describe('POST /api/v1/parties', () => {
  it('it should create a party', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .send({
        id: 1,
        name: 'PDC',
        hqAddress: 'Kacyiru',
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(Object.keys(res.body.data).length).to.be.above(0);
        done();
      });
  });
});

/** test for getting all parties */
describe('GET /api/v1/parties', () => {
  it('Should return an array of parties', (done) => {
    chai.request(app).get('/api/v1/parties').end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.data.length).to.be.above(0);
      done();
    });
  });
});
/** test for getting one particular party */
describe('GET /api/v1/parties/:id', () => {
  it('should get a specific Party', (done) => {
    chai.request(app).get('/api/v1/parties/1').end((err, res) => {
      expect(res.status).to.equal(200);
      expect(Object.keys(res.body.data).length).to.be.above(0);
      done();
    });
  });
});
/* Delete a specific party */
describe('DELETE /api/v1/parties/:id', () => {
  it('Should delete an single party', (done) => {
    chai.request(app).delete('/api/v1/parties/1').end((error, res) => {
      expect(res.status).to.equal(200);
      expect(Object.keys(res.body.data).length).to.be.above(0);
      done();
    });
  });
});
/* test for edit party */
describe('PATCH /api/v1/parties/:id/name', () => {
  it('Should edit an existing party', (done) => {
    chai.request(app).patch('/api/v1/parties/3/name').send({ name: 'PDI' }).end((err, res) => {
      expect(res.status).to.equal(200);
      expect(Object.keys(res.body.data)).to.be.an('array');
      done();
    });
  });
});
