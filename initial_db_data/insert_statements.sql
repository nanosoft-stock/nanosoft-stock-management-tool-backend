INSERT INTO warehouse_locations(warehouse_location_id, status, created_by) VALUES 
    ('PSEUDO', 'assigned', 1),
    ('DISPATCH', 'assigned', 1);

INSERT INTO containers(container_id, warehouse_location_fid, status, created_by) VALUES ('ST0000000', 1, 'printed', 1);
