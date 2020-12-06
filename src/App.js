import React, { useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";
import  { orderBy, uniqBy } from 'lodash'

class ExcelToJson extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      file: "",
      dataArray: [],
      result: []
    };
  }

  handleClick(e) {
    this.refs.fileUploader.click();
  }

  filePathset(e) {
    e.stopPropagation();
    e.preventDefault();
    var file = e.target.files[0];
    console.log(file);
    this.setState({ file });

    console.log(this.state.file);
  }

  async readFile() {
    let array = []
    var f = this.state.file;
    var name = f.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      /* Update state */
      //console.log("Data>>>" + data);// shows that excel data is read
      //console.log(this.convertToJson(data)); // shows data in json format
      const convertToJson = this.convertToJson(data)

      const result = JSON.parse(convertToJson)

      array.push(result)

      console.log('result', result)

        const skillss = result.map(user => {

          const userValues = Object.values(user)

          let data = [
            {
              id: userValues[0],
              name: 'Solução de Problemas Complexos',
              score: (Number(userValues[1]) * 100).toFixed(2),
              company_position: "teste",
            },
            {
              id: userValues[0],
              name: 'Pensamento Crítico',
              score: (Number(userValues[2]) * 100).toFixed(2),
              company_position: "teste",
            },
            {
              id: userValues[0],
              name: 'Criatividade',
              score: (Number(userValues[3]) * 100).toFixed(2),
              company_position: "teste",
            },
            {
              id: userValues[0],
              name: 'Gestão de Pessoas',
              score: (Number(userValues[4]) * 100).toFixed(2),
              company_position: "teste",
            },
            {
              id: userValues[0],
              name: 'Coordenação Com os outros',
              score: (Number(userValues[5]) * 100).toFixed(2),
              company_position: "teste",
            },
            {
              id: userValues[0],
              name: 'Inteligência Emocional',
              score: (Number(userValues[6]) * 100).toFixed(2),
              company_position: "teste",
            },
            {
              id: userValues[0],
              name: 'Julgamento e Tomada de Decisão',
              score: (Number(userValues[7]) * 100).toFixed(2),
              company_position: "teste",
            },
            {
              id: userValues[0],
              name: 'Orientação Para Servir',
              score: (Number(userValues[8]) * 100).toFixed(2),
              company_position: "teste",
            },
            {
              id: userValues[0],
              name: 'Negociação',
              score: (Number(userValues[9]) * 100).toFixed(2),
              company_position: "teste",
            },
            {
              id: userValues[0],
              name: 'Flexibilidade Cognitiva',
              score: (Number(userValues[10]) * 100).toFixed(2),
              company_position: "teste",
            }
          ]
          return data
        })
        let JsonResult = []
        setTimeout(() => {
          skillss.map(skills => {

            let courses = [];

            for (let i = 0; i < skills.length; i++) {
              courses.push({ usuario: skills[i].id})
              if (skills[i].name == 'Julgamento e Tomada de Decisão') {
                courses.push({ name: 'Construindo Cultura', id: 'MODC_P_CC' });

              } else if (skills[i].name == 'Orientação Para Servir') {
                courses.push({ name: 'Colaboração: Método e Prática', id: 'MODC_P_COL' });

              } else if (skills[i].name == 'Colaboração') {
                courses.push({ name: 'Colaboração: Método e Prática', id: 'MODC_P_COL' });


              } else if (skills[i].name == 'Negociação') {
                courses.push({ name: 'Linguagem e Mindset do Líder', id: 'MODC_P_LML' });

              } else if (skills[i].name == 'Solução de Problemas Complexos') {

                if (skills[i].company_position == 'Operações') {
                  courses.push({ name: 'Processos Estáveis, Produtos Confiáveis', id: 'MODC_P_PEPC' });

                } else {
                  if (skills[i].score <= 30) {
                    courses.push({ name: 'Visão Sistêmica', id: 'MODC_P_VS' });

                  } else if (skills[i].score < 40) {
                    courses.push({ name: 'Business Foundation', id: 'MODC_P_BF' });

                  } else if (skills[i].score < 50) {
                    courses.push({ name: 'Atingindo Resultados Excepcionais', id: 'MODC_P_ARE' });

                  } else if (skills[i].score < 60) {
                    courses.push({ name: 'Cultura de Inovação', id: 'MODC_P_CI' });

                  } else {
                    courses.push({ name: 'Inovação Customer Centric', id: 'MODC_P_ICC' });
                  }
                }

              } else if (skills[i].name == 'Liderança') {
                if (skills.find(element => {
                  return element.name == 'Solução de Problemas Complexos'
                }).score > 50) {

                  if (skills[i].score <= 50) {
                    courses.push({ name: 'Liderança que Inspira', id: 'MODC_P_LQI' });

                  } else {
                    courses.push({ name: 'Linguagem e Mindset do Líder', id: 'MODC_P_LML' });

                  }
                } else {
                  courses.push({ name: 'O Líder que bate metas', id: 'MODC_P_LQBM' });
                }

              } else if (skills[i].name == 'Flexibilidade Cognitiva') {
                courses.push({ name: 'Visão Sistêmica', id: 'MODC_P_VS' });

              } else if (skills[i].name == 'Inteligência Emocional') {
                courses.push({ name: 'Liderança que Inspira', id: 'MODC_P_LQI' });

              } else if (skills[i].name == 'Pensamento Crítico') {
                courses.push({ name: 'Visão Sistêmica', id: 'MODC_P_VS' });

              } else if (skills[i].name == 'Inovação') {
                courses.push({ name: 'Inovação Customer Centric', id: 'MODC_P_ICC' });
                // + cultura de inovação

              } else {
                //console.log('ERRO: ', skills[i]);
              }
            }

            const res = uniqBy(courses, 'name');

            const response = res.slice(0, 4)


            let resultado = {
              usuario: response[0].usuario,
              modulo1: response[1].name,
              modulo2: response[2].name,
              modulo3: response[3].name
            }

            this.state.dataArray.push(resultado)

          })
        }, 3000);


      setTimeout(() => {
        //console.log('JsonResult', this.state.dataArray.map(e => e))

        this.setState({
          result: this.state.dataArray.map(e => e)
        })
      }, 4000)

    };
    reader.readAsBinaryString(f);
  }

  convertToJson(csv) {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }

  render() {
    const { result } = this.state

    return (
        <div>
          <input
              type="file"
              id="file"
              ref="fileUploader"
              onChange={this.filePathset.bind(this)}
          />
          <button
              onClick={() => {
                this.readFile();
              }}
          >
            Read File
          </button>

          <div>
            {result.map(item => {
              console.log(item)
              return (
                  <div>
                    <p>Usuario: {item.usuario}</p>
                    <p>modulo 1: {item.modulo1}</p>
                    <p>modulo 2: {item.modulo2}</p>
                    <p>modulo 1: {item.modulo3}</p>
                  </div>
              )
            })}
          </div>
        </div>
    );
  }
}

export default ExcelToJson;
