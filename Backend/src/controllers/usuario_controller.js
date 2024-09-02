import Usuario from "../models/Usuario.js"
import generarJWT from "../helpers/crearJWT.js"
import mongoose from "mongoose";

const login = async (req,res)=>{
    const{email,password} = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const usuarioBDD = await Usuario.findOne({email}).select("-status -__v -token -updatedAt -createdAt")
    if(!usuarioBDD) return res.status(400).json({msg:"Usuario no se encuentra en la base de datos"} )
    const verificarPassword = await usuarioBDD.matchPassword(password)
    if(!verificarPassword) return res.status(404).json({msg:"Contraseña Incorrecta"})
    //Generar Token    
    const token = generarJWT(usuarioBDD._id,"Usuario")    
    const{nombre,apellido,_id}=usuarioBDD
    res.status(200).json({
        msg:"Usuario logeado correctamente",
        token,
        nombre,
        apellido,
        _id,

        email:usuarioBDD.email
    })
}
const registro= async (req,res)=>{
    const {email,password} = req.body 
    if(Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const verificarEmailBDD = await Usuario.findOne({email}) 
    if(verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
    const nuevoUsuario = new Usuario(req.body)  
    nuevoUsuario.password = await nuevoUsuario.encrypPassword(password) // Antes de guardar un nuevo usuario en la base de datos, su contraseña es convertida en un en caractareses encriptados
    await nuevoUsuario.save()
    res.status(200).json({msg:"Usuario Registrado con Exito"})
}

const detalleUsuario = async (req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:`Lo sentimos, debe ser un id válido`});
    const usuarioBDD = await Usuario.findById(id).select("-password")
    if(!usuarioBDD) return res.status(404).json({msg:`Lo sentimos, no existe el usuario ${id}`})
    res.status(200).json({msg:usuarioBDD}) 
}

const perfil = (req,res)=>{
    delete req.usuarioBDD.token
    delete req.usuarioBDD.createdAt
    delete req.usuarioBDD.updatedAt
    delete req.usuarioBDD.__v
    res.status(200).json(req.usuarioBDD)
}

export{
    login,
    registro,
    detalleUsuario,
    perfil
}