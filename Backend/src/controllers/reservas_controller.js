import mongoose  from "mongoose";
import Reservas from "../models/Reservas.js";
import Auditorios from "../models/Auditorios.js";
import Conferencistas from "../models/Conferencistas.js";

// Registrar un nuevo vehículo
const registrarReserva = async (req, res) => {
    const { codigo, descripcion, auditorio, conferencista } = req.body;
  
    // Validar que todos los campos estén completos
    if(Object.values(req.body).includes("")) return res.status(404).json({msg:"Debes llenar todos los campos"})
  
    try {
      // Verificar si el cliente existe
      const conferencistaExiste = await Conferencistas.findById(conferencista);
      if (!conferencistaExiste) {
        return res.status(404).json({ msg: "Conferencista no encontrado" });
      }
  
      // Verificar si el vehículo existe
      const auditorioExiste = await Auditorios.findById(auditorio);
      if (!auditorioExiste) {
        return res.status(404).json({ msg: "Auditorio no encontrado" });
      }
  
      // Crear la nueva reserva
      const nuevaReserva = new Reservas({
        codigo,
        descripcion,
        conferencista: conferencistaExiste._id,
        auditorio: auditorioExiste._id,
      });
  
      await nuevaReserva.save();
  
      res.status(201).json({ msg: "Reserva creada exitosamente", reserva: nuevaReserva });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error al crear la reserva", error });
    }
  };
  

  const listarReservas = async (req, res) =>{
    try {
        const reservas =await Reservas.findOne().populate('conferencista auditorio');
        res.status(200).json(reservas)
    }catch(error){
        console.log(error);
        res.status(400).json({msg:"Error al listar las reservas"})
    }
  }

  const detalleReservas = async (req, res) => {
    const { id } = req.params;

    try {
        const reserva = await Reservas.findById(id).populate('conferencista auditorio');
        if (!reserva) {
            return res.status(404).json({ msg: "Reserva no encontrada" });
        }
        res.status(200).json(reserva);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener los detalles de la reserva", error });
    }
};
const actualizarReserva = async (req, res) => {
    const { id } = req.params;
    const {  codigo, descripcion, auditorio, conferencista } = req.body;

    try {
        // Validar que la reserva existe
        let reserva = await Reservas.findById(id);
        if (!reserva) {
            return res.status(404).json({ msg: "Reserva no encontrada" });
        }

        // Verificar si el cliente existe
        const conferencistaExiste = await Conferencistas.findById(conferencista);
        if (!conferencistaExiste) {
            return res.status(404).json({ msg: "Conferencista no encontrado" });
        }

        // Verificar si el vehículo existe
        const auditorioExiste = await Conferencistas.findById(conferencista);
        if (!auditorioExiste) {
            return res.status(404).json({ msg: "Auditorio no encontrada" });
        }

        // Actualizar la reserva
        reserva.codigo = codigo || reserva.codigo;
        reserva.descripcion = descripcion || reserva.descripcion;
        reserva.conferencista= conferencistaExiste._id;
        reserva.auditorio = auditorioExiste._id;

        const reservaActualizada = await reserva.save();
        res.status(200).json({ msg: "Reserva actualizada exitosamente", reserva: reservaActualizada });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar la reserva", error });
    }
};
const eliminarReserva = async (req, res) => {
    const { id } = req.params;

    try {
        const reserva = await Reservas.findById(id);
        if (!reserva) {
            return res.status(404).json({ msg: "Reserva no encontrada" });
        }

        await reserva.remove();
        res.status(200).json({ msg: "Reserva eliminada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar la reserva", error });
    }
};




export {
  registrarReserva,
  listarReservas,
  detalleReservas,
  actualizarReserva,
  eliminarReserva

};
