import React, { Component } from 'react';

import './index.css';

class Index extends Component {
  constructor() {
    super();
    this.state = {
      info: [],
    };
  }

  componentDidMount() {
    fetch('/api/info')
      .then((res) => res.json())
      .then((info) => this.setState({ info }, () => console.log(info)));
  }

  render() {
    return (
      <div>
        <div className='container'>
          <h1>VxTel - FaleMais</h1>
          <h4>
            Calcule o valor da sua ligação de sua cidade para outra cidade,
            rápido e fácil!!
          </h4>
          <div className='row justify-content-center'>
            <div className='col-6'>
              <form id='myform' action='/server' method='POST'>
                <label htmlFor='codor'>Código de Origem</label>
                <select
                  id='codor'
                  name='codor'
                  className='form-select'
                  required
                >
                  <option value=''>Selecione</option>
                  <option value='011'>011</option>
                  <option value='016'>016</option>
                  <option value='017'>017</option>
                  <option value='018'>018</option>
                </select>
                <br />
                <label htmlFor='codest'>Código de Destino</label>
                <select
                  id='codest'
                  name='codest'
                  className='form-select'
                  required
                >
                  <option value=''>Selecione</option>
                  <option value='011'>011</option>
                  <option value='016'>016</option>
                  <option value='017'>017</option>
                  <option value='018'>018</option>
                </select>
                <br />
                <div className='input mb-3'>
                  <label htmlFor='mins'>Tempo da Ligação em Minutos</label>
                  <input
                    id='mins'
                    name='mins'
                    type='number'
                    className='form-control'
                    required
                  />
                </div>
                <br />
                <label htmlFor='plano'>Plano FaleMais</label>
                <select
                  id='plano'
                  name='plano'
                  className='form-select'
                  required
                >
                  <option value=''>Selecione</option>
                  <option value='30'>FaleMais 30 Minutos (Sem Custos)</option>
                  <option value='60'>FaleMais 60 Minutos</option>
                  <option value='120'>FaleMais 120 Minutos</option>
                </select>
                <br />
                <input
                  type='submit'
                  value='Calcular'
                  className='btn btn-secondary'
                />
              </form>
              <div class='table table-responsive'>
                {this.state.info.map((info) => (
                  <table
                    id='table'
                    className='table table-bordered table-responsive'
                  >
                    <thead className='table-secondary'>
                      <tr>
                        <th scope='col'>Origem</th>
                        <th scope='col'>Destino</th>
                        <th scope='col'>Tempo</th>
                        <th scope='col'>Plano FaleMais</th>
                        <th scope='col'>Com FaleMais</th>
                        <th scope='col'>Sem FaleMais</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{info.codor}</td>
                        <td>{info.codest}</td>
                        <td>{info.mins}</td>
                        <td>FaleMais {info.plano}</td>
                        <td>$ {info.percent}</td>
                        <td>$ {info.sem_fale}</td>
                      </tr>
                    </tbody>
                  </table>
                ))}
              </div>
            </div>
          </div>
        </div>
        <footer>
          <h4 className='txt'>VxTel - FaleMais &copy; 2020</h4>
        </footer>
      </div>
    );
  }
}

export default Index;
