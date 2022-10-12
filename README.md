# EJERCICIO API NODEJS - POSTGRESQL

Api realizada con NodeJS y ExpressJS, como práctica para el bootcamp Full Stack Web Developer en The Bridge

Tecnologías utilizadas: 
- `express`
- `postgreSQL`
- `slonik`
- `jsonwebtoken`
- `cookie-parser`
- `dotenv` 
- `bcrypt`
- `jwt` 
- `nodemailer`
- `cloudinary`
- `multer`
- `nodemon`
- `docker`

## Ejercicio

Vamos a crear todo el flujo de autenticación y añadiremos la autorización a algunas rutas específicas del usuario

### Autenticación

1. Registro de usuario
  - Para el registro hará falta `email`, `username` y `password` 
  - Si alguno de los campos faltan, no se debe permitir el registro (crea un middleware para ello)
  - Si el `email` o `username` están en uso, no se debe permitir el registro
  -  Si todo ha ido bien, se devuelve una respuesta satisfactoria y se enviará un email de confirmacióin al usuario (recuerda que tienes que generar un token de confirmación, tanto para el correo como para la base de datos)
  -  Cuando el usuario acceda a su correo y haga click sobre el enlace, si todo ha ido bien, se cambiará el campo de la columna `active` a `true` y se eliminará el token de confirmación de la base de datos de ese usuario
  -  Tras el paso anterior, se volverá a enviar otro correo al usuario, con sus datos más básicos (email y username) en el contenido con algún mensaje confirmatorio de que ya puede acceder a la plataforma

2. Login (POST)
  -  Para hacer login se necesitará `email` o `username` indistintamente y `password`
  -  Si alguno de los campos faltan, no se debe permitir el acceso
  -  Si el usuario no existe, no se debe permitir el acceso
  -  Si todo ha ido bien, se devolverá algún dato básico del usuario (email, username) y se creará en la respuesta del back una cookie que contendrá un jwt con la información del usuario `email`, `username` y el valor del campo `active`

3. Logout (POST)
  -  Para hacer logout se necesitará enviar la cookie para poder eliminarla

4. Contraseña olvidada (POST)
  - No hará falta tener una cookie con jwt válido para esto
  - Para poder pedir una nueva contraseña por olvido de la anterior, necesitaremos que el usuario nos envíe el `email` o su `username`
  - Recibido el `email` o `username` y comprobado que existe, se le enviará un mail con una url y un token. Esta url no será igual que la de confirmación; esta url deberá lleva el token y el mail del usuario como query params.
    Ej: `http://localhost:3000/auth/password/request?token=123123&email=user@gmail.com`
  - La siguiente petición NO deberá ser un GET, con lo que no valdrá clickar en el enlace y ya (al menos no aún, cuando tengamos el front sí podremos hacerlo). La petición a través del endpoint enviado en el mail será un POST con la nueva contraseña
  - El back, el recurso al que vaya la url creada antes, deberá recibir la nueva contraseña en el `body` de la petición y el `email` y el `token` en `query`
  - Tras comprobar que el `token` y el `email` coinciden, guarda la nueva contraseña cifrándola antes

### Autorización

5. Ver la información de mi perfil (GET)
  - Para acceder a la información del perfil de usuario hará falta tener una cookie con el token jwt creado anteriormente.
  - Si no hay cookie o el token jwt no es correcto, el usuario no podrá acceder a la información de su perfil
  - Si el usuario no existe o hay algún problema obteniendo la información, se devolverá un error genérico al usuario
  - Si todo ha ido bien, se devolverá: `email`, `username`, `age`, `profile_pic`, `bio`


6. Actualizar contraseña (PATCH)
  - Sí, sé lo que estás pensando, ¿acaso no entraría dentro de actualizar el perfil? Sí y no, aunque forme parte del pefil, suele tratarse aparte.
  - Para poder actualizar la contraseña, hará falta tener la cookie con el token
  - El usuario deberá enviar su contraseña actual y la nueva contraseña para poder hacer el cambio
  - Antes de cambiar la vieja por la nueva, comprueba que a nueva coincide
  - No te olvides de cifrar la nueva antes de guardarla!

7. Desactivar la cuenta del usuario (PATCH)
  - Para poder actualizar la información del perfil del usuario hará falta tener una cookie con el token jwt creado anteriormente.
  - Si no hay cookie o el token jwt no es correcto, el usuario no podrá acceder a la información de su perfil
  - Cambia el campo `deleted` a `true`
  - Modifica también la lógica para que ninguno de los endpoints anteriormente creados pueda hacer nada como mostrar o actualizar información si el campo `deleted` del usuario es `true` (tampoco devolverás ninguna cookie) 

8. Activar la cuenta del usuario (PATCH)
  - Para poder actualizar la información del perfil del usuario hará falta tener una cookie con el token jwt creado anteriormente.
  - Si no hay cookie o el token jwt no es correcto, el usuario no podrá acceder a la información de su perfil
  - Cambia el campo `deleted` a `false`
  - Todos los recursos que antes no tenían acción ninguna por estar este campo a `false` vuelven a funcionar para el usuario dado

