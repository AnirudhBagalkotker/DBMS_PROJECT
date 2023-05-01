-- CREATE TRIGGER trg_Property_Insert
-- ON PROPERTY
-- FOR INSERT
-- AS
-- BEGIN
--     -- Check if the person who added the property is a tenant
--     IF EXISTS (
--         SELECT *
--         FROM INSERTED i
--         JOIN ROLE r ON i.Owner_UID = r.RoleId
--         WHERE r.RoleId = 3
--     )
--     BEGIN
--         -- Update the person's role to owner
--         UPDATE PROPERTY
--         SET OwnerId = 2
--         WHERE PID = (
--             SELECT PID
--             FROM INSERTED
--         )
--     END
-- END

DROP TRIGGER trg_Property_Insert;
DELIMITER //
CREATE TRIGGER trg_Property_Insert AFTER INSERT 
ON PROPERTY FOR EACH ROW
BEGIN
    DECLARE Myrole int(11);
    select role into Myrole from USER u where new.Owner_UID = u.UID;
    IF(Myrole = 3)
    THEN
    UPDATE USER u 
    SET u.role = 2
    WHERE u.UID = new.Owner_UID;
    END IF;
END //
DELIMITER ;
