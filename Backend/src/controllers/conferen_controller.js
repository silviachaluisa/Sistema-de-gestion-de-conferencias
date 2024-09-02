import mongoose from "mongoose";
import Conferencistas from "../models/Conferencistas.js";

const registroConferen = async(req,res)=>{
const {email} =req.body
if(Object.values(req.body).includes(""))return res.status(400).json ({msg: "Lo sentimos debes llenar todos los campos"})
const verificarEmailBDD=await Conferencistas.findOne({email})
if(verificarEmailBDD) return res.status(404).json ({msg:"Lo sentimos el email ya se encuentra registrado"})
const nuevoConferen = new Conferencistas (req.body)
nuevoConferen.usuario=req.usuarioBDD._id
await nuevoConferen.save()
res.status(200).json({msg:"Conferencista registrado con exito"})
    
}


const listarConferen = async (req,res)=>{
    const conferen= await Conferencistas.find().select ("-createdAt -updatedAt -__v").populate('_id nombre apellido')
    res.status(200).json(conferen)
}
const detalleConferen=async (req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:`Lo sentimos, no existe el conferencista ${id}`})
    const conferen = await Conferencistas.findById(id).select("-createdAt -updatedAt -__v").populate('_id nombre apellido')
    res.status(200).json(conferen)
}
const actualizarConferen = async(req,res)=>{ 
    const {id} = req.params
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos todos los campos deben ser llenados"})
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:`Lo sentimos, no existe el conferencista ${id}`}); 
    await Conferencistas.findByIdAndUpdate(req.params.id,req.body)
    res.status(200).json({msg:"Actualización exitosa del conferencista"})
}

const eliminarConferen = async(req,res)=>{
    const {id}=req.params
    if(Object.values(req.body).includes("")) return res.status(400).json({msg: "Lo sentimos, todos los campos  deben ser llenados"})
    if(!mongoose.Type.ObjectId.isValid(id)) return res.status(404).json({msg:`Lo sentimos, no existe ese Conferencista`}) 
    await Cliente.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:"Conferencista eliminado exitosamente"})

}

export{
    registroConferen,
    listarConferen,
    detalleConferen,
    actualizarConferen,
    eliminarConferen,
}