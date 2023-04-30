create or replace procedure rental(uid in int, pid in int) as
rid integer;
st date;
en date;
ren date;
hik integer;
comm integer;
avail integer;

begin
select Available into avail from property where PID=pid;

if avail=1 then
insert into rent values(uid,pid);
select RID into rid from rent where UID=uid AND PID=pid;
select start_date into st from property where PID=pid;
select end_date into en from property where PID=pid;
select hike into hik from property where PID=pid;
select commission into comm from property where PID=pid;
update table property set Available = 0 where PID=pid; 
insert into RENT_HISTORY values(rid,st,en,ren,hik,comm);
end if;


end;
/
