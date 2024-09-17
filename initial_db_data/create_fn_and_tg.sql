CREATE OR REPLACE FUNCTION fn_users_notify_event() RETURNS trigger AS $$
    DECLARE
        view_data JSON;
        payload JSON;
    BEGIN
        IF TG_OP = 'DELETE' THEN
            SELECT row_to_json(users_view) INTO view_data FROM users_view WHERE id = OLD.id;
        ELSE
            SELECT row_to_json(users_view) INTO view_data FROM users_view WHERE id = NEW.id;
        END IF;

        payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', view_data);
        
        PERFORM pg_notify('table_update', payload::TEXT);

        IF TG_OP = 'DELETE' THEN
            RETURN OLD;
        ELSE 
            RETURN NEW;
        END IF;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_users_insert_or_update
    AFTER INSERT OR UPDATE
    ON users
    FOR EACH ROW
        EXECUTE PROCEDURE fn_users_notify_event();
        

CREATE OR REPLACE TRIGGER tg_users_delete
    BEFORE DELETE
    ON users
    FOR EACH ROW
        EXECUTE PROCEDURE fn_users_notify_event();


-------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION fn_categories_notify_event() RETURNS trigger AS $$
    DECLARE
        view_data JSON;
        payload JSON;
    BEGIN
        IF TG_OP = 'DELETE' THEN
            SELECT row_to_json(categories_view) INTO view_data FROM categories_view WHERE id = OLD.id;
        ELSE
            SELECT row_to_json(categories_view) INTO view_data FROM categories_view WHERE id = NEW.id;
        END IF;
        
        payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', view_data);
        
        PERFORM pg_notify('table_update', payload::TEXT);

        IF TG_OP = 'DELETE' THEN
            RETURN OLD;
        ELSE 
            RETURN NEW;
        END IF;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_categories_insert_or_update
    AFTER INSERT OR UPDATE
    ON categories
    FOR EACH ROW
        EXECUTE PROCEDURE fn_categories_notify_event();
        
        
CREATE OR REPLACE TRIGGER tg_categories_delete
    BEFORE DELETE
    ON categories
    FOR EACH ROW
        EXECUTE PROCEDURE fn_categories_notify_event();


-------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION fn_warehouse_locations_notify_event() RETURNS trigger AS $$
    DECLARE
        view_data JSON;
        payload JSON;
    BEGIN
        IF TG_OP = 'DELETE' THEN
            SELECT row_to_json(warehouse_locations_view) INTO view_data FROM warehouse_locations_view WHERE id = OLD.id;
        ELSE
            SELECT row_to_json(warehouse_locations_view) INTO view_data FROM warehouse_locations_view WHERE id = NEW.id;
        END IF;

        payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', view_data);
        
        PERFORM pg_notify('table_update', payload::TEXT);

        IF TG_OP = 'DELETE' THEN
            RETURN OLD;
        ELSE 
            RETURN NEW;
        END IF;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_warehouse_locations_insert_or_update
    AFTER INSERT OR UPDATE
    ON warehouse_locations
    FOR EACH ROW
        EXECUTE PROCEDURE fn_warehouse_locations_notify_event();
    

CREATE OR REPLACE TRIGGER tg_warehouse_locations_delete
    BEFORE DELETE
    ON warehouse_locations
    FOR EACH ROW
        EXECUTE PROCEDURE fn_warehouse_locations_notify_event();


-------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION fn_containers_notify_event() RETURNS trigger AS $$
    DECLARE
        view_data JSON;
        payload JSON;
    BEGIN
        IF TG_OP = 'DELETE' THEN
            SELECT row_to_json(containers_view) INTO view_data FROM containers_view WHERE containers_view.id = OLD.id;
        ELSE
            SELECT row_to_json(containers_view) INTO view_data FROM containers_view WHERE containers_view.id = NEW.id;
        END IF;

        payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', view_data);
        
        PERFORM pg_notify('table_update', payload::TEXT);

        IF TG_OP = 'DELETE' THEN
            RETURN OLD;
        ELSE 
            RETURN NEW;
        END IF;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_containers_insert_or_update
    AFTER INSERT OR UPDATE
    ON containers
    FOR EACH ROW
        EXECUTE PROCEDURE fn_containers_notify_event();
        

CREATE OR REPLACE TRIGGER tg_containers_delete
    BEFORE DELETE
    ON containers
    FOR EACH ROW
        EXECUTE PROCEDURE fn_containers_notify_event();


