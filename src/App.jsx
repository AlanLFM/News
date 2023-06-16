import { useState } from 'react'
import NewsAPI from 'newsapi';
import axios from 'axios';
import * as XLSX from "xlsx"
import './App.css'

function App() {
  //const newsapi = new NewsAPI('2ada9e6628b64735a28b16ec9906ce2f');
  const [tema,setTema]=useState("")
  const [fecha,setFecha]=useState("")
  const Actual=new Date();
  const day = String(Actual.getDate()).padStart(2, '0');
const month = String(Actual.getMonth() + 1).padStart(2, '0'); // Enero es 0!
const year = Actual.getFullYear();

const maxDate = `${year}-${month}-${day}`;
  const mostrar=async(e)=>{
    console.log(fecha);
    console.log(tema);
    console.log(Actual);
    console.log(maxDate);
  }
  const Buscar=async(e)=>{
    e.preventDefault()
    axios.get(`https://newsapi.org/v2/everything?q=${tema}&apiKey=2ada9e6628b64735a28b16ec9906ce2f`,{
      params:{
          q:tema,
          apiKey:"2ada9e6628b64735a28b16ec9906ce2f",
          from:fecha,
          to:maxDate
          
      }
  }).then(response=>{
      console.log(response.data.articles)
      const data=response.data.articles
      const ws=XLSX.utils.json_to_sheet(data)
      const wb=XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb,ws,'Sheet1');
      XLSX.writeFile(wb,"output.xlsx")
  
  })
  .catch(err=>{
      console.log(err);
  })

  }

  return (
    <>
      <div>
        <h1>¿Qué noticias quiere consultar?</h1>
        Noticia: <input type="text" name="" id="" onChange={(e)=>setTema(e.target.value)}/>
        <br/>
        Desde: <input type="date" name="" id="date" max={maxDate} onChange={(e)=>setFecha(e.target.value)} />
        <button onClick={Buscar}>Buscar</button>
      </div>
    </>
  )
}

export default App
