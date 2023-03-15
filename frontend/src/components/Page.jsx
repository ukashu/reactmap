import './Form.css'
import DataColumn from './DataColumn'
import { startTransition, useState } from 'react'

function Page() {
  const calcData = JSON.parse(localStorage.getItem('calculated-flight'))

  console.log(calcData)

  const [inputs, setInputs] = useState({
    data: '',
    'lotnisko-odlotu': '',
    'lotnisko-docelowe': '',
    'typ-statku': '',
    'znaki-rejestracyjne': '',
    'zgoda-odlot': '',
    licznik: '',
    start: '',
    'zgoda-dolot': '',
  })

  function handleInputs(evt) {
    evt.preventDefault()
    setInputs((prevState)=>{
      return {
        ...prevState,
        [evt.target.id]: evt.target.value
      }
    })
  }

  return (
  <div className="page">
      <div className="subpage">
          <h2>OPERACYJNY PLAN LOTU</h2>
          <div id="data-box" className="data-box">
            <div id="data" className="data"><p>DATA</p><textarea id="data"></textarea></div>
            <div id="lotnisko-odlotu" className="lotnisko-odlotu"><p>LOTNISKO ODLOTU</p><textarea id="lotnisko-odlotu"></textarea></div>
            <div id="lotnisko-docelowe" className="lotnisko-docelowe"><p>LOTNISKO DOCELOWE</p><textarea id="lotnisko-docelowe"></textarea></div>
            <div id="typ-statku" className="typ-statku"><p>TYP STATKU</p><textarea id="typ-statku"></textarea></div>
            <div id="znaki-rejestracyjne" className="znaki-rejestracyjne"><p>ZNAKI REJESTR.</p><textarea id="znaki-rejestracyjne"></textarea></div>
          </div>
          <div id="zgoda-1-box" className="zgoda-box">
            <div id="zgoda-odlot" className="zgoda-odlot"><p>ZGODA (ODLOT)</p><textarea id="zgoda-odlot"></textarea></div>
            <div className="zgoda-container">
              <div id="kierunek-wiatru" className="kierunek-wiatru"><p>KIERUNEK WIATRU</p><p style={{fontSize: "14px"}}>{calcData.constants.WTA}</p></div>
              <div id="tas" className="tas"><p>TAS</p><p id="tas" style={{fontSize: "14px"}}>{calcData.constants.TAS}</p></div>
              <div id="licznik" className="licznik"><p>LICZNIK</p><textarea id="licznik" style={{height: "19px"}}></textarea></div>
              <div id="start" className="start"><p>START</p><textarea id="start" style={{height: "19px"}}></textarea></div>
            </div>
          </div>
          <div id="trasa-box" className="trasa-box">
            <div id="trasa" className="trasa">
              <div style={{height: "15px"}}><p>TRASA</p></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <DataColumn name="nkdg" display="TT" data={calcData}></DataColumn>
            <DataColumn name="m" display="MD" data={calcData}></DataColumn>
            <DataColumn name="nkdm" display="MH" data={calcData}></DataColumn>
            <DataColumn name="kz" display="DA" data={calcData}></DataColumn>
            <DataColumn name="km" data={calcData}></DataColumn>
            <DataColumn name="kb" data={calcData}></DataColumn>
            <DataColumn name="s" data={calcData} display="S"></DataColumn>
            <DataColumn name="w" data={calcData}></DataColumn>
            <DataColumn name="t" data={calcData}></DataColumn>
            <DataColumn name="eto" data={calcData}></DataColumn>
            <DataColumn name="ato" data={calcData}></DataColumn>
            <DataColumn name="5'" data={calcData}></DataColumn>
          </div>
          <div id="zapas-1-box" className="zapas-box">
            <div style={{minWidth: "100px", borderLeft: "solid 1px black"}}><p>LOTN. ZAPAS. I</p></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div id="zapas-2-box" className="zapas-box">
            <div style={{minWidth: "100px", borderLeft: "solid 1px black"}}><p>LOTN. ZAPAS. II</p></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div id="zgoda-2-box" className="zgoda-box">
            <div id="zgoda-odlot" className="zgoda-odlot"><p>ZGODA (DOLOT)</p><textarea id="zgoda-dolot"></textarea></div>
            <div className="zgoda-container">
              <div id="godzina-ladowania" className="godzina-ladowania"><p>GODZ. LĄDOWANIA</p><textarea id="godzina-ladowania" style={{height: "19px"}}></textarea></div>
              <div id="stan-licznika" className="stan-licznika"><p>STAN LICZNIKA</p><textarea id="stan-licznika" style={{height: "19px"}}></textarea></div>
              <p>LOGO</p>
            </div>
          </div>
      </div>    
  </div>
  )
}

export default Page