-------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION fn_items_notify_event() RETURNS trigger AS $$
    DECLARE
        view_data JSON;
        payload JSON;
    BEGIN
        IF TG_OP = 'DELETE' THEN
            SELECT row_to_json(items_view) INTO view_data FROM items_view WHERE id = OLD.id;
        ELSE
            SELECT row_to_json(items_view) INTO view_data FROM items_view WHERE id = NEW.id;
        END IF;

        payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', view_data);
        
        PERFORM pg_notify('table_update', payload::TEXT);

        IF TG_OP = 'DELETE' THEN
            RETURN OLD;
        ELSE 
            RETURN NEW;
        END IF;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_items_insert_or_update
    AFTER INSERT OR UPDATE
    ON items
    FOR EACH ROW
        EXECUTE PROCEDURE fn_items_notify_event();


CREATE OR REPLACE TRIGGER tg_items_delete
    BEFORE DELETE
    ON items
    FOR EACH ROW
        EXECUTE PROCEDURE fn_items_notify_event();


-------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION fn_fields_notify_event() RETURNS trigger AS $$
    DECLARE
        view_data JSON;
        payload JSON;
    BEGIN
        IF TG_OP = 'DELETE' THEN
            SELECT row_to_json(fields_view) INTO view_data FROM fields_view WHERE id = OLD.id;
        ELSE
            SELECT row_to_json(fields_view) INTO view_data FROM fields_view WHERE id = NEW.id;
        END IF;

        payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', view_data);
        
        PERFORM pg_notify('table_update', payload::TEXT);

        IF TG_OP = 'DELETE' THEN
            RETURN OLD;
        ELSE 
            RETURN NEW;
        END IF;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_fields_insert_or_update
    AFTER INSERT OR UPDATE 
    ON fields
    FOR EACH ROW
        EXECUTE PROCEDURE fn_fields_notify_event();
        
        
CREATE OR REPLACE TRIGGER tg_fields_delete
    BEFORE DELETE
    ON fields
    FOR EACH ROW
        EXECUTE PROCEDURE fn_fields_notify_event();


-------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION fn_skus_notify_event() RETURNS trigger AS $$
    DECLARE
        view_data JSON;
        payload JSON;
    BEGIN
        IF TG_OP = 'DELETE' THEN
            SELECT row_to_json(skus_view) INTO view_data FROM skus_view WHERE id = OLD.id;
        ELSE
            SELECT row_to_json(skus_view) INTO view_data FROM skus_view WHERE id = NEW.id;
        END IF;

        payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', view_data);
        
        PERFORM pg_notify('table_update', payload::TEXT);

        IF TG_OP = 'DELETE' THEN
            RETURN OLD;
        ELSE 
            RETURN NEW;
        END IF;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_skus_insert_or_update
    AFTER INSERT OR UPDATE
    ON skus
    FOR EACH ROW
        EXECUTE PROCEDURE fn_skus_notify_event();


CREATE OR REPLACE TRIGGER tg_skus_delete
    BEFORE DELETE
    ON skus
    FOR EACH ROW
        EXECUTE PROCEDURE fn_skus_notify_event();


-------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION fn_stocks_notify_event() RETURNS trigger AS $$
    DECLARE
        view_data JSON;
        payload JSON;
    BEGIN
        IF TG_OP = 'DELETE' THEN
            SELECT row_to_json(stocks_view) INTO view_data FROM stocks_view WHERE id = OLD.id;
        ELSE
            SELECT row_to_json(stocks_view) INTO view_data FROM stocks_view WHERE id = NEW.id;
        END IF;

        payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', view_data);
        
        PERFORM pg_notify('table_update', payload::TEXT);

        IF TG_OP = 'DELETE' THEN
            RETURN OLD;
        ELSE 
            RETURN NEW;
        END IF;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_stocks_insert_or_update
    AFTER INSERT OR UPDATE
    ON stocks
    FOR EACH ROW
        EXECUTE PROCEDURE fn_stocks_notify_event();
        
        
CREATE OR REPLACE TRIGGER tg_stocks_delete
    BEFORE DELETE
    ON stocks
    FOR EACH ROW
        EXECUTE PROCEDURE fn_stocks_notify_event();


