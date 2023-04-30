create or replace procedure show_history as
cursor c is select * from RENT;
rid integer;
u_id integer;
pid integer;
begin
open c;
loop
exit when c%notfound;
fetch c into rid,u_id,pid;
--sample features hai
select r.rid,u.uid, u.name, p.start_date, p.end_date, p.rent, p.bhk, p.floors 
FROM RENT r, USER u, PROPERTY p 
where u.uid=u_id AND p.pid = pid;
end loop;
close c;
end;
/
