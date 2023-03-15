import './Form.css'
import DataColumn from './DataColumn'

function Page() {

  return (
  <div className="page">
      <div className="subpage">
          <h2>OPERACYJNY PLAN LOTU</h2>
          <div id="data-box" className="data-box">
            <div id="data" className="data"><p>data</p></div>
            <div id="lotnisko-odlotu" className="lotnisko-odlotu"><p>lotnisko-odlotu</p></div>
            <div id="lotnisko-docelowe" className="lotnisko-docelowe"><p>lotnisko-docelowe</p></div>
            <div id="typ-statku" className="typ-statku"><p>typ-statku</p></div>
            <div id="znaki-rejestracyjne" className="znaki-rejestracyjne"><p>znaki-rejestracyjne</p></div>
          </div>
          <div id="zgoda-1-box" className="zgoda-box">
            <div id="zgoda-odlot" className="zgoda-odlot"><p>ZGODA (ODLOT)</p></div>
            <div className="zgoda-container">
              <div id="kierunek-wiatru" className="kierunek-wiatru"><p>kierunek-wiatru</p></div>
              <div id="tas" className="tas"><p>tas</p></div>
              <div id="licznik" className="licznik"><p>licznik</p></div>
              <div id="start" className="start"><p>start</p></div>
            </div>
          </div>
          <div id="trasa-box" className="trasa-box">
            <div id="trasa" className="trasa">
              <div style={{height: "15px"}}><p>trasa</p></div>
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
            <DataColumn name="nkdg"></DataColumn>
            <DataColumn name="m"></DataColumn>
            <DataColumn name="nkdm"></DataColumn>
            <DataColumn name="kz"></DataColumn>
            <DataColumn name="km"></DataColumn>
            <DataColumn name="kb"></DataColumn>
            <DataColumn name="s"></DataColumn>
            <DataColumn name="w"></DataColumn>
            <DataColumn name="t"></DataColumn>
            <DataColumn name="eto"></DataColumn>
            <DataColumn name="ato"></DataColumn>
            <DataColumn name="5"></DataColumn>
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
                <div id="godzina-ladowania" className="godzina-ladowania"><p>godzina-ladowania</p></div>
                <div id="stan-licznika" className="stan-licznika"><p>stan-licznika</p></div>
                <p>LOGO</p>
              </div>
          </div>
      </div>    
  </div>
  )
}

export default Page