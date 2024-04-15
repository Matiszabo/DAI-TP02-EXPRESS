import express from "express";//hacer npm i express 
import cors from "cors"; //hacer npm i cors 
import {sumar, multiplicar, resta, dividir} from "./modules/matematica.js";
import {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID} from "./modules/omdb-wrapper.js"
import res, { send } from "express/lib/response.js";
const app =express(); 
const port=3000; //El puerto 3000(http://localhost:3000) 
//AgregolosMiddlewares 
app.use(cors()); //Middleware de CORS 
app.use(express.json()); //Middleware para parsear y comprender JSON

//Aca pongo todos los EndPoints

app.get('/',(req,res)=>{ //EndPoint"/" 
    res.send('Ya estoy respondiendo!'); 
}) 
app.get("/saludar/:nombre", (req, res) => {
    let nombre = req.params.nombre;
    let resultado = "Hola " + nombre;
    res.status(200).send(resultado);
});

app.get("/validarfecha/:ano/:mes/:dia", (req, res) => {
    let ano = req.params.ano;
    let mes = req.params.mes;
    let dia = req.params.dia;
  
    let fecha = `${ano}-${mes}-${dia}`;
    let fechaNumero = null;
  
    fechaNumero = Date.parse(fecha);
    if(!isNaN(fechaNumero)){
        res.status(200);
    } else{
        res.status(400);
    }
    res.send(fechaNumero.toString());
  });

 // matematica
  
app.get("/matematica/sumar", (req, res) => {
    let num1 = parseInt(req.query.num1);
    let num2 = parseInt(req.query.num2);
    let resultado= sumar(num1,num2);
    res.status(200).send(resultado.toString());
});

app.get("/matematica/restar", (req, res) => {
    let num1 = parseInt(req.query.num1);
    let num2 = parseInt(req.query.num2);
    let resultado= resta(num1,num2);
    res.status(200).send(resultado.toString());
});

app.get("/matematica/multiplicar", (req, res) => {
    let num1 = parseInt(req.query.num1);
    let num2 = parseInt(req.query.num2);
    let resultado= multiplicar(num1,num2);
    res.status(200).send(resultado.toString());
});

app.get("/matematica/dividir", (req, res) => {
    let num1 = parseInt(req.query.num1);
    let num2 = parseInt(req.query.num2);
    let resultado= dividir(num1,num2);
    res.status(200).send(resultado.toString());  
});

//omdb wrapper
app.get('/omdb/searchbypage',async(req,res) => {
    let search = req.query.search;
    let p = req.query.p;

    let returnStatus = 400;
    let returnResult = [];

    try {
        returnResult = await OMDBSearchByPage(search, p);
        returnStatus = 200;
    } catch (error){
        console.log(error.message);
    }
    res.status(returnStatus).send(returnResult);
});

app.get('/omdb/searchcomplete',async(req,res) => {
    let search = req.query.search;
    let returnStatus = 400;
    let returnResult = [];
    try{
        returnResult = await OMDBSearchComplete(search);
        returnStatus(200);
    }catch(error){
        console.log(error.message)
    }
    res.status(returnStatus).send(returnResult);
});

app.get('/omdb/getbyomdbid',async(req,res)=>{
    let imdbID = req.query.imdbID;
    console.log('imdbID ', imdbID);
    let returnStatus = 400;
    let returnResult = [];

    try{
        returnResult = await OMDBGetByImdbID(imdbID);
        returnResult = 200;
    
    }catch (error) {
        console.log(error.message)
    }
    res.status(returnStatus).send(returnResult)
});
//Inicio el Server y lo pongo a escuchar.
app.listen(port,()=>{ console.log(`Example app listening on port ${port}`) 
})