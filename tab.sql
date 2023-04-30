Create Database PRA;
use PRA;

DROP TABLE IF EXISTS `ADDRESS`;
CREATE TABLE `ADDRESS` (
  `AID` int(11) NOT NULL AUTO_INCREMENT,
  `Door` varchar(40) NOT NULL,
  `Street` varchar(100) NOT NULL,
  `city` varchar(50) NOT NULL,
  `pin` int(6) NOT NULL,
  `state` varchar(50) NOT NULL,
  PRIMARY KEY (`AID`)
);

DROP TABLE IF EXISTS `ROLE`;
CREATE TABLE `ROLE` (
  `RoleId` int(11) NOT NULL,
  `RoleName` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`RoleId`)
);

DROP TABLE IF EXISTS `USER`;
CREATE TABLE `USER` (
  `UID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `password` varchar(60) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `address` int(11) DEFAULT NULL,
  `role` int(11) NOT NULL,
  `aadhar` bigint(12) DEFAULT NULL,
  PRIMARY KEY (`UID`),
  KEY `role` (`role`),
  CONSTRAINT `USER_ibfk_1` FOREIGN KEY (`role`) REFERENCES `ROLE` (`RoleId`)
);

INSERT INTO `ROLE`
VALUES (0, 'DBA'),
  (1, 'MANAGER'),
  (2, 'OWNER'),
  (3, 'TENANT');
  
CREATE TABLE `PHONE` (
  `Phone` int(11) NOT NULL,
  `UID` int(11) NOT NULL
);

DELIMITER //
create procedure add_full_user (
	in f_name varchar(100),
    in f_password varchar(100),
    in f_age int(11),
    in f_door varchar(40),
    in f_street varchar(100),
    in f_city varchar(50),
    in f_pin int(6),
    in f_state varchar(50),
    in f_role int(11),
    in f_aadhar bigint(12),
    in f_phone int(11)
)
BEGIN
DECLARE MyAdd int(11);
DECLARE Myuid int(11);
insert into ADDRESS (Door, Street, city, pin, state) 
values (f_door, f_street, f_city, f_pin, f_state);

select a.AID into MyAdd from ADDRESS a 
where a.Door = f_door
and a.Street = f_street
and a.city = f_city
and a.pin = f_pin
and a.state = f_state;

insert into USER (name, password, age, address, role, aadhar) 
values (f_name, f_password, f_age, MyAdd, f_role, f_aadhar);

select UID into Myuid from USER u 
where u.address = MyAdd;

insert into PHONE (Phone, UID) 
values (f_phone, Myuid);

END //
DELIMITER ;

CREATE TABLE `PROPERTY` (
  `PID` int(11) NOT NULL AUTO_INCREMENT,
  `Owner_UID` int(11) NOT NULL,
  `Available` int(1) NOT NULL,
  `facilities` varchar(150) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `rent` int(11) NOT NULL,
  `hike` int(11) NOT NULL,
  `area` int(11) NOT NULL,
  `plinth` int(11) NOT NULL,
  `construction` date NOT NULL,
  `floors` int(11) NOT NULL,
  `Type` int(11) NOT NULL,
  `bhk` int(11) DEFAULT NULL,
  `Address` int(11) NOT NULL,
  PRIMARY KEY (`PID`)
);

CREATE TABLE `RENT` (
  `RID` int(11) NOT NULL AUTO_INCREMENT,
  `Tenant` int(11) NOT NULL,
  `Property` int(11) NOT NULL,
  PRIMARY KEY (`RID`)
);

CREATE TABLE `RENT_HISTORY` (
  `RID` int(11) NOT NULL,
  `Start_date` date NOT NULL,
  `End_date` date NOT NULL,
  `rent` int(11) NOT NULL,
  `Hike` int(11) NOT NULL,
  `Commission` int(11) NOT NULL,
  PRIMARY KEY (`RID`),
  CONSTRAINT FK_RID FOREIGN KEY (RID) REFERENCES RENT(RID)
);

ALTER TABLE PROPERTY
ADD CONSTRAINT FK_UID FOREIGN KEY(Owner_UID) REFERENCES USER(UID);

ALTER TABLE RENT
ADD CONSTRAINT FK_RENT_UID FOREIGN KEY(Tenant) REFERENCES USER(UID);

ALTER TABLE RENT
ADD CONSTRAINT FK_RENT_PID FOREIGN KEY(Property) REFERENCES PROPERTY(PID);

DELIMITER //
CREATE PROCEDURE add_full_property(
in f_uid int(11),
in f_avail int(1),
in f_fac varchar(150),
in st_date date,
in en_date date, 
in f_rent int(11),
in f_hike int(11),
in f_area int(11),
in f_plinth int(11),
in f_construction date,
in f_floors int(11),
in f_type int(11),
in f_bhk int(11),
in f_door varchar(40),
in f_street varchar(100),
in f_city varchar(50),
in f_pin int(6),
in f_state varchar(50)
)
BEGIN
DECLARE MyAdd INT(11);
insert into ADDRESS (Door, Street, city, pin, state) 
values (f_door, f_street, f_city, f_pin, f_state);

select a.AID into MyAdd from ADDRESS a 
where a.Door = f_door
and a.Street = f_street
and a.city = f_city
and a.pin = f_pin
and a.state = f_state;

INSERT INTO PROPERTY (Owner_UID, Available, facilities, start_date, end_date, rent, hike, area, plinth, construction, floors, Type, bhk, Address)
VALUES (f_uid, f_avail, f_fac, st_date, en_date, f_rent, f_hike, f_area, f_plinth, f_construction, f_floors, f_type, f_bhk, MyAdd);
END //
DELIMITER ;

-- select * from USER;
call add_full_user('DBA', 'root', 22, '103', 'Pandit Wari', 'Dehradun', 110076, 'Uttrakhand', 0, 276381853, 38913672);
call add_full_user('Anirudh', 'Anirudh123', 18, '204', 'Moksha', 'Mohali', 140507, 'Punjab', 1, 12345678, 87800665);
call add_full_property(1, 1, 'Swimming Pool', '2023-05-01', '2024-01-23', 20000, 20, 1500, 1324, '2021-09-06', 3, 0, 3, 'lala', 'Lalu Nagar', 'Hyderabad', 432111, 'Telangana');
-- select * from ADDRESS;

ALTER TABLE RENT 
ADD COLUMN date_issued date;

ALTER TABLE RENT 
MODIFY COLUMN date_issued datetime;

ALTER TABLE RENT
MODIFY date_issued date NOT NULL;

drop procedure add_rental;
DELIMITER //
CREATE PROCEDURE add_rental(
in f_uid int(11),
in f_pid int(11),
in f_com int(11)
)
BEGIN
DECLARE Myrid int(11);
DECLARE Mrent int(11);
DECLARE Mhike int(11);
DECLARE st_date date;
DECLARE en_date date;
DECLARE Mav int(1);
DECLARE Mdt datetime;

select p.Available into Mav from PROPERTY p
where p.PID = f_pid;

IF(Mav = 1) THEN
SET Mdt = current_timestamp();

INSERT INTO RENT (Tenant, Property, date_issued)
VALUES (f_uid, f_pid, Mdt);

SELECT (AUTO_INCREMENT -1) INTO Myrid
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = "PRA"
AND TABLE_NAME = "RENT";

select p.rent into Mrent from PROPERTY p
WHERE p.PID = f_pid;

select p.hike into Mhike from PROPERTY p
WHERE p.PID = f_pid;

select p.start_date, p.end_date into st_date, en_date from PROPERTY p
WHERE p.PID = f_pid;

INSERT INTO RENT_HISTORY (RID, Start_date, End_date, rent, hike, Commission) 
values(Myrid, st_date, en_date, Mrent, Mhike, f_com);

END IF;
END //
DELIMITER ;


drop trigger avail_con;
DELIMITER //
CREATE TRIGGER avail_con 
AFTER INSERT ON RENT FOR EACH ROW
BEGIN
DECLARE Mypid int(11);
SET Mypid = new.Property;

UPDATE PROPERTY p
SET p.Available = 0
WHERE Mypid = p.PID;

END //
DELIMITER ;

-- select * from user;
-- select * from property;

call add_rental(2, 1, 15);
-- select * from rent;
-- select * from rent_history;
-- truncate table rent;

-- update property p
-- set p.available = 1
-- where p.pid = 1;
