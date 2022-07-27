use minegocio;
CREATE TABLE `app_menus` (
  `code` char(9) NOT NULL,
  `appCode` char(4) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1),',
  PRIMARY KEY (`code`),
  KEY `app_menus_fk_apps_idx` (`appCode`),
  CONSTRAINT `app_menus_fk_apps` FOREIGN KEY (`appCode`) REFERENCES `apps` (`code`)
)

delete from app_menus where 1=1;
delete from plans where 1=1;
delete from apps where 1=1;
delete from pay_mp_items where 1=1;

insert into apps(code, name, description) values 
('AWEB', 'AppeironWeb', 'Web powerede by appeiron'),
('ECOM', 'E-commerce', 'E-Commerce'),
('HUB', 'Hub', 'Appeiron Hub'),
('PAY', 'Pay', 'Appeiron Payments'),
('WWEB', 'Web', 'Web created using wordpress');

insert into app_menus(code, appCode, is_active) values 
('ANLT-AWEB', 'AWEB', 1),
('ANLT-ECOM', 'ECOM', 1),
('ANLT-HUB', 'HUB', 1),
('ANLT-WWEB', 'WWEB', 1),
('APRC-AWEB', 'AWEB', 1),
('APRC-ECOM', 'ECOM', 1),
('APRC-HUB', 'HUB', 1),
('APRC-PAY', 'PAY', 1),
('APRC-WWEB', 'WWEB', 1),
('CONF-AWEB', 'AWEB', 1),
('CONF-ECOM', 'ECOM', 1),
('CONF-HUB', 'HUB', 1),
('CONF-PAY', 'PAY', 1),
('CONF-WWEB', 'WWEB', 1),
('CONT-AWEB', 'AWEB', 1),
('CONT-ECOM', 'ECOM', 1),
('CONT-HUB', 'HUB', 1),
('CONT-PAY', 'PAY', 1),
('CONT-WWEB', 'WWEB', 1),
('DASH-PAY', 'PAY', 1),
('LPAY-PAY', 'PAY', 1),
('RPRT-PAY', 'PAY', 1);

insert into plans(name, description, appCode, monthlyPrice, annualPrice, isActive) values 
('basic', 'basic plan', 'ECOM', '0.00', NULL, 1),
('medium', 'medium plan', 'ECOM', '29.99', NULL, 1);

insert into pay_mp_items(title, currency_id, picture_url, description, category_id, quantity, unit_price, createdAt, mpPreferenceCode)
values ('Item1', 'PEN', NULL, 'Item 1 Description', 'category 1', 1, 19.99000, '2022-07-22 11:31:21', 'DFLT'),
      ('Item 2', 'PEN', NULL, 'Item 2 description', 'Custome', 1, 39.99000, '2022-07-27 15:38:25', 'DFLT');
