var Request = require('request');

// Executar conjunto de testes
describe('Server', () => {
  var server;
  //Antes de todas as tarefas serem executadas...
  beforeAll(() => {
    server = require('../server');
  });
  //Depois que todos os testes forem encerrados...
  afterAll(() => {
    server.close();
  });

  describe('GET /test', () => {
    var data = {};
    beforeAll((done) => {
      Request.get('http://localhost:5000/test', (err, res, body) => {
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        //Certifica que o método DONE seja executado para então proseguir
        done();
      });
    });

    //Executa apenas um teste específico
    it('Status 500', () => {
      expect(data.status).toBe(500);
    });

    it('Body', () => {
      expect(data.body.msg).toBe('Error...');
    });
  });
});
