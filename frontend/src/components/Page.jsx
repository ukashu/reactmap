import './Form.css'

function Page() {

  return (
  <div className="page">
      <div className="subpage">
          <p>OPERACYJNY PLAN LOTU</p>
          <div id="data-box" className="data-box">
            <div id="data" className="data"><p>data</p></div>
            <div id="lotnisko-odlotu" className="lotnisko-odlotu"><p>lotnisko-odlotu</p></div>
            <div id="lotnisko-docelowe" className="lotnisko-docelowe"><p>lotnisko-docelowe</p></div>
            <div id="typ-statku" className="typ-statku"><p>typ-statku</p></div>
            <div id="znaki-rejestracyjne" className="znaki-rejestracyjne"><p>znaki-rejestracyjne</p></div>
          </div>
          <div id="zgoda-1-box" className="zgoda-1-box">
            <div id="zgoda-odlot" className="zgoda-odlot"><p>ZGODA (ODLOT)</p></div>
            <div className="zgoda-1-container">
              <div id="kierunek-wiatru" className="kierunek-wiatru"><p>kierunek-wiatru</p></div>
              <div id="tas" className="tas"><p>tas</p></div>
              <div id="licznik" className="licznik"><p>licznik</p></div>
              <div id="start" className="start"><p>start</p></div>
            </div>
          </div>
          <div id="trasa-box" className="trasa-box"></div>
          <div id="zapas-1-box" className="zapas-1-box"></div>
          <div id="zapas-2-box" className="zapas-2-box"></div>
          <div id="zgoda-2-box" className="zgoda-2-box"></div>
      </div>    
  </div>
  )
}

export default Page