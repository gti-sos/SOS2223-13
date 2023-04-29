import {useState} from "react";
import axios from "axios";

function App() {

  const [datos,setDatos] = useState({
    usuario: "",
    clave: ""
  });

  const handleInputChange = (e) =>{
    let {name,value} = e.target;
    let newDatos = {...datos, [name]: value};
    setDatos(newDatos);
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(!e.target.checkValidity()){
      console.log("NO ENVIAR");

    }else{
      let res = await axios.post("http://localhost:3000/usuario/login",datos);
      console.log(res.data);
    }
  }; 


  return (
    <form onSubmit={handleSubmit}>
    <label>
      Usuario:
      <input type="text" onChange={handleInputChange} value={datos.usuario}/>
    </label>
    <label>
      Contraseña:
      <input type="password" onChange={handleInputChange} value={datos.clave} />
    </label>
    <button type="submit">Iniciar sesión</button>
  </form>
  );
}


export default App;
