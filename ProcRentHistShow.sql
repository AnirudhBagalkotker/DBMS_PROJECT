DELIMITER / /
create procedure show_history as

begin

--sample features hai
select r.RID,r.Tenant, r.Property, rh.Start_date, rh.End_date, rh.rent, rh.Hike, rh.Commission 
FROM RENT r, RENT_HISTORY rh 
where r.RID = rh.RID

end // 
DELIMITER;