-------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION fn_docking_station_specifications_notify_event() RETURNS trigger AS $$
    DECLARE
        view_data JSON;
        payload JSON;
    BEGIN
        IF TG_OP = 'DELETE' THEN
            SELECT row_to_json(stocks_view) INTO view_data FROM stocks_view WHERE id = OLD.id;
        ELSE
            SELECT row_to_json(stocks_view) INTO view_data FROM stocks_view WHERE id = NEW.id;
        END IF;

        payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', view_data);
        
        PERFORM pg_notify('table_update', payload::TEXT);

        IF TG_OP = 'DELETE' THEN
            RETURN OLD;
        ELSE 
            RETURN NEW;
        END IF;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_docking_station_specifications_insert_or_update
    AFTER INSERT OR UPDATE 
    ON docking_station_specifications
    FOR EACH ROW
        EXECUTE PROCEDURE fn_docking_station_specifications_notify_event();
        

CREATE OR REPLACE TRIGGER tg_docking_station_specifications_delete
    BEFORE DELETE
    ON docking_station_specifications
    FOR EACH ROW
        EXECUTE PROCEDURE fn_docking_station_specifications_notify_event();


-------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION fn_graphics_card_specifications_notify_event() RETURNS trigger AS $$
    DECLARE
        view_data JSON;
        payload JSON;
    BEGIN
        IF TG_OP = 'DELETE' THEN
            SELECT row_to_json(stocks_view) INTO view_data FROM stocks_view WHERE id = OLD.id;
        ELSE
            SELECT row_to_json(stocks_view) INTO view_data FROM stocks_view WHERE id = NEW.id;
        END IF;

        payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', view_data);
        
        PERFORM pg_notify('table_update', payload::TEXT);

        IF TG_OP = 'DELETE' THEN
            RETURN OLD;
        ELSE 
            RETURN NEW;
        END IF;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_graphics_card_specifications_insert_or_update
    AFTER INSERT OR UPDATE
    ON graphics_card_specifications
    FOR EACH ROW
        EXECUTE PROCEDURE fn_graphics_card_specifications_notify_event();


CREATE OR REPLACE TRIGGER tg_graphics_card_specifications_delete
    BEFORE DELETE
    ON graphics_card_specifications
    FOR EACH ROW
        EXECUTE PROCEDURE fn_graphics_card_specifications_notify_event();


-------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION fn_laptop_specifications_notify_event() RETURNS trigger AS $$
    DECLARE
        view_data JSON;
        payload JSON;
    BEGIN
        IF TG_OP = 'DELETE' THEN
            SELECT row_to_json(stocks_view) INTO view_data FROM stocks_view WHERE id = OLD.id;
        ELSE
            SELECT row_to_json(stocks_view) INTO view_data FROM stocks_view WHERE id = NEW.id;
        END IF;

        payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', view_data);
        
        PERFORM pg_notify('table_update', payload::TEXT);

        IF TG_OP = 'DELETE' THEN
            RETURN OLD;
        ELSE 
            RETURN NEW;
        END IF;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_laptop_specifications_insert_or_update
    AFTER INSERT OR UPDATE
    ON laptop_specifications
    FOR EACH ROW
        EXECUTE PROCEDURE fn_laptop_specifications_notify_event();
        

CREATE OR REPLACE TRIGGER tg_laptop_specifications_delete
    BEFORE DELETE
    ON laptop_specifications
    FOR EACH ROW
        EXECUTE PROCEDURE fn_laptop_specifications_notify_event();


-------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION fn_tft_specifications_notify_event() RETURNS trigger AS $$
    DECLARE
        view_data JSON;
        payload JSON;
    BEGIN
        IF TG_OP = 'DELETE' THEN
            SELECT row_to_json(stocks_view) INTO view_data FROM stocks_view WHERE id = OLD.id;
        ELSE
            SELECT row_to_json(stocks_view) INTO view_data FROM stocks_view WHERE id = NEW.id;
        END IF;

        payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', view_data);
        
        PERFORM pg_notify('table_update', payload::TEXT);

        IF TG_OP = 'DELETE' THEN
            RETURN OLD;
        ELSE 
            RETURN NEW;
        END IF;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_tft_specifications_insert_or_update
    AFTER INSERT OR UPDATE
    ON tft_specifications
    FOR EACH ROW
        EXECUTE PROCEDURE fn_tft_specifications_notify_event();
        

CREATE OR REPLACE TRIGGER tg_tft_specifications_delete
    BEFORE DELETE
    ON tft_specifications
    FOR EACH ROW
        EXECUTE PROCEDURE fn_tft_specifications_notify_event();


-------------------------------------------------------------------------------


