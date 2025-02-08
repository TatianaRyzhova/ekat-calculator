import React, { useState } from 'react';
import './App.css';

function App() {
  const [number, setNumber] = useState({
      XКУР: '',
      XAGT: '',
      XTTR: '',
      XСпептид: '',
  });

  const [result, setResult] = useState('');
  const [submitted, setSubmitted] = useState(false);


  function handleChange(event) {
      const input = event.target;
      const name = input.name;
      const value = input.value;
      setNumber({
        ...number,
        [name]: value
      });
    }

    function handleSubmit(event) {
      event.preventDefault();
      setSubmitted(true);

      const hkur = 2.61 * Number(number.XКУР);
      const hagt = 3.13 * Number(number.XAGT);
      const httr = 1.8 * Number(number.XTTR);
      const hcpeptid = 3.52 * Number(number.XСпептид);

      const z = 4.6 - hkur - hagt - httr - hcpeptid;
      const P = 1 / (1 + Math.exp(-z)) * 100;
      setResult(P);

      // setSubmitted(false);
    }

  
  return (
      <div className="container">
          <h1 className='title'>Расчет риска неразвивающейся беременности при ожирении</h1>
          <p>Р = 1 / (1 + е<sup>-z</sup>) x 100%</p>
          <p>z = 4,6 - 2,61 x Х<sub>КУР</sub> - 3,13 x X<sub>AGT</sub> - 1,8 * Х<sub>TTR</sub> - 3,52 x Х<sub>С-пептид</sub></p>

          <p>где:</p>
          <ul>
              <li>Р – вероятность НБ у женщин с ожирением (%)</li>
                  <li>е – математическая постоянная = 2,718,</li>
                  <li>Х<sub>КУР</sub> – наличие курения   (0 – курящие, 1 - некурящие)</li>
                  <li>X<sub>AGT</sub> – концентрация в сыворотке крови ангиотензиногена (0 - менее 0,608, 1 – более 0,608)</li>
                  <li>Х<sub>TTR</sub> –  концентрация в сыворотке крови транстиретина (0 - менее 0,074, 1 – более 0,074)</li>
                  <li>Х<sub>С-пептид</sub> – концентрация в сыворотке крови С-пептида (0 - более 5,2 нг/мл, 1 – менее 5,2 нг/мл)</li>
          </ul>

          <form onSubmit={handleSubmit}>
              <div className="tables">
                  <table>
                      <tbody>
                          <tr>
                              <th style={{width: "220px"}}>Х<sub>КУР</sub></th>
                              <th>
                                  <input
                                      type="number"
                                      placeholder="0 или 1"
                                      name="XКУР"
                                      onChange={handleChange}
                                      value={number.XКУР}
                                      submitted={submitted}
                                      required
                                  />
                              </th>
                          </tr>
                          <tr>
                              <th style={{width: "220px"}}>X<sub>AGT</sub></th>
                              <th>
                                  <input
                                      type="number"
                                      placeholder="0 или 1"
                                      name="XAGT"
                                      onChange={handleChange}
                                      value={number.XAGT}
                                      submitted={submitted}
                                      required
                                  />
                              </th>
                          </tr>
                          <tr>
                              <th style={{width: "220px"}}>Х<sub>TTR</sub></th>
                              <th>
                                  <input
                                      type="number"
                                      placeholder="0 или 1"
                                      name="XTTR"
                                      onChange={handleChange}
                                      value={number.XTTR}
                                      submitted={submitted}
                                      required
                                  />
                              </th>
                          </tr>
                          <tr>
                              <th style={{width: "220px"}}>Х<sub>С-пептид</sub></th>
                              <th>
                                  <input
                                      type="number"
                                      placeholder="0 или 1"
                                      name="XСпептид"
                                      onChange={handleChange}
                                      value={number.XСпептид}
                                      submitted={submitted}
                                      required
                                  />
                              </th>
                          </tr>
                      </tbody>   
                  </table>
              </div>
              <button type="submit">РАССЧИТАТЬ</button>
          </form>
          <div className="result-space" style={{ minHeight: '50px', paddingBottom: '30px' }}>
              {submitted && (
                  <div className="result">
                  Результат:
                  <span className={result >= 50 ? 'result-red' : 'result-green'}> {result}</span>
                  <p className="information">{'Р > 50% - высокий риск выявления НБ плода'}</p>
                  <p className="information">{'Р < 50% - низкий риск НБ плода '}</p>
              </div>
              )}
          </div>
      </div>
  );
}

export default App;
