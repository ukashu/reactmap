import '../App.css'

function Flight(props) {
  //here you read data saved in storage TODO
  //and display it in the form TODO
  

  return (
    <div onClick={props.setStored} className="Flight">
      <p>{props.name}, id: {props.id}</p>
      <p>{props.date}</p>
    </div>
  )
}

export default Flight