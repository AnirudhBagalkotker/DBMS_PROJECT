CREATE TRIGGER trg_Property_Insert
ON PROPERTY
FOR INSERT
AS
BEGIN
    -- Check if the person who added the property is a tenant
    IF EXISTS (
        SELECT *
        FROM INSERTED i
        JOIN ROLE r ON i.Owner_UID = r.RoleId
        WHERE r.RoleId = 3
    )
    BEGIN
        -- Update the person's role to owner
        UPDATE PROPERTY
        SET OwnerId = 2
        WHERE PID = (
            SELECT PID
            FROM INSERTED
        )
    END
END
