CREATE PROCEDURE update_full_property(
in f_pid int(11),
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
)
BEGIN

update PROPERTY set Available = f_avail where PID=f_pid;
update PROPERTY set facilities = f_fac where PID=f_pid;
update PROPERTY set start_date = st_date where PID=f_pid;
update PROPERTY set end_date = en_date where PID=f_pid;
update PROPERTY set rent = f_rent where PID=f_pid;
update PROPERTY set hike = f_hike where PID=f_pid;
update PROPERTY set area = f_area where PID=f_pid;
update PROPERTY set plinth = f_plinth where PID=f_pid;
update PROPERTY set construction = f_construction where PID=f_pid;
update PROPERTY set floors = f_floors where PID=f_pid;
update PROPERTY set Type = f_type where PID=f_pid;
update PROPERTY set bhk = f_bhk where PID=f_pid;


END //
DELIMITER ;
