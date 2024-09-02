import mongoose from "mongoose";
import Auditorios from "../models/Auditorios.js";

const regitrarAuditorio= async(req,res)=>{
    const {cedula}=req.body 
    if(Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos,debes llenar todos lo campos"})
    const verificarCedulaBDD=await Auditorios.findOne({cedula}) //Se realiza una consulta a la base de datos usando el modelo "Vehiculo" para verificar si existe un vehiculo con la misma placa
    if(verificarCedulaBDD) return res.status(404).json ({msg:"Lo sentimos el auditorio ya se encuentra registrado"}) //Verifica si ya existe un vehiculo con la misma placa en la BDD
    const nuevoAuditorio=new Auditorios(req.body)
    nuevoAuditorio.usuario=req.usuarioBDD._id
    await nuevoAuditorio.save() //Guarda un nuevo vehiculo con la base de datos
    res.status(200).json({msg:"Auditorio registrado con éxito"})  //Respuesta que indica exito
}
const listarAuditorio=async(req,res)=>{
    const auditorio=await Auditorios.find().select ("-createdAt -updatedAt -__v").populate('_id cedula nombre ubicacion capacidad descripcion')
    res.status(200).json(auditorio)
}
const detalleAuditorio= async(req,res)=>{
    const{id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:`Lo sentimos, no existe el auditorio ${id}`})
    const auditorio=await Auditorios.findById(id).select ("-createdAt -updatedAt -__v").populate('_id cedula nombre ubicacion capacidad descripcion') 
    res.status(200).json(auditorio)
        
    }
const actualizarAuditorio= async(req,res)=>{
    const{id}=req.params
    if(Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos todos los campos deben ser llenados"})
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({msg:`Lo sentimos, no existe el auditorio ${id}`}); 
    await Auditorios.findByIdAndUpdate(req.params.id,req.body)
    res.status(200).json({msg:"Actualización exitosa del auditorio"})
    
}

const eliminarAuditorio=async(req,res)=>{
    const{id}=req.params
    if(Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, todos los campos deben ser llenados"})
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:"Lo sentimos, no existe el auditorio"})
    await Auditorios.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:"El auditorio ha sido eliminado exitosamente"})    
     


}



export{
    regitrarAuditorio, // Exporta la funcion para que sea utilizada en otras partes de la aplicacion
    listarAuditorio,
    detalleAuditorio,
    actualizarAuditorio,
    eliminarAuditorio
} 