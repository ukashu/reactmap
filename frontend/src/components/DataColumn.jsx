import './Form.css'

function DataColumn(props) {
  //here you read data saved in storage TODO
  //and display it in the form TODO
  console.log(props)

  return (
    <div className="DataColumn">
      <div style={{display: "flex", justifyContent: "center", maxHeight: "35px"}}><p>{props.name.toUpperCase()}</p></div>
      <div>{(props.data.sections[0] && props.data.sections[0][props.display]) ? props.data.sections[0][props.display] : (props.data.sections[0] && props.data.constants[props.display] ? props.data.constants[props.display] : '')}</div>
      <div>{(props.data.sections[1] && props.data.sections[1][props.display]) ? props.data.sections[1][props.display] : (props.data.sections[1] && props.data.constants[props.display] ? props.data.constants[props.display] : '')}</div>
      <div>{(props.data.sections[2] && props.data.sections[2][props.display]) ? props.data.sections[2][props.display] : (props.data.sections[2] && props.data.constants[props.display] ? props.data.constants[props.display] : '')}</div>
      <div>{(props.data.sections[3] && props.data.sections[3][props.display]) ? props.data.sections[3][props.display] : (props.data.sections[3] && props.data.constants[props.display] ? props.data.constants[props.display] : '')}</div>
      <div>{(props.data.sections[4] && props.data.sections[4][props.display]) ? props.data.sections[4][props.display] : (props.data.sections[4] && props.data.constants[props.display] ? props.data.constants[props.display] : '')}</div>
      <div>{(props.data.sections[5] && props.data.sections[5][props.display]) ? props.data.sections[5][props.display] : (props.data.sections[5] && props.data.constants[props.display] ? props.data.constants[props.display] : '')}</div>
      <div>{(props.data.sections[6] && props.data.sections[6][props.display]) ? props.data.sections[6][props.display] : (props.data.sections[6] && props.data.constants[props.display] ? props.data.constants[props.display] : '')}</div>
      <div>{(props.data.sections[7] && props.data.sections[7][props.display]) ? props.data.sections[7][props.display] : (props.data.sections[7] && props.data.constants[props.display] ? props.data.constants[props.display] : '')}</div>
      <div>{(props.data.sections[8] && props.data.sections[8][props.display]) ? props.data.sections[8][props.display] : (props.data.sections[8] && props.data.constants[props.display] ? props.data.constants[props.display] : '')}</div>
      <div>{(props.data.sections[9] && props.data.sections[9][props.display]) ? props.data.sections[9][props.display] : (props.data.sections[9] && props.data.constants[props.display] ? props.data.constants[props.display] : '')}</div>
    </div>
  )
}

export default DataColumn