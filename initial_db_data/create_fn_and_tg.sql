CREATE OR REPLACE FUNCTION fn_users_notify_event() RETURNS trigger AS $$
    DECLARE
        payload JSON;
    BEGIN
        IF TG_OP = 'DELETE' THEN
            payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', row_to_json(OLD)
            );
        ELSE
            payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', row_to_json(NEW)
            );
        END IF;
        PERFORM pg_notify(CAST('table_update' AS TEXT), payload::TEXT);

        RETURN NEW;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_users_update
    AFTER INSERT OR UPDATE OR DELETE
    ON users
    FOR EACH ROW
        EXECUTE PROCEDURE fn_users_notify_event();


-------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION fn_categories_notify_event() RETURNS trigger AS $$
    DECLARE
        payload JSON;
    BEGIN
        IF TG_OP = 'DELETE' THEN
            payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', row_to_json(OLD)
            );
        ELSE
            payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', row_to_json(NEW)
            );
        END IF;
        PERFORM pg_notify(CAST('table_update' AS TEXT), payload::TEXT);

        RETURN NEW;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_categories_update
    AFTER INSERT OR UPDATE OR DELETE
    ON categories
    FOR EACH ROW
        EXECUTE PROCEDURE fn_categories_notify_event();


-------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION fn_warehouse_locations_notify_event() RETURNS trigger AS $$
    DECLARE
        payload JSON;
    BEGIN
        IF TG_OP = 'DELETE' THEN
            payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', row_to_json(OLD)
            );
        ELSE
            payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', row_to_json(NEW)
            );
        END IF;
        PERFORM pg_notify(CAST('table_update' AS TEXT), payload::TEXT);

        RETURN NEW;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_warehouse_locations_update
    AFTER INSERT OR UPDATE OR DELETE
    ON warehouse_locations
    FOR EACH ROW
        EXECUTE PROCEDURE fn_warehouse_locations_notify_event();


-------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION fn_containers_notify_event() RETURNS trigger AS $$
    DECLARE
        payload JSON;
    BEGIN
        IF TG_OP = 'DELETE' THEN
            payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', row_to_json(OLD)
            );
        ELSE
            payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', row_to_json(NEW)
            );
        END IF;
        PERFORM pg_notify(CAST('table_update' AS TEXT), payload::TEXT);

        RETURN NEW;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_containers_update
    AFTER INSERT OR UPDATE OR DELETE
    ON containers
    FOR EACH ROW
        EXECUTE PROCEDURE fn_containers_notify_event();


-------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION fn_items_notify_event() RETURNS trigger AS $$
    DECLARE
        payload JSON;
    BEGIN
        IF TG_OP = 'DELETE' THEN
            payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', row_to_json(OLD)
            );
        ELSE
            payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', row_to_json(NEW)
            );
        END IF;
        PERFORM pg_notify(CAST('table_update' AS TEXT), payload::TEXT);

        RETURN NEW;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_items_update
    AFTER INSERT OR UPDATE OR DELETE
    ON items
    FOR EACH ROW
        EXECUTE PROCEDURE fn_items_notify_event();


-------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION fn_fields_notify_event() RETURNS trigger AS $$
    DECLARE
        payload JSON;
    BEGIN
        IF TG_OP = 'DELETE' THEN
            payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', row_to_json(OLD)
            );
        ELSE
            payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', row_to_json(NEW)
            );
        END IF;
        PERFORM pg_notify(CAST('table_update' AS TEXT), payload::TEXT);

        RETURN NEW;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_fields_update
    AFTER INSERT OR UPDATE OR DELETE
    ON fields
    FOR EACH ROW
        EXECUTE PROCEDURE fn_fields_notify_event();


-------------------------------------------------------------------------------


-- CREATE OR REPLACE FUNCTION fn_skus_notify_event() RETURNS trigger AS $$
--     DECLARE
--         payload JSON;
--     BEGIN
--         IF TG_OP = 'DELETE' THEN
--             payload = json_build_object(
--                 'table', TG_TABLE_NAME,
--                 'operation', TG_OP,
--                 'data', row_to_json(OLD)
--             );
--         ELSE
--             payload = json_build_object(
--                 'table', TG_TABLE_NAME,
--                 'operation', TG_OP,
--                 'data', row_to_json(NEW)
--             );
--         END IF;
--         PERFORM pg_notify(CAST('table_update' AS TEXT), payload::TEXT);

--         RETURN NEW;
--     END
--     $$ LANGUAGE plpgsql;


-- CREATE OR REPLACE TRIGGER tg_skus_update
--     AFTER INSERT OR UPDATE OR DELETE
--     ON skus
--     FOR EACH ROW
--         EXECUTE PROCEDURE fn_skus_notify_event();


