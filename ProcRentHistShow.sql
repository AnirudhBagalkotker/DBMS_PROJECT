DELIMITER / /
create procedure show_history(pid in int) as

begin


select r.RID,r.Tenant, r.Property, rh.Start_date, rh.End_date, rh.rent, rh.Hike, rh.Commission 
FROM RENT r, RENT_HISTORY rh 
where r.RID = rh.RID AND r.Property = pid; 
-- added second condition

end // 
DELIMITER;
