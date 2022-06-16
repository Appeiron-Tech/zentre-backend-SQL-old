use minegocio;
DROP TABLE IF EXISTS orderitems;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS labels;

CREATE TABLE `order_status` (
  `code` varchar(8) NOT NULL,
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`code`)
);

CREATE TABLE `payment_status` (
  `code` varchar(8) NOT NULL, 
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`code`)
);

CREATE TABLE `delivery_status` (
  `code` varchar(8) NOT NULL, 
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`code`)
);

CREATE TABLE `payment_methods` (
  `code` varchar(8) NOT NULL,
  `name` varchar(32) NOT NULL,
  `type` varchar(8) NOT NULL,
  `planId` int NOT NULL,
  KEY `paymentMethods_fk_plan_idx` (`planId`),
  CONSTRAINT `paymentMethods_fk_plan_idx` FOREIGN KEY (`planId`) REFERENCES `plans` (`id`),
  PRIMARY KEY (`code`)
);


insert into order_status(code, name) values 
('PENDING', 'pending'),
('CONFIRMD','confirmado'),
('COMPLETD','completed'),
('CANCELLD','cancelled');

insert into payment_status(code, name) values 
('UNPAID', 'unpaid'),
('FAILED','failed'),
('EXPIRED','expired'),
('PAID','paid'),
('REFUNDNG','refunding'),
('REFUNDED','refunded');

insert into delivery_status(code, name) values 
('UNFULFED', 'unfulfilled'),
('SHIPPING', 'shipping'),
('SHIPPED', 'shipped'),
('ARRIVED', 'arrived'),
('COLLECTD', 'collected'),
('RETURNIG', 'returning'),
('RETURNED', 'returned');

insert into payment_methods(code, name, type, planId) values 
('TRANS', 'transferencia', 'DELIVERY', 2),
('CASH','cash', 'DELIVERY', 1),
('CARD','card', 'DELIVERY', 2),
('COD_MSTR','pos mastercard', 'DELIVERY', 1),
('COD_VISA','pos visa', 'DELIVERY', 1),
('YAPE','yape', 'DELIVERY', 2),
('COD_YAPE','yape', 'DELIVERY', 1),
('P_TRANS', 'transferencia', 'PICKUP', 2),
('ONSTORE','on store', 'PICKUP', 1),
('P_CARD','card', 'PICKUP', 2),
('P_YAPE','yape', 'PICKUP', 2);