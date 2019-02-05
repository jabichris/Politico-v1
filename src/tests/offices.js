

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const {expect} = chai;
chai.use(chaiHttp);

/**test for creating an office */
describe('POST /api/v1/offices', () => {
    it('it should create a office', (done) => {
      chai.request(app)
        .post('/api/v1/offices')
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

/**test for getting all offices */
describe('GET /api/v1/offices',()=>{
  it('Should return an array of offices',(done)=>{
    chai.request(app).get('/api/v1/offices').end((err, res)=>{
      expect(res.status).to.equal(200);
      expect(res.body.data.length).to.be.above(0);
      done();
    });
});
});
/* test for getting one particular office */
describe('GET /api/v1/offices/:id', () => {
  it('should get a specific Office', (done) => {
    chai.request(app).get('/api/v1/offices/1').end((err, res) => {
        expect(res.status).to.equal(200);
        expect(Object.keys(res.body.data).length).to.be.above(0);
        done();
      });
  });
});
/*test for Delete a specific office */
describe('DELETE /api/v1/offices/:id', () => {
    it('should delete an existing office', (done) => {
      chai.request(app).delete('/api/v1/offices/1').end((err, res) => {
          expect(res.status).to.equal(200);
          expect(Object.keys(res.body.data).length).to.be.above(0);
          done();
        });
    });
  }); 