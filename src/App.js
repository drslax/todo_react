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
  backgroundColor: checked ? 'salmon' : 'aliceblue',
  color: checked ? 'white' : 'black'
});

function TodoElems({list, handleRemove, handleCheck}){
  return (
    <ul>
      {list.map((item, key) => (
          <li key={key} id={key}>
            <div onClick={()=>handleCheck(key)} className={'listElem'} style={checkedStyle(item.checked)} >
              <p>{item.message}</p>
              <button onClick={ (e)=>handleRemove(key, e) }>X</button>
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

    setList(newList);
    setMessage('');
    localStorage.setItem('list', JSON.stringify(newList));
  }

  function handleRemove(id, e) {
    const newList = list.filter((item) => list.indexOf(item) !== id);
    localStorage.setItem('list', JSON.stringify(newList));
    
    e.stopPropagation();
    setList(newList);
  }

  function handleCheck(id) {
    const newList = list;

    newList[id].checked = !newList[id].checked;
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