const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../server');

describe("Server", () => {
  it ("/checkAvailableLists should respone with all lists", done => {
    chai.request(server)
    .get('/checkAvailableLists')
    .end((err, res) => {
      // should.not.exist(err);
      res.status.should.equal (200);
      // res.type.should.equal('application/json');
      done();
    })
  })
})
