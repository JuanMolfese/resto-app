CREATE DATABASE IF NOT EXISTS order_manager;
use order_manager;

-- tables

-- Table: Cliente
CREATE TABLE Cliente (
    id int  NOT NULL AUTO_INCREMENT,
    domicilio varchar(150)  NOT NULL,
    telefono int  NOT NULL,
    nombre varchar(150)  NOT NULL,
    CONSTRAINT Cliente_pk PRIMARY KEY (id)
);

-- Table: Comercio
CREATE TABLE Comercio (
    id int  NOT NULL AUTO_INCREMENT,
    razon_social varchar(150)  NOT NULL,
    cuit bigint  NOT NULL,
    nombre_fantasia varchar(150)  NULL,
    logo varchar(250)  NOT NULL,
    CONSTRAINT Comercio_pk PRIMARY KEY (id)
);

-- Table: Estado_Pedido
CREATE TABLE Estado_Pedido (
    id int  NOT NULL AUTO_INCREMENT,
    descripcion varchar(50)  NOT NULL,
    orden INT NOT NULL UNIQUE,
    CONSTRAINT Estado_Pedido_pk PRIMARY KEY (id)
);

-- Table: Rubro
CREATE TABLE Rubro (
    id int  NOT NULL AUTO_INCREMENT,
    nombre varchar(50)  NOT NULL,
    CONSTRAINT Rubro_pk PRIMARY KEY (id)
);

-- Table: Status_Sucursal
CREATE TABLE Status_Sucursal (
    id int  NOT NULL AUTO_INCREMENT,
    nombre varchar(50)  NOT NULL,
    CONSTRAINT Status_Sucursal_pk PRIMARY KEY (id)
);

-- Table: Rol
CREATE TABLE Rol (
    id int  NOT NULL AUTO_INCREMENT,
    descripcion varchar(50) NOT NULL,
    CONSTRAINT Rol_pk PRIMARY KEY (id)
);

-- Table: Modo_Entrega
CREATE TABLE Modo_Entrega (
    id int  NOT NULL AUTO_INCREMENT,
    descripcion varchar(150)  NOT NULL,
    CONSTRAINT Modo_Entrega_pk PRIMARY KEY (id)
);

-- Table: Subrubro
CREATE TABLE Subrubro (
    id int  NOT NULL AUTO_INCREMENT,
    rubro_id int  NOT NULL,
    nombre varchar(50)  NOT NULL,
    CONSTRAINT Subrubro_pk PRIMARY KEY (id),
    CONSTRAINT foreign key (rubro_id) REFERENCES Rubro (id)
);

-- Table: Producto
CREATE TABLE Producto (
    id int  NOT NULL AUTO_INCREMENT,
    nombre varchar(50)  NOT NULL,
    descripcion varchar(150),
    subrubro_id int  NOT NULL,
    image varchar(255),
    CONSTRAINT Producto_pk PRIMARY KEY (id),
    CONSTRAINT foreign key (subrubro_id) REFERENCES Subrubro (id)
);

-- Table: Pedido
CREATE TABLE Pedido (
    id int  NOT NULL AUTO_INCREMENT,
    fecha_emision datetime  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    cliente_id int  NOT NULL DEFAULT 1,
    estado_pedido_id int  NOT NULL DEFAULT 1,
    fecha_finalizacion datetime,
    pago boolean  NOT NULL,
    modo_entrega_id int  NOT NULL,
    -- save products
    mp_id bigint,
    payer_first_name varchar(50), 
    payer_address varchar(150),
    total float NOT NULL,
    CONSTRAINT Pedido_pk PRIMARY KEY (id),
    CONSTRAINT foreign key (cliente_id) REFERENCES Cliente (id),
    CONSTRAINT foreign key (estado_pedido_id) REFERENCES Estado_Pedido (id),
    CONSTRAINT foreign key (modo_entrega_id) REFERENCES Modo_Entrega (id)
);

