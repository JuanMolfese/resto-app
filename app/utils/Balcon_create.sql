
CREATE DATABASE order_manager;
use order_manager;

-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2024-01-30 21:44:24.715

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
    descripcion varchar(150)  NOT NULL UNIQUE,
    orden INT NOT NULL UNIQUE,
    CONSTRAINT Estado_Pedido_pk PRIMARY KEY (id)
);

-- Table: Hist_Status_Sucursal
CREATE TABLE Hist_Status_Sucursal (
    id int  NOT NULL AUTO_INCREMENT,
    status_sucursal_id int  NOT NULL,
    sucursal_id int  NOT NULL,
    fecha datetime  NOT NULL,
    usuario_id int  NOT NULL,
    CONSTRAINT Hist_Status_Sucursal_pk PRIMARY KEY (id)
);

-- Table: Historial_Producto
CREATE TABLE Historial_Producto (
    id int  NOT NULL AUTO_INCREMENT,
    fecha int  NOT NULL,
    precio int  NOT NULL,
    producto_id int  NOT NULL,
    sucursal_id int  NOT NULL,
    usuario_id int  NOT NULL,
    CONSTRAINT Historial_Producto_pk PRIMARY KEY (id)
);

-- Table: Modo_Entrega
CREATE TABLE Modo_Entrega (
    id int  NOT NULL AUTO_INCREMENT,
    descripcion varchar(150)  NOT NULL,
    CONSTRAINT Modo_Entrega_pk PRIMARY KEY (id)
);

-- Table: Pedido
CREATE TABLE Pedido (
    id int  NOT NULL AUTO_INCREMENT,
    fecha_emision datetime  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    cliente_id int  NOT NULL,
    estado_pedido_id int  NOT NULL DEFAULT 1,
    fecha_finalizacion int  NULL,
    pago bool  NOT NULL,
    modo_entrega_id int  NOT NULL,
    CONSTRAINT Pedido_pk PRIMARY KEY (id)
);

-- Table: Pedido_Productos
CREATE TABLE Pedido_Productos (
    pedido_id int  NOT NULL AUTO_INCREMENT,
    producto_id int  NOT NULL,
    cantidad int  NOT NULL,
    CONSTRAINT Pedido_Productos_pk PRIMARY KEY (pedido_id,producto_id)
);

-- Table: Producto
CREATE TABLE Producto (
    id int  NOT NULL AUTO_INCREMENT,
    nombre varchar(50)  NOT NULL,
    descripcion varchar(150),
    subrubro_id int  NOT NULL,
    image VARCHAR(250),
    CONSTRAINT Producto_pk PRIMARY KEY (id)
);

-- Table: Rol
CREATE TABLE Rol (
    id int  NOT NULL AUTO_INCREMENT,
    descripcion varchar(50) NOT NULL,
    CONSTRAINT Rol_pk PRIMARY KEY (id)
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
    nombre varchar(150)  NOT NULL,
    CONSTRAINT Status_Sucursal_pk PRIMARY KEY (id)
);

-- Table: Subrubro
CREATE TABLE Subrubro (
    id int  NOT NULL AUTO_INCREMENT,
    rubro_id int  NOT NULL,
    nombre varchar(50)  NOT NULL,
    CONSTRAINT Subrubro_pk PRIMARY KEY (id)
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
    CONSTRAINT Sucursal_pk PRIMARY KEY (id)
);

-- Table: Sucursal_Productos
CREATE TABLE Sucursal_Productos (
    producto_id int  NOT NULL AUTO_INCREMENT,
    sucursal_id int  NOT NULL,
    stock int  NOT NULL DEFAULT 0,
    stock_minimo int NOT NULL DEFAULT 0,
    precio float(10,2)  NOT NULL DEFAULT 0,
    CONSTRAINT Sucursal_Productos_pk PRIMARY KEY (producto_id,sucursal_id)
);

