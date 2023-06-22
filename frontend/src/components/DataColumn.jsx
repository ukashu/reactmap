import './Form.css'

function DataColumn(props) {
  //here you read data saved in storage TODO
  //and display it in the form TODO
  console.log(props)

  const generateRows = () => {
    let rows = []
    for (let i = 0; i < 10; i++) {
      rows.push(<div>{(props.data.sections[i] && props.data.sections[i][props.display]) ? props.data.sections[i][props.display] : (props.data.sections[i] && props.data.constants[props.display] ? props.data.constants[props.display] : '')}</div>)
    } 
    return rows
  }

  return (
    <div className="DataColumn">
      <div style={{display: "flex", justifyContent: "center", maxHeight: "35px"}}><p>{props.name.toUpperCase()}</p></div>
      {generateRows()}
    </div>
  )
}

export default DataColumn