-- Table: Pedido_Productos
CREATE TABLE Pedido_Productos (
    pedido_id int  NOT NULL AUTO_INCREMENT,
    producto_id int  NOT NULL,
    cantidad int  NOT NULL,
    precio float(10,2)  NOT NULL,
    CONSTRAINT Pedido_Productos_pk PRIMARY KEY (pedido_id,producto_id),
    CONSTRAINT foreign key (pedido_id) REFERENCES Pedido (id),
    CONSTRAINT foreign key (producto_id) REFERENCES Producto (id)
);

-- Table: Usuario
CREATE  TABLE Usuario (
    id int  NOT NULL AUTO_INCREMENT,
    email varchar(150)  NOT NULL,
    pass varchar(150)  NOT NULL,
    nombre varchar(150)  NULL,
    apellido varchar(150)  NULL,
    rol_id int  NOT NULL DEFAULT 1,
    CONSTRAINT Usuario_pk PRIMARY KEY (id),
    CONSTRAINT foreign key (rol_id) REFERENCES Rol (id)
);

-- Table: Sucursal
CREATE TABLE Sucursal (
    id int  NOT NULL AUTO_INCREMENT,
    nombre varchar(150)  NOT NULL,
    domicilio_calle varchar(50)  NOT NULL,
    domicilio_nro int  NOT NULL,
    domicilio_piso varchar(50)  NULL,
    domicilio_dpto varchar(50)  NULL,
    telefono int  NOT NULL,
    status_sucursal_id int  NOT NULL,
    comercio_id int  NOT NULL,
    CONSTRAINT Sucursal_pk PRIMARY KEY (id),
    CONSTRAINT foreign key (status_sucursal_id) REFERENCES Status_Sucursal (id),
    CONSTRAINT foreign key (comercio_id) REFERENCES Comercio (id)
);

-- Table: Hist_Status_Sucursal
CREATE TABLE Hist_Status_Sucursal (
    id int  NOT NULL AUTO_INCREMENT,
    status_sucursal_id int  NOT NULL,
    sucursal_id int  NOT NULL,
    fecha datetime  NOT NULL,
    usuario_id int  NOT NULL,
    CONSTRAINT Hist_Status_Sucursal_pk PRIMARY KEY (id),
    CONSTRAINT foreign key (status_sucursal_id) REFERENCES Status_Sucursal (id),
    CONSTRAINT foreign key (sucursal_id) REFERENCES Sucursal (id),
    CONSTRAINT foreign key (usuario_id) REFERENCES Usuario (id)
);

-- Table: Sucursal_Productos
CREATE TABLE Sucursal_Productos (
    producto_id int  NOT NULL AUTO_INCREMENT,
    sucursal_id int  NOT NULL,
    stock int  NOT NULL DEFAULT 0,
    stock_minimo int NOT NULL DEFAULT 0,
    precio float(10,2)  NOT NULL DEFAULT 0,
    CONSTRAINT Sucursal_Productos_pk PRIMARY KEY (producto_id,sucursal_id),
    CONSTRAINT foreign key (producto_id) REFERENCES Producto (id),
    CONSTRAINT foreign key (sucursal_id) REFERENCES Sucursal (id)
);

-- Table: Historial_Producto
CREATE TABLE Historial_Producto (
    id int  NOT NULL AUTO_INCREMENT,
    fecha int  NOT NULL,
    precio int  NOT NULL,
    producto_id int  NOT NULL,
    sucursal_id int  NOT NULL,
    usuario_id int  NOT NULL,
    CONSTRAINT Historial_Producto_pk PRIMARY KEY (id),
    CONSTRAINT foreign key (producto_id,sucursal_id) REFERENCES Sucursal_Productos (producto_id,sucursal_id),
    CONSTRAINT foreign key (usuario_id) REFERENCES Usuario (id)
);


--- TRIGGERS ---

/* 
* Trigger que se ejecuta luego de la realización de un pedido
* Se encarga de actualizar el stock de los productos en la sucursal
 */
DELIMITER //
CREATE OR REPLACE TRIGGER update_stock
AFTER INSERT ON Pedido_Productos
FOR EACH ROW
BEGIN
    UPDATE Sucursal_Productos
    SET stock = stock - NEW.cantidad
    WHERE producto_id = NEW.producto_id AND sucursal_id = 1;
END;
//
DELIMITER ;