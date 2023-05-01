CREATE PROCEDURE delete_full_property(
in f_pid int(11),

)
BEGIN

DELETE from PROPERTY WHERE PID = f_pid;


END //
DELIMITER ;
