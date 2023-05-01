DELIMITER / /
create procedure check_status_available(pid in int) as
begin

select Available
from PROPERTY 
where PID=pid;

end // 
DELIMITER;
