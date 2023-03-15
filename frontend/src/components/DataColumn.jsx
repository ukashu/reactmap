import './Form.css'

function DataColumn(props) {
  //here you read data saved in storage TODO
  //and display it in the form TODO
  

  return (
    <div className="DataColumn">
      <div STYLE={{display: "flex", alignItems: "center"}}><p>{props.name.toUpperCase()}</p></div>
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
  )
}

export default DataColumn