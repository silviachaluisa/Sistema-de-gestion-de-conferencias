import request from "supertest"
import app from "../../src/server.js"
import { connection , desconnection } from "../../src/database.js";

beforeAll(async () => {
await connection();
});

//________________________________________________________________________________________________________

describe("POST api/login", () => {
    test("Debería responder con un código 200 y los datos son correctos", async () => {
        const loginData = {
            email: "silvia@gmail.com",
            password: "123"
        }
        const response = await request(app)
        .post("/api/login")
        .send(loginData) // Enviar datos con .send()
        .set('Accept', 'application/json'); // Asegurarse de que el servidor acepta JSON

        // Verificar que la respuesta sea exitosa
        expect(response.statusCode).toBe(200);
        // Verificar que el mensaje de éxito esté presente
        
        
    });

    test("Debería responder con un código 400 si faltan datos", async () => {
        const response = await request(app)
          .post("/api/login")
          .send({ email: "Silvia@gmail.com", password: "" }); // Faltando el campo password
    
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("msg","Lo sentimos, debes llenar todos los campos"); // Suponiendo que devuelves un error en el body
    });

    test("Debería responder con un código 404 si las credenciales son incorrectas", async () => {
        const response = await request(app)
          .post("/api/login")
          .send({ email: "Silvia@gmail.com", password: "contraseñaIncorrecta" });
    
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("msg","Contraseña Incorrecta");
    });
});

describe("POST api/registro", () => {
    test("Debería responder con un código 200 si los datos son correctos", async () => {
        const registerData = {
            nombre: "usuario1",
            apellido: "apellido1",
            email: "usuario1@gmail.com",
            password: "123Silvia",
        }

        const response = await request(app)
        .post("/api/registro")
        .send(registerData)
        .set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("msg","Usuario Registrado con Exito");
    });

    test("Debería responder con un código 400 si faltan datos", async () => {
        const response = await request(app)
          .post("/api/registro")
          .send({ nombre: "usuarioPrueba",apellido: "apellidoPrueba", email: "", password: ""});

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("msg","Lo sentimos, debes llenar todos los campos");
    });

    test("Debería responder con un código 400 si el email ya está registrado", async () => {
        const response = await request(app)
          .post("/api/registro")
          .send({ nombre: "usuario2",apellido: "apellidoPrueba", email: "Silvia@gmail.com", password: "alejo-P1" });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("msg", "Lo sentimos, el email ya se encuentra registrado");
    });

    // test("Debería responder con un código 400 si el nombre ya está registrado", async () => {
    //     const response = await request(app)
    //       .post("/api/registro")
    //       .send({ nombre: "usuario1",apellido: "apellidoPrueba", email: "usuario12@gmail.com", password: "alejo-P1" });
        
    //     expect(response.statusCode).toBe(400);
    //     expect(response.body).toHaveProperty("message", "Ese nombre de usuario ya se encuentra registrado en la base de datos");
    // });
});

// describe("POST api/recovery-password", () => {
//     test("Debería responder con un código 200 si el correo es correcto", async () => {
//         const recoveryData = {
//             email: "marcelo.pinzon@epn.edu.ec"
//         }

//         const response = await request(app)
//             .post("/api/recovery-password")
//             .send(recoveryData)
//             .set('Accept', 'application/json');

//         expect(response.statusCode).toBe(200);
//         expect(response.body).toHaveProperty("message", "Correo electrónico enviado correctamente");
//     });

//     test("Debería responder con un código 400 si el correo no está registrado", async () => {
//         const recoveryData = {
//             email: "usuario14@gmail.com"
//         }

//         const response = await request(app)
//             .post("/api/recovery-password")
//             .send(recoveryData)
//             .set('Accept', 'application/json');

//         expect(response.statusCode).toBe(400);
//         expect(response.body).toHaveProperty("message", "El usuario no se encuentra registrado en la base de datos");
//     });

//     test("Debería responder con un código 400 si faltan datos", async () => {
//         const recoveryData = {
//             email: ""
//         }

//         const response = await request(app)
//             .post("/api/recovery-password")
//             .send(recoveryData)
//             .set('Accept', 'application/json');

//         expect(response.statusCode).toBe(400);
//         expect(response.body).toHaveProperty("message", "Lo sentimos, debes llenar todos los campos");
//     });
// });

// describe("GET api/perfil", () => {
//     test("Debería responder con un código 200 si el token es correcto", async () => {
//         const credentials = {
//             email: "pinzonmarcelo759@gmail.com",
//             password: "alejoP"
//         }

//         const loginResponse = await request(app)
//             .post("/api/login")
//             .send(credentials)
//             .set('Accept', 'application/json');
        
//         const token = loginResponse.body.data.token;

//         const response = await request(app)
//             .get("/api/perfil")
//             .set('Authorization', `Bearer ${token}`)
//             .set('Accept', 'application/json');
        
//         expect(response.statusCode).toBe(200);
//         expect(response.body).toHaveProperty("message", "Perfil del usuario");
//     });

//     test("Debería responder con un código 401 si el token es incorrecto", async () => {
//         const response = await request(app)
//             .get("/api/perfil")
//             .set('Authorization', `Bearer tokenIncorrecto`)
//             .set('Accept', 'application/json');
        
//         expect(response.statusCode).toBe(401);
//         expect(response.body).toHaveProperty("message", "No estás autorizado para realizar esta acción");
//     });
// });
// Cerrar la conexión a la base de datos después de todas las pruebas
afterAll(async () => {
await desconnection();
});