import {Router} from 'express'
import verificarAutenticacion from '../middlewares/autenticacion.js'

const router=Router()

import{ 
    actualizarReserva,
    detalleReservas,
    eliminarReserva,
    listarReservas,
    registrarReserva

 }from "../controllers/reservas_controller.js";

router.post("/reserva/registro",verificarAutenticacion,registrarReserva)
router.get("/reservas",verificarAutenticacion,listarReservas)
router.get("/reserva/:id",verificarAutenticacion,detalleReservas)
router.put("/reserva/actualizar/:id",verificarAutenticacion,actualizarReserva)
router.delete("/reserva/eliminar/:id",verificarAutenticacion,eliminarReserva)



export default router