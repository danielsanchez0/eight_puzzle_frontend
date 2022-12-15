import styles from "./TicTacToe.module.css";
import Ribbon from "./Ribbon"
import XMLParser from 'react-xml-parser';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

import styled from 'styled-components'
import {Col,Row} from "reactstrap"

import { Bars } from  'react-loader-spinner'


const Content = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  align-items: center;
`

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  & > * + * {
    margin-top: 12px;
  }
`

const Head = styled.h2`
  text-align: center;
  color: white;
  font-family: var(--fontFamilyPrimary);
  margin: 0;
  font-weight: normal;
  font-size: 1.25rem;
`

const KeysContainer = styled.div`
  & > * + * {
    margin: 12px auto;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  ${Ribbon} {
    margin: 24px 0 0 0;
  }

  ${Stack} {
    margin-top: 140px;
  }

  p {
    margin: 12px 0;
    font-family: var(--fontFamilyPrimary);
    color: white;
    font-size: 1rem;
  }

  h3 {
    padding: 0;
    font-family: var(--fontFamilySecondary);
    font-weight: normal;
    color: white;
    transition: opacity 0.5s ease, max-height 0.5s ease, margin 0.25s ease;
    max-height: 0px;
    overflow: hidden;
    margin: 0px;
    opacity: 0;
    &[data-show] {
       opacity: 1;
       max-height: 35px;
       margin: 16px;
    }
  }

  @media (max-width: 640px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    ${Content} {
      margin-left: 0px;
      width: 100%;
    }

    ${Stack} {
      margin-top: 32px;
    }

    ${KeysContainer} {
      display: flex;

      & > * {
        margin: auto 8px;
      }
    }
  }
`
const AppWrapper = styled.div`
  min-height: 100vh;
  background-color: var(--primaryLight);
  transition: background-color 1.25s ease;
  color: white;
  font-family: var(--fontFamilyPrimary);
`

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  margin: 10px;
  div {
    margin: 0 10px;
  }