CREATE OR REPLACE FUNCTION fn_stock_location_history_notify_event() RETURNS trigger AS $$
    DECLARE
        view_data JSON;
        payload JSON;
    BEGIN
        IF TG_OP = 'DELETE' THEN
            SELECT row_to_json(stock_location_history_view) INTO view_data FROM stock_location_history_view WHERE id = OLD.id;
        ELSE
            SELECT row_to_json(stock_location_history_view) INTO view_data FROM stock_location_history_view WHERE id = NEW.id;
        END IF;

        payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', view_data);
        
        PERFORM pg_notify('table_update', payload::TEXT);

        IF TG_OP = 'DELETE' THEN
            RETURN OLD;
        ELSE 
            RETURN NEW;
        END IF;
    END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER tg_stock_location_history_insert_or_update
    AFTER INSERT OR UPDATE
    ON stock_location_history
    FOR EACH ROW
        EXECUTE PROCEDURE fn_stock_location_history_notify_event();
        
        
CREATE OR REPLACE TRIGGER tg_stock_location_history_delete
    BEFORE DELETE
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


CREATE OR REPLACE FUNCTION fn_generate_item_ids(INT, VARCHAR) RETURNS TABLE (
    id INT,
    item_id VARCHAR(10),
    status VARCHAR(10)
) AS $$
    DECLARE
        item_ids VARCHAR(10)[] := ARRAY[]::VARCHAR(10)[];
        user_fid INT;
        row RECORD;
    BEGIN
        SELECT 
            users_view.id INTO user_fid
        FROM 
            users_view
        WHERE users_view.email = $2;
        
        FOR row IN 
            SELECT 
                nextval('sq_generate_item_ids')::VARCHAR(10) AS item_id 
            FROM 
                generate_series(1, $1)
        LOOP
            INSERT INTO items (item_id, status, created_by) 
            VALUES (row.item_id, 'chosen', user_fid);
            
            item_ids := item_ids || row.item_id;
        END LOOP;

        RETURN QUERY 
            SELECT * FROM items_view
            WHERE items_view.item_id = ANY(item_ids);
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


CREATE OR REPLACE FUNCTION fn_generate_container_ids(INT, VARCHAR) RETURNS TABLE (
    id INT,
    container_id VARCHAR(10),
    warehouse_location_id VARCHAR(20),
    status VARCHAR(10)
) AS $$
    DECLARE
        warehouse_location_fid INT;
        user_fid INT;
        container_ids VARCHAR(10)[] := ARRAY[]::VARCHAR(10)[];
        row RECORD;
    BEGIN
        SELECT 
            warehouse_locations_view.id INTO warehouse_location_fid 
        FROM 
            warehouse_locations_view 
        WHERE warehouse_locations_view.warehouse_location_id = 'PSEUDO';

        SELECT 
            users_view.id INTO user_fid
        FROM 
            users_view 
        WHERE users_view.email = $2;

        FOR row IN
            SELECT 
                ('ST' || LPAD(nextval('sq_generate_container_ids')::VARCHAR(10), 7, '0'))::VARCHAR(10) AS container_id
            FROM
                generate_series(1, $1)
        LOOP
            INSERT INTO containers (container_id, warehouse_location_fid, status, created_by) 
            VALUES (row.container_id, warehouse_location_fid, 'chosen', user_fid);

            container_ids := container_ids || row.container_id;
        END LOOP;

        RETURN QUERY
            SELECT * FROM containers_view 
            WHERE containers_view.container_id = ANY(container_ids);
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
        SELECT status INTO old_status FROM items WHERE id = NEW.item_fid;

        IF 
            old_status != 'added' 
        THEN
            UPDATE items SET status = 'added' WHERE id = NEW.item_fid;
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
        SELECT status INTO old_status FROM containers WHERE id = NEW.container_fid;

        IF 
            old_status != 'added' 
        THEN
            UPDATE containers SET status = 'added' WHERE id = NEW.container_fid;
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
        SELECT status INTO old_status FROM warehouse_locations WHERE id = NEW.warehouse_location_fid;

        IF 
            old_status != 'added' 
        THEN
            UPDATE warehouse_locations SET status = 'added' WHERE id = NEW.warehouse_location_fid;
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
                UPDATE 
                    stocks 
                SET 
                    container_fid = NEW.container_fid, warehouse_location_fid = NEW.warehouse_location_fid 
                FROM 
                    items 
                WHERE 
                    items.item_fid = stocks.item_fid AND items.item_id = element;

                IF 
                    (SELECT warehouse_location_fid FROM containers WHERE id = NEW.container_fid) <> NEW.warehouse_location_fid
                THEN
                    UPDATE containers SET warehouse_location_fid = NEW.warehouse_location_fid WHERE id = NEW.container_id;
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