-- Table: Usuario
CREATE TABLE Usuario (
    id int  NOT NULL AUTO_INCREMENT,
    email varchar(150)  NOT NULL,
    pass varchar(150)  NOT NULL,
    nombre varchar(150)  NULL,
    apellido varchar(150)  NULL,
    rol_id int  NOT NULL,
    CONSTRAINT Usuario_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: Hist_Status_Sucursal_Status_Sucursal (table: Hist_Status_Sucursal)
ALTER TABLE Hist_Status_Sucursal ADD CONSTRAINT Hist_Status_Sucursal_Status_Sucursal FOREIGN KEY Hist_Status_Sucursal_Status_Sucursal (status_sucursal_id)
    REFERENCES Status_Sucursal (id);

-- Reference: Hist_Status_Sucursal_Sucursal (table: Hist_Status_Sucursal)
ALTER TABLE Hist_Status_Sucursal ADD CONSTRAINT Hist_Status_Sucursal_Sucursal FOREIGN KEY Hist_Status_Sucursal_Sucursal (sucursal_id)
    REFERENCES Sucursal (id);

-- Reference: Hist_Status_Sucursal_Usuario (table: Hist_Status_Sucursal)
ALTER TABLE Hist_Status_Sucursal ADD CONSTRAINT Hist_Status_Sucursal_Usuario FOREIGN KEY Hist_Status_Sucursal_Usuario (usuario_id)
    REFERENCES Usuario (id);

-- Reference: Historial_Producto_Sucursal_Productos (table: Historial_Producto)
ALTER TABLE Historial_Producto ADD CONSTRAINT Historial_Producto_Sucursal_Productos FOREIGN KEY Historial_Producto_Sucursal_Productos (producto_id,sucursal_id)
    REFERENCES Sucursal_Productos (producto_id,sucursal_id);

-- Reference: Historial_Producto_Usuario (table: Historial_Producto)
ALTER TABLE Historial_Producto ADD CONSTRAINT Historial_Producto_Usuario FOREIGN KEY Historial_Producto_Usuario (usuario_id)
    REFERENCES Usuario (id);

-- Reference: Pedido_Cliente (table: Pedido)
ALTER TABLE Pedido ADD CONSTRAINT Pedido_Cliente FOREIGN KEY Pedido_Cliente (cliente_id)
    REFERENCES Cliente (id);

-- Reference: Pedido_Estado_Pedido (table: Pedido)
ALTER TABLE Pedido ADD CONSTRAINT Pedido_Estado_Pedido FOREIGN KEY Pedido_Estado_Pedido (estado_pedido_id)
    REFERENCES Estado_Pedido (id);

-- Reference: Pedido_Modo_Entrega (table: Pedido)
ALTER TABLE Pedido ADD CONSTRAINT Pedido_Modo_Entrega FOREIGN KEY Pedido_Modo_Entrega (modo_entrega_id)
    REFERENCES Modo_Entrega (id);

-- Reference: Pedido_Productos_Pedido (table: Pedido_Productos)
ALTER TABLE Pedido_Productos ADD CONSTRAINT Pedido_Productos_Pedido FOREIGN KEY Pedido_Productos_Pedido (pedido_id)
    REFERENCES Pedido (id);

-- Reference: Pedido_Productos_Producto (table: Pedido_Productos)
ALTER TABLE Pedido_Productos ADD CONSTRAINT Pedido_Productos_Producto FOREIGN KEY Pedido_Productos_Producto (producto_id)
    REFERENCES Producto (id);

-- Reference: Producto_Subrubro (table: Producto)
ALTER TABLE Producto ADD CONSTRAINT Producto_Subrubro FOREIGN KEY Producto_Subrubro (subrubro_id)
    REFERENCES Subrubro (id);

-- Reference: Subrubro_Rubro (table: Subrubro)
ALTER TABLE Subrubro ADD CONSTRAINT Subrubro_Rubro FOREIGN KEY Subrubro_Rubro (rubro_id)
    REFERENCES Rubro (id);

-- Reference: Sucursal_Comercio (table: Sucursal)
ALTER TABLE Sucursal ADD CONSTRAINT Sucursal_Comercio FOREIGN KEY Sucursal_Comercio (comercio_id)
    REFERENCES Comercio (id);

-- Reference: Sucursal_Productos_Producto (table: Sucursal_Productos)
ALTER TABLE Sucursal_Productos ADD CONSTRAINT Sucursal_Productos_Producto FOREIGN KEY Sucursal_Productos_Producto (producto_id)
    REFERENCES Producto (id);

-- Reference: Sucursal_Productos_Sucursal (table: Sucursal_Productos)
ALTER TABLE Sucursal_Productos ADD CONSTRAINT Sucursal_Productos_Sucursal FOREIGN KEY Sucursal_Productos_Sucursal (sucursal_id)
    REFERENCES Sucursal (id);

-- Reference: Sucursal_Status_Sucursal (table: Sucursal)
ALTER TABLE Sucursal ADD CONSTRAINT Sucursal_Status_Sucursal FOREIGN KEY Sucursal_Status_Sucursal (status_sucursal_id)
    REFERENCES Status_Sucursal (id);

-- Reference: Usuario_Rol (table: Usuario)
ALTER TABLE Usuario ADD CONSTRAINT Usuario_Rol FOREIGN KEY Usuario_Rol (rol_id)
    REFERENCES Rol (id);

-- End of file.