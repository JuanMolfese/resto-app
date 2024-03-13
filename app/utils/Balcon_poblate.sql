INSERT INTO `Comercio` (`id`, `razon_social`, `cuit`, `nombre_fantasia`, `logo`) VALUES ('1', 'Pablo S.A.', '2021655655', 'El Balcon', '');
INSERT INTO `Modo_Entrega` (`id`, `descripcion`) VALUES ('1', 'A domicilio'), ('2', 'En local');
INSERT INTO `Rubro` (`id`, `nombre`) VALUES ('1', 'Pasteleria'), ('2', 'Brunch');
INSERT INTO `Subrubro` (`id`, `rubro_id`, `nombre`) VALUES ('1', '1', 'Churro'), ('2', '1', 'Dona');
INSERT INTO `Producto` (`id`, `nombre`, `subrubro_id`) VALUES ('1', 'Dona Oreo', '2'), ('2', 'Dona Especial', '2');
INSERT INTO `Producto` (`id`, `nombre`, `subrubro_id`) VALUES ('3', 'Churro c/ DL', '1'), ('4', 'Churro bañado', '1');
INSERT INTO `Producto` (`id`, `nombre`, `subrubro_id`) VALUES ('5', 'Dona Oreo', '2'), ('6', 'Dona Especial', '2');
INSERT INTO `Producto` (`id`, `nombre`, `subrubro_id`) VALUES ('7', 'Crudo y Rucula', '3');
INSERT INTO `Rol` (`id`, `descripcion`) VALUES ('1', 'Super Admin'), ('2', 'Admin'), ('3', 'Employee');
INSERT INTO `Status_Sucursal` (`id`, `nombre`) VALUES ('1', 'Abierta'), ('2', 'Cerrada');
INSERT INTO `Sucursal` (`id`, `nombre`, `domicilio_calle`, `domicilio_nro`, `domicilio_piso`, `domicilio_dpto`, `telefono`, `status_sucursal_id`, `comercio_id`) VALUES ('1', 'Balcon Central', 'Chababuco', '128', NULL, NULL, '525256', '2', '1');
INSERT INTO `Usuario` (`id`, `email`, `pass`, `nombre`, `apellido`, `rol_id`) VALUES ('1', 'fedecrespi@gmail.com', '12345678', 'Federico', 'Crespi', '1'), ('2', 'pablo@balcon.com.ar', '12345678', 'Pablo', 'Lezcano', '2');
INSERT INTO `Usuario` (`id`, `email`, `pass`, `nombre`, `apellido`, `rol_id`) VALUES ('3', 'empleado1@balcon.com.ar', '12345678', 'Epleado', 'Uno', '3');

INSERT INTO `Sucursal_productos` (`producto_id`, `sucursal_id`, `stock`, `precio`) VALUES ('1', '1', 999, 50), ('2', '1', 1, 50), ('3', '1', 2, 50), ('4', '1', 4, 50), ('5', '1', 5, 50), ('6', '1', 6, 50), ('7', '1', 7, 50);