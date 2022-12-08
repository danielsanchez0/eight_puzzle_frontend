import styles from "./TicTacToe.module.css";
import Ribbon from "./Ribbon"

import { useEffect, useState } from "react";

import styled from 'styled-components'
import {Col,Row} from "reactstrap"

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

const pasos = [
  "1,2,3,4,5,6,7,8",
  "1,2,3,4,5,6,7,9",
  "1,2,3,4,5,7,8,1",
]

const  Grid = ()=>{

  const [step,setStep] = useState(0)
  const [estado,setEstado] = useState(false)
  const [aprobacion,setAprobacion] = useState(false)
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);


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
      }
    }, 2500);

    return () => clearTimeout(timer);
  }
});


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
     alert("aprobada")
   }else{
     setAprobacion(false)
     alert("la matriz no cumple los requisitos")
   }
}

const algoritmoEstrella = ()=>{
  setEstado(true)
  console.log("algoritmoEstrella")
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
                      <input type="number" min="1" max="8" className={styles.cell_inicial} onChange={(e)=>modificarMatrizInicial(0,e.target.value)} />
                      <input type="number" min="1" max="8" className={styles.cell_inicial} onChange={(e)=>modificarMatrizInicial(1,e.target.value)} />
                      <input type="number" min="1" max="8" className={styles.cell_inicial} onChange={(e)=>modificarMatrizInicial(2,e.target.value)} />
                      <br/>

                      <input type="number" min="1" max="8" className={styles.cell_inicial} onChange={(e)=>modificarMatrizInicial(3,e.target.value)} />
                      <input type="number" min="1" max="8" className={styles.cell_inicial} onChange={(e)=>modificarMatrizInicial(4,e.target.value)} />
                      <input type="number" min="1" max="8" className={styles.cell_inicial} onChange={(e)=>modificarMatrizInicial(5,e.target.value)} />
                      <br/>

                      <input type="number" min="1" max="8" className={styles.cell_inicial} onChange={(e)=>modificarMatrizInicial(6,e.target.value)} />
                      <input type="number" min="1" max="8" className={styles.cell_inicial} onChange={(e)=>modificarMatrizInicial(7,e.target.value)}/>
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
        <AppWrapper>
        <ContentWrapper>
              <Content>
                <Ribbon>8-Puzzle</Ribbon>
                <p>Solved with the A-star Algorithm</p>
  

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
                    <button type='button' className={styles.button} > Anchura </button>
                    <button type='button' className={styles.button} > Profundidad </button>
                    <button type='button' className={styles.button} > Voraz </button>
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