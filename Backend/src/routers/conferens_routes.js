import {Router} from 'express'
import verificarAutenticacion from '../middlewares/autenticacion.js';
const router=Router()


import { 
    actualizarConferen,
    detalleConferen,
    eliminarConferen,
    listarConferen,
    registroConferen
} from '../controllers/conferen_controller.js';


router.post("/conferen/registro",verificarAutenticacion,registroConferen);
router.get("/conferen",verificarAutenticacion,listarConferen);
router.get("/conferen/:id",verificarAutenticacion,detalleConferen);
router.put("/conferen/actualizar/:id",verificarAutenticacion,actualizarConferen);
router.delete("/conferen/eliminar/:id",verificarAutenticacion,eliminarConferen);

export default router