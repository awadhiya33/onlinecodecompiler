
import Axios from 'axios';
import './App.css';
import React, {useState} from 'react';


function App() {
const [code, setCode] = useState('');
const [output, setOutput]= useState('');

const handleSubmit= async ()=>{
const payload = {
    language: "CPP",
    code,
  };
try{
const {data}= await Axios.post("http://localhost:5000/run", payload);
setOutput(data.output);
} catch(err){
  console.log(err.response);
}
}

  return (
    <div>
      <h1>Rabbit</h1>
      <h2>Online Code Compiler</h2>
      <textarea rows="20" cols="75" value={code} onChange={(e)=>{setCode(e.target.value)}} ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <p>{output}</p>
    </div>
  );
}

export default App;
