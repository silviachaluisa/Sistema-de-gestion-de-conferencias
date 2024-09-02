import { Router } from "express";
import verificarAutenticacion from "../middlewares/autenticacion.js";

import { 
    actualizarAuditorio,
    detalleAuditorio,
    eliminarAuditorio,
    listarAuditorio,
    regitrarAuditorio 
} from "../controllers/auditorios_controller.js";

const router=Router()


router.post("/auditorio/registro",verificarAutenticacion,regitrarAuditorio);
router.get("/auditorios",verificarAutenticacion,listarAuditorio);
router.get("/auditorio/:id",verificarAutenticacion,detalleAuditorio);
router.put("/auditorio/actualizar/:id",verificarAutenticacion,actualizarAuditorio);
router.delete("/auditorio/eliminar/:id",verificarAutenticacion,eliminarAuditorio);


export default router