-------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION fn_stocks_notify_event() RETURNS trigger AS $$
    DECLARE
        payload JSON;
    BEGIN
        IF TG_OP = 'DELETE' THEN
            payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', row_to_json(OLD)
            );
        ELSE
            payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', row_to_json(NEW)
            );
        END IF;
        PERFORM pg_notify(CAST('table_update' AS TEXT), payload::TEXT);

        RETURN NEW;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_stocks_update
    AFTER INSERT OR UPDATE OR DELETE
    ON stocks
    FOR EACH ROW
        EXECUTE PROCEDURE fn_stocks_notify_event();


-------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION fn_docking_station_specifications_notify_event() RETURNS trigger AS $$
    DECLARE
        payload JSON;
    BEGIN
        IF TG_OP = 'DELETE' THEN
            payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', row_to_json(OLD)
            );
        ELSE
            payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', row_to_json(NEW)
            );
        END IF;
        PERFORM pg_notify(CAST('table_update' AS TEXT), payload::TEXT);

        RETURN NEW;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_docking_station_specifications_update
    AFTER INSERT OR UPDATE OR DELETE
    ON docking_station_specifications
    FOR EACH ROW
        EXECUTE PROCEDURE fn_docking_station_specifications_notify_event();


-------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION fn_laptop_specifications_notify_event() RETURNS trigger AS $$
    DECLARE
        payload JSON;
    BEGIN
        IF TG_OP = 'DELETE' THEN
            payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', row_to_json(OLD)
            );
        ELSE
            payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', row_to_json(NEW)
            );
        END IF;
        PERFORM pg_notify(CAST('table_update' AS TEXT), payload::TEXT);

        RETURN NEW;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_laptop_specifications_update
    AFTER INSERT OR UPDATE OR DELETE
    ON laptop_specifications
    FOR EACH ROW
        EXECUTE PROCEDURE fn_laptop_specifications_notify_event();


-------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION fn_tft_specifications_notify_event() RETURNS trigger AS $$
    DECLARE
        payload JSON;
    BEGIN
        IF TG_OP = 'DELETE' THEN
            payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', row_to_json(OLD)
            );
        ELSE
            payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', row_to_json(NEW)
            );
        END IF;
        PERFORM pg_notify(CAST('table_update' AS TEXT), payload::TEXT);

        RETURN NEW;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_tft_specifications_update
    AFTER INSERT OR UPDATE OR DELETE
    ON tft_specifications
    FOR EACH ROW
        EXECUTE PROCEDURE fn_tft_specifications_notify_event();


-------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION fn_stock_location_history_notify_event() RETURNS trigger AS $$
    DECLARE
        payload JSON;
    BEGIN
        IF TG_OP = 'DELETE' THEN
            payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', row_to_json(OLD)
            );
        ELSE
            payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', row_to_json(NEW)
            );
        END IF;
        PERFORM pg_notify(CAST('table_update' AS TEXT), payload::TEXT);

        RETURN NEW;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_stock_location_history_update
    AFTER INSERT OR UPDATE OR DELETE
    ON stock_location_history
    FOR EACH ROW
        EXECUTE PROCEDURE fn_stock_location_history_notify_event();


-------------------------------------------------------------------------------


-- Generating new Item IDs
CREATE SEQUENCE IF NOT EXISTS sq_generate_item_ids
    AS INT
    INCREMENT BY 1
    MINVALUE 10000001
    MAXVALUE 99999999;


CREATE OR REPLACE FUNCTION fn_generate_item_ids(INT) RETURNS TABLE (
    item_id VARCHAR(10)
) AS $$
    DECLARE
        item_ids VARCHAR(10)[] := ARRAY[]::VARCHAR(10)[];
        row RECORD;
    BEGIN
        FOR row IN 
            SELECT 
                nextval('sq_generate_item_ids')::VARCHAR(10) AS item_id 
            FROM 
                generate_series(1, $1)
        LOOP
            INSERT INTO items (item_id, status) VALUES (row.item_id, 'chosen');
            item_ids := item_ids || row.item_id;
        END LOOP;

        RETURN QUERY 
            SELECT unnest(item_ids) AS item_id;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION fn_delete_item_ids(VARCHAR, VARCHAR) RETURNS VOID
AS $$
    DECLARE
        last_gen_item_id VARCHAR(10);
    BEGIN
        SELECT 
            last_value::VARCHAR(10) INTO last_gen_item_id
        FROM
            sq_generate_item_ids;

        IF 
            last_gen_item_id = $2
        THEN
            PERFORM setval('sq_generate_item_ids', $1::INT - 1, true);
            DELETE FROM items WHERE item_id >= $1 AND item_id <= $2;
        ELSE
            UPDATE items SET status = 'unused' WHERE item_id >= $1 AND item_id <= $2;
        END IF;
    END;
    $$ LANGUAGE plpgsql;


-------------------------------------------------------------------------------


-- Generating new Container IDs
CREATE SEQUENCE IF NOT EXISTS sq_generate_container_ids
    AS INT
    INCREMENT BY 1
    MINVALUE 0
    MAXVALUE 9999999;


