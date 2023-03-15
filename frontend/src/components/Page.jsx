import './Form.css'
import DataColumn from './DataColumn'

function Page() {

  return (
  <div className="page">
      <div className="subpage">
          <h2>OPERACYJNY PLAN LOTU</h2>
          <div id="data-box" className="data-box">
            <div id="data" className="data"><p>DATA</p></div>
            <div id="lotnisko-odlotu" className="lotnisko-odlotu"><p>LOTNISKO ODLOTU</p></div>
            <div id="lotnisko-docelowe" className="lotnisko-docelowe"><p>LOTNISKO DOCELOWE</p></div>
            <div id="typ-statku" className="typ-statku"><p>TYP STATKU</p></div>
            <div id="znaki-rejestracyjne" className="znaki-rejestracyjne"><p>ZNAKI REJESTR.</p></div>
          </div>
          <div id="zgoda-1-box" className="zgoda-box">
            <div id="zgoda-odlot"><p>ZGODA (ODLOT)</p></div>
            <div className="zgoda-container">
              <div id="kierunek-wiatru" className="kierunek-wiatru"><p>KIERUNEK WIATRU</p></div>
              <div id="tas" className="tas"><p>TAS</p></div>
              <div id="licznik" className="licznik"><p>LICZNIK</p></div>
              <div id="start" className="start"><p>START</p></div>
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
            <DataColumn name="nkdg" display="TT"></DataColumn>
            <DataColumn name="m" display="MD"></DataColumn>
            <DataColumn name="nkdm" display="MH"></DataColumn>
            <DataColumn name="kz" display="DA"></DataColumn>
            <DataColumn name="km"></DataColumn>
            <DataColumn name="kb"></DataColumn>
            <DataColumn name="s"></DataColumn>
            <DataColumn name="w"></DataColumn>
            <DataColumn name="t"></DataColumn>
            <DataColumn name="eto"></DataColumn>
            <DataColumn name="ato"></DataColumn>
            <DataColumn name="5'"></DataColumn>
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
          </div>
          <div id="zgoda-2-box" className="zgoda-box">
            <div id="zgoda-odlot" className="zgoda-odlot"><p>ZGODA (DOLOT)</p></div>
              <div className="zgoda-container">
                <div id="godzina-ladowania" className="godzina-ladowania"><p>GODZ. LĄDOWANIA</p></div>
                <div id="stan-licznika" className="stan-licznika"><p>STAN LICZNIKA</p></div>
                <p>LOGO</p>
              </div>
          </div>
      </div>    
  </div>
  )
}

export default Page