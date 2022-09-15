### https://adrian-airbnb-clone.onrender.com/


# Rutas

- /api/v1/users
- /api/v1/users/:id
- /api/v1/users/me
- /api/v1/auth/login
- /api/v1/auth/register
- /api/v1/auth/password-recovery
- /api/v1/auth/verify-account

- /api/v1/users
--GET 

- /api/v1/users/:id
-- GET 
--PUT (ADMIN)
--DELETE (ADMIN)

- /api/v1/users/me
--GET 
--PUT 
--DELETE
-PATCH

- /api/v1/auth/login
-- POST

- /api/v1/auth/register
--POST

- /api/v1/auth/password-recovery
--POST
--PATCH


# Paths de mi usuario a traves de mi aplicacion

[*] registrar
[*] loggear

### Usuario sin sesion iniciada

1. ver los lugares
2. puede ver la informacion de un lugar

### Guest

1. ver los lugares
2. puede ver la informacion de un lugar
3. Reservar
4. Cancela reservaciones
4. Dar un score una vez finalizada la reservacion


### HOST

1. ver los lugares
2. puede ver la informacion de un lugar
3. Reservar
4. Cancela reservaciones
5. Dar un score una vez finalizada la reservacion
6. crear lugares
7. Cancelar reservaciones en los lugares donde es host
8. Puede ver perfiles de usuarios
9. Puede ver todos los luares que les pertenecen
10. Editar el lugar
11. eliminar el lugar

### Admin 

1. ver los lugares
2. puede ver la informacion de un lugar
3. Reservar
4. Dar un score una vez finalizada la reservacion
5. Puede ver perfiles de usuarios
6. Editar el lugar
7. eliminar el lugar
8. modificar roles
9. eleiminar un usuario
10.modificar un usuario
11. ver los lugares de los hosts


### Accommodations


/api/v1/accommodations

/
-- GET ✔️
-- POST ✔️

/:id

-- GET ✔️
-- DELETE ✔️
-- PUT ✔️
-- PATCH ✔️

/:id/available/?arrival=value&departure=value

/api/v1/accommodations/id/make-reservation

-- POST ✔️

-- GET

### Places

/
-- GET ✔️
-- POST ✔️

/:id

-- PATCH ✔️
-- PUT ✔️
-- GET ✔️
--DELETE ✔️



### Reservations

/api/v1/accommodations/:id_accommodations/make-reservation
-- POST✔️


/
-- GET ✔️

/:id 
-- GET ✔️
-- PATCH (CANCELAR LA RESERVACION O CAMBIAR LAS FECHAS) ✔️

### Users

/me/reservations
-- GET
-- PATCH (CANCELAR A RESERVACION)