CREATE OR REPLACE FUNCTION fn_generate_container_ids(INT) RETURNS TABLE (
    container_id VARCHAR(10)
) AS $$
    DECLARE
        container_ids VARCHAR(10)[] := ARRAY[]::VARCHAR(10)[];
        row RECORD;
    BEGIN
        FOR row IN
            SELECT 
                ('ST' || LPAD(nextval('sq_generate_container_ids')::VARCHAR(10), 7, '0'))::VARCHAR(10) AS container_id
            FROM
                generate_series(1, $1)
        LOOP
            INSERT INTO containers(container_id, warehouse_location_id, status) VALUES (row.container_id, 'PSEUDO', 'chosen');
            container_ids := container_ids || row.container_id;
        END LOOP;

        RETURN QUERY
            SELECT unnest(container_ids) as container_id;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION fn_delete_container_ids(VARCHAR, VARCHAR) RETURNS VOID
AS $$
    DECLARE
        last_gen_container_id VARCHAR(10);
    BEGIN
        SELECT 
            ('ST' || LPAD(last_value::VARCHAR(10), 7, '0'))::VARCHAR(10) INTO last_gen_container_id
        FROM
            sq_generate_container_ids;

        IF 
            last_gen_container_id = $2 
        THEN
            PERFORM setval('sq_generate_container_ids', REGEXP_REPLACE($1, '[^0-9]', '', 'g')::INT - 1, true);
            DELETE FROM containers WHERE container_id >= $1 AND container_id <= $2;
        ELSE
            UPDATE containers SET status = 'unused' WHERE container_id >= $1 AND container_id <= $2;
        END IF;
    END;
    $$ LANGUAGE plpgsql;


-------------------------------------------------------------------------------


-- Auto update item status
CREATE OR REPLACE FUNCTION fn_item_stock_added() RETURNS TRIGGER AS $$
    DECLARE
        old_status VARCHAR(10);
    BEGIN
        SELECT status INTO old_status FROM items WHERE item_id = NEW.item_id;

        IF 
            old_status != 'added' 
        THEN
            UPDATE items SET status = 'added' WHERE item_id = NEW.item_id;
        END IF;

        RETURN NEW;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_item_stock_added
    AFTER INSERT
    ON stocks
    FOR EACH ROW
        EXECUTE PROCEDURE fn_item_stock_added();


-------------------------------------------------------------------------------


-- Auto update container status
CREATE OR REPLACE FUNCTION fn_container_stock_added() RETURNS TRIGGER AS $$
    DECLARE
        old_status VARCHAR(10);
    BEGIN
        SELECT status INTO old_status FROM containers WHERE container_id = NEW.container_id;

        IF 
            old_status != 'added' 
        THEN
            UPDATE containers SET status = 'added' WHERE container_id = NEW.container_id;
        END IF;

        RETURN NEW;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_container_stock_added
    AFTER INSERT
    ON stocks
    FOR EACH ROW
        EXECUTE PROCEDURE fn_container_stock_added();


-------------------------------------------------------------------------------


-- Auto update warehouse location status
CREATE OR REPLACE FUNCTION fn_warehouse_location_stock_added() RETURNS TRIGGER AS $$
    DECLARE
        old_status VARCHAR(10);
    BEGIN
        SELECT status INTO old_status FROM warehouse_locations WHERE warehouse_location_id = NEW.warehouse_location_id;

        IF 
            old_status != 'added' 
        THEN
            UPDATE warehouse_locations SET status = 'added' WHERE warehouse_location_id = NEW.warehouse_location_id;
        END IF;

        RETURN NEW;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_warehouse_location_stock_added
    AFTER INSERT
    ON stocks
    FOR EACH ROW
        EXECUTE PROCEDURE fn_warehouse_location_stock_added();


-------------------------------------------------------------------------------


-- Auto update item's container loc and warehouse loc and update container's loc
CREATE OR REPLACE FUNCTION fn_item_location_updated() RETURNS TRIGGER AS $$
    DECLARE
        element VARCHAR(10);
    BEGIN
        IF 
            NEW.group_uuid IS NOT NULL AND NEW.status = 'completed'
        THEN
            FOREACH element IN ARRAY NEW.items
            LOOP
                UPDATE stocks SET container_id = NEW.container_id, warehouse_location_id = NEW.warehouse_location_id WHERE item_id = element;

                IF 
                    (SELECT warehouse_location_id FROM containers WHERE container_id = NEW.container_id) <> NEW.warehouse_location_id
                THEN
                    UPDATE containers SET warehouse_location_id = NEW.warehouse_location_id WHERE container_id = NEW.container_id;
                END IF;

            END LOOP;
        END IF;

        RETURN NEW;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_item_location_updated
    AFTER INSERT OR UPDATE
    ON stock_location_history
    FOR EACH ROW
        EXECUTE PROCEDURE fn_item_location_updated();


-------------------------------------------------------------------------------
