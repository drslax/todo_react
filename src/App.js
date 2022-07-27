import {useState} from 'react';
import './App.css'

function TodoBar({message, handleChange, handleAdd}){
  return (
    <div>
      <input
        type="text"
        id="message"
        name="message"
        onChange={handleChange}
        value={message}
      />
      <button onClick={handleAdd}>+</button>
    </div>
  )
}

const checkedStyle = (checked) => ({
  backgroundColor: (!checked) ? `aliceblue` : `rgb(73, 73, 73)`,
});

function TodoElems({list, handleRemove, handleCheck}){
  return (
    <ul>
      {list.map((item, key) => (
          <li key={key} id={key}>
            <div className={'listElem'} style={checkedStyle(list[key].checked)} >
              <p>{item.message}</p>
              <button onClick={ ()=>handleRemove(key) }>X</button>
            </div>
          </li>
      ))}
    </ul>
  )
}

function get_local(){
  if (localStorage.getItem("list") != null) {
    return (JSON.parse(localStorage.getItem('list')));
  }
  else{
    return ([]);
  }
}

function TodoList(){
  const [message, setMessage] = useState('')
  const [list, setList] = useState(get_local());

  const handleChange = event => {
    setMessage(event.target.value)
  }

  function handleAdd() {
    const newList = list.concat({ message:message, checked:false });
    console.log(newList)

    setList(newList);
    setMessage('');
    localStorage.setItem('list', JSON.stringify(newList));
  }

  function handleRemove(id) {
    const newList = list.filter((item) => list.indexOf(item) !== id);
    console.log(newList)
    
    setList(newList);
    localStorage.setItem('list', JSON.stringify(newList));
  }

  function handleCheck(key) {
    const newList = list;

    newList[key].checked = !newList[key].checked;

    setList(newList);
  }

  return(
    <div>
      <TodoBar message={ message } handleChange={ handleChange } handleAdd={ handleAdd }/>
      <TodoElems list={ list } handleRemove={ handleRemove } handleCheck={handleCheck}/>
    </div>
  )
}

export default function App() {
  let date = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  return(
    <div id='bd'>
      <h1>{days[date.getDay()]}</h1>
      <TodoList/>
    </div>
  )
}