`

let pasos = [
  "1,2,3,4,5,6,7,8",
  "1,2,3,4,5,6,7,9",
  "1,2,3,4,5,7,8,1",
]

let pasoReinicio = ["","","",""]

const  Grid = ()=>{

  const [step,setStep] = useState(0)
  const [estado,setEstado] = useState(false)
  const [aprobacion,setAprobacion] = useState(false)
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [TextoInicial, setTextoInicial] = useState("")
  const [TextoEsperado, setTextoEsperado] = useState("")
  const [aEstrellaNodos, setAEstrellaNodos] = useState(0)
  const [anchuraNodos, setAnchuraNodos] = useState(0)
  const [profundidadNodos, setProfundidadNodos] = useState(0)
  const [primeroNodos, setPrimeroNodos] = useState(0)
  const [longCaminoEstrella, setLongCaminoEstrella] = useState(0)
  const [longCaminoAnchura, setLongCaminoAnchura] = useState(0)
  const [longCaminoProfundidad, setLongCaminoProfundidad] = useState(0)
  const [longCaminoPrimero, setLongCaminoPrimero] = useState(0)
  const [nombreAlgoritmo, setNombreAlgoritmo] = useState("")
  const [textoArchivo, setTextoArchivo] = useState("")
  const [nombreArchivo, setNombreArchivo] = useState("")
  const [files, setFiles] = useState("");

  const [estadoEjecucion, setEstadoEjecucion] = useState(false)


  const [tableroInicial,setTableroInicial] = useState(["","","","","","","","",""])
  const [tableroEsperado,setTableroEsperado] = useState(["1","2","3","4","5","6","7","8",""])

  const crearMatriz = (paso)=>{

  const a = paso.split(",")

  const matriz = [
    [a[0],a[1],a[2]],
    [a[3],a[4],a[5]],
    [a[6],a[7],a[8]]
  ]

  return matriz
}


useEffect(() => {
  if(estado == true ){
    const timer = setTimeout(() => {

      if(step<pasos.length){
      const mt = crearMatriz(pasos[step])
      setBoard(mt)
      console.log('This will run after 1 second!')
      setStep(step+1)
    }

      if(step===pasos.length){
        setEstado(false)
        setStep(0)
        alerta("Se ha terminado el proceso de busqueda","Busqueda finalizada","success")
      }
    }, 2500);

    return () => clearTimeout(timer);
  }
});

const alerta = ( texto,titulo,icono) => {
  Swal.fire(
    titulo,
    texto,
    icono
  )
}


const modificarMatrizInicial = (posicion,valor) => {
  if(aprobacion === true){
    setAprobacion(false)
  }

  tableroInicial[posicion]=valor;
  setTableroInicial(tableroInicial);
  console.log(tableroInicial)
}

const modificarMatrizEsperado = (posicion,valor) => {
  if(aprobacion === true){
    setAprobacion(false)
  }

  tableroEsperado[posicion]=valor;
  setTableroEsperado(tableroInicial);
  console.log("tablero Esperado: "+tableroEsperado)
}

const verificarElementosRepetidos = (lista) => {
  let duplicados = []
 
  const tempArray = [...lista].sort()

  for (let i = 0; i < tempArray.length; i++) {
    if (tempArray[i + 1] === tempArray[i]) {
      duplicados.push(tempArray[i])
    }
  }

  if(duplicados.length>0){
    return false
  }

  return true
}

const verificarEspacioVacio = (lista) => {
  let espacios = 0

  for (let i = 0; i < lista.length; i++) {
    if (lista[i] === "") {
      espacios = espacios + 1
    }
  }

  if(espacios === 1){
    return true
  }

  return false
}

const aprobarMatriz = ()=>{
   if(verificarEspacioVacio(tableroInicial) && verificarEspacioVacio(tableroEsperado) 
     && verificarElementosRepetidos(tableroInicial) && verificarElementosRepetidos(tableroEsperado) ){
     setAprobacion(true)
     alerta("La matriz cumple los requisitos","Aprobado","success")
   }else{
     setAprobacion(false)
      alerta("La matriz no cumple los requisitos","Error","info")
   }
}

const datosObjetivo = (tablero)=>{
  let texto = ""
  for (let index = 0; index < tablero.length; index++) {
    texto = texto + tablero[index];
    if (tablero[index] == "") {
      texto = texto + "0";
    }
    if (index < tablero.length-1) {
      texto = texto + ",";
      
    }
  }
  console.log(texto)
  return texto
}

const algoritmoEstrella = ()=>{
  setEstadoEjecucion(true)
  setEstado(true)
  setNombreAlgoritmo("Estrella")
  console.log("algoritmoEstrella")
  fetch("http://127.0.0.1:8000/puzzle-estrella", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inicial: datosObjetivo(tableroInicial),
        objetivo: datosObjetivo(tableroEsperado)
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setEstadoEjecucion(false)
        pasos = result["movimientos"];
        setAEstrellaNodos(result["cantidad"])
        setLongCaminoEstrella(result["longitudSol"])
        console.log(aEstrellaNodos);
        
      })
      .catch((err) => {
        console.log(err);
      });
}

const algoritmoAnchura = ()=>{
  setNombreAlgoritmo("Anchura")
  setEstado(true)
  setEstadoEjecucion(true)
  console.log("algoritmoAnchura")
  fetch("http://127.0.0.1:8000/puzzle-anchura", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inicial: datosObjetivo(tableroInicial),
        objetivo: datosObjetivo(tableroEsperado)
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        
        pasos = result["movimientos"];
        setAnchuraNodos(result["cantidad"]);
        setLongCaminoAnchura(result["longitudSol"])
        //alert(result["cantidad"])
        console.log("ANCHUARA " +anchuraNodos);
        console.log("ESTRELLA " + aEstrellaNodos);
        console.log(pasos);
        setEstadoEjecucion(false)
      })
      .catch((err) => {
        console.log(err);
      });
}

const algoritmoPrimero= ()=>{
  setEstado(true)
  setNombreAlgoritmo("Primero")
  setEstadoEjecucion(true) 
  console.log("algoritmoPrimero")
  fetch("http://127.0.0.1:8000/puzzle-primero", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inicial: datosObjetivo(tableroInicial),
        objetivo: datosObjetivo(tableroEsperado)
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setEstadoEjecucion(false)
        pasos = result["movimientos"];
        setPrimeroNodos(result["cantidad"]);
        setLongCaminoPrimero(result["longitudSol"])
        
        console.log(aEstrellaNodos);
        console.log(anchuraNodos);
        console.log(profundidadNodos);
        console.log(primeroNodos);
        console.log(pasos);
      })
      .catch((err) => {
        console.log(err);
      });
}

const algoritmoProfundidad = ()=>{
  setEstado(true)
  setNombreAlgoritmo("Profundidad")
  
  console.log("algoritmoAnchura")
  fetch("http://127.0.0.1:8000/puzzle-profundidad", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inicial: datosObjetivo(tableroInicial),
        objetivo: datosObjetivo(tableroEsperado)
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setProfundidadNodos(result["cantidad"]);
        setLongCaminoProfundidad(result["longitudSol"])
        pasos = result["movimientos"];
        console.log(aEstrellaNodos);
        console.log(anchuraNodos);
        console.log(profundidadNodos);
        console.log(pasos);
      })
      .catch((err) => {
        console.log(err);
      });
}

const leerArchivo = (e) => {
  alert("hola")
  const file = e.target.files[0];
  const reader = new FileReader();
  console.log(file)
  reader.readAsText(file);
  reader.onload = () => {
    //console.log(reader.result);
    leerXML(reader.result)
  }

  reader.onerror = () => {
    console.log(reader.result);
  }
}

const leerXML = (e) => {
  alert("hola")
  var xml = new XMLParser().parseFromString(e);
  var ya = xml.getElementsByTagName("Inicios")
  var nums = [];
  alert(ya[0].children.length)
  for (let index = 0; index < ya[0].children.length; index++) {
    console.log(ya[0].children[index].value)
    
  }
  //console.log(ya[0].children[0].value)
  //console.log(ya[0])

}

	return (
    <div className="row">
      <div className="col-md-3">

        <ButtonContainer>
                    <button type='button' className={styles.button} onClick={aprobarMatriz} > Aprobar </button>
                    
                  </ButtonContainer>
                 

        <ContentWrapper>
        
        <form>
        <p>estado inicial</p>
                      <input type="number" min="1" max="8" value={1} maxLength={1} className={styles.cell_inicial} onChange={(e)=>modificarMatrizInicial(0,e.target.value)} />
                      <input type="number" min="1" max="8" maxLength={1} className={styles.cell_inicial} onChange={(e)=>modificarMatrizInicial(1,e.target.value)} />
                      <input type="number" min="1" max="8" maxLength={1} className={styles.cell_inicial} onChange={(e)=>modificarMatrizInicial(2,e.target.value)} />
                      <br/>

                      <input type="number" min="1" max="8" maxLength={1} className={styles.cell_inicial} onChange={(e)=>modificarMatrizInicial(3,e.target.value)} />
                      <input type="number" min="1" max="8" maxLength={1} className={styles.cell_inicial} onChange={(e)=>modificarMatrizInicial(4,e.target.value)} />
                      <input type="number" min="1" max="8" maxLength={1} className={styles.cell_inicial} onChange={(e)=>modificarMatrizInicial(5,e.target.value)} />
                      <br/>

                      <input type="number" min="1" max="8" maxLength={1} className={styles.cell_inicial} onChange={(e)=>modificarMatrizInicial(6,e.target.value)} />
                      <input type="number" min="1" max="8" maxLength={1} className={styles.cell_inicial} onChange={(e)=>modificarMatrizInicial(7,e.target.value)}/>
                      <input type="number" min="1" max="8" className={styles.cell_inicial} onChange={(e)=>modificarMatrizInicial(8,e.target.value)}/>

                      <br />
              </form>
             </ContentWrapper>

            <br />
            <form>
              <p>estado esperado</p>
                      <input type="number" min="1" max="8" value="1" className={styles.cell_inicial} onChange={(e)=>modificarMatrizEsperado(0,e.target.value)}/>
                      <input type="number" min="1" max="8" value="2" className={styles.cell_inicial} onChange={(e)=>modificarMatrizEsperado(1,e.target.value)}/>
                      <input type="number" min="1" max="8" value="3" className={styles.cell_inicial} onChange={(e)=>modificarMatrizEsperado(2,e.target.value)}/>
                      <br/>

                      <input type="number" min="1" max="8" value="4" className={styles.cell_inicial} onChange={(e)=>modificarMatrizEsperado(3,e.target.value)}/>
                      <input type="number" min="1" max="8" value="5" className={styles.cell_inicial} onChange={(e)=>modificarMatrizEsperado(4,e.target.value)}/>
                      <input type="number" min="1" max="8" value="6" className={styles.cell_inicial} onChange={(e)=>modificarMatrizEsperado(5,e.target.value)}/>
                      <br/>

                      <input type="number" min="1" max="8" value="7" className={styles.cell_inicial} onChange={(e)=>modificarMatrizEsperado(6,e.target.value)}/>
                      <input type="number" min="1" max="8" value="8" className={styles.cell_inicial} onChange={(e)=>modificarMatrizEsperado(7,e.target.value)}/>
                      <input type="number" min="1" max="8" value="" className={styles.cell_inicial}  onChange={(e)=>modificarMatrizEsperado(8,e.target.value)}/>

                      <br />
              </form>
          

      </div>

      <div className="col-md-9">
      <div className="col-md-3">
  
      <input
                type="file"
                accept="application/xml"
                name="files"
                onChange={leerArchivo}
              />
      <button
                className="btn btn-primary"
                
              >
                Insertar Archivo
              </button>
                  
      </div>
        <AppWrapper>
        <ContentWrapper>
              <Content>
                <Ribbon>8-Puzzle</Ribbon>

                {
                  estadoEjecucion?
                  <Bars
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
                  
                  :<p>Algortimo {nombreAlgoritmo} en ejecución</p>
                }

                    <div className={styles.container}>
                      <div className={styles.col}>
                        <span className={styles.cell}>
                          {board[0][0]}
                        </span>
                        <span className={styles.cell}>
                          {board[0][1]}
                        </span>
                        <span className={styles.cell}>
                          {board[0][2]}
                        </span>
                      </div>
                      <div className={styles.col}>
                        <span className={styles.cell}>
                          {board[1][0]}
                        </span>
                        <span className={styles.cell}>
                          {board[1][1]}
                        </span>
                        <span className={styles.cell}>
                          {board[1][2]}
                        </span>
                      </div>
                      <div className={styles.col}>
                        <span className={styles.cell}>
                          {board[2][0]}
                        </span>
                        <span className={styles.cell}>
                          {board[2][1]}
                        </span>
                        <span className={styles.cell}>
                          {board[2][2]}
                        </span>
                      </div>
                    </div>
                 
                    {aprobacion?
                      <div>
                       <ButtonContainer>

                    <button type='button' className={styles.button} onClick={algoritmoEstrella} > A* </button>
                    <button type='button' className={styles.button} onClick={algoritmoAnchura}> Anchura </button>
                    <button type='button' className={styles.button} onClick={algoritmoProfundidad}> Profundidad </button>
                    <button type='button' className={styles.button} onClick={algoritmoPrimero}> Primero Mejor </button>
                    <button type='button' className={styles.button} > Costo Uniforme </button>
                  </ButtonContainer>
                  </div>
                  : <div><p>Presiona aprobar para verificar la validez de tus valores.</p></div>}

                </Content>
          </ContentWrapper>
        </AppWrapper>
      </div>

    </div>
    
      		
	)
}

export default Grid;