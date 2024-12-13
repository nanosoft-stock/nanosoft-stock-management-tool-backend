CREATE OR REPLACE VIEW users_view
AS
    SELECT 
        id, 
        email, 
        username
    FROM users;

-------------------------------------------------------------------------------

CREATE OR REPLACE VIEW user_preferences_view
AS
    SELECT 
        id,
        current_user_table_preference_fid AS current_user_table_preference_id,
        user_fid AS user_id
    FROM user_preferences;

-------------------------------------------------------------------------------

CREATE OR REPLACE VIEW user_table_preferences_view
AS
    SELECT 
        id,
        table_preference_name,
        columns,
        user_fid AS user_id
    FROM user_table_preferences;

-------------------------------------------------------------------------------

CREATE OR REPLACE VIEW categories_view
AS 
    SELECT
        id, 
        category
    FROM categories;

-------------------------------------------------------------------------------

CREATE OR REPLACE VIEW warehouse_locations_view
AS 
    SELECT
        id, 
        warehouse_location_id, 
        status
    FROM warehouse_locations;

-------------------------------------------------------------------------------

CREATE OR REPLACE VIEW containers_view
AS
    SELECT
        containers.id AS id, 
        container_id, 
        warehouse_locations.warehouse_location_id AS warehouse_location_id, 
        containers.status AS status
    FROM containers
        INNER JOIN warehouse_locations ON warehouse_locations.id = containers.warehouse_location_fid;

-------------------------------------------------------------------------------

CREATE OR REPLACE VIEW items_view
AS
    SELECT
        id, 
        item_id, 
        status 
    FROM items;

-------------------------------------------------------------------------------

CREATE OR REPLACE VIEW fields_view
AS
    SELECT
        fields.id AS id, 
        field,
        categories.category AS category, 
        datatype,
        in_sku,
        is_background,
        is_lockable,
        name_case,
        value_case,
        display_order
    FROM fields
        INNER JOIN categories ON categories.id = fields.category_fid;

-------------------------------------------------------------------------------

CREATE OR REPLACE VIEW skus_view
AS
    SELECT
        skus.id AS id,
        sku,
        categories.category AS category,
        specifications
    FROM skus
        INNER JOIN categories ON categories.id = skus.category_fid;

-------------------------------------------------------------------------------

CREATE OR REPLACE VIEW stocks_view
AS 
    SELECT
        stocks.id AS id,
        date,
        items.item_id AS item_id,
        categories.category AS category,
        skus.sku AS sku,
        serial_number,
        containers.container_id AS container_id,
        warehouse_locations.warehouse_location_id AS warehouse_location_id,
        NULL AS specifications,
        supplier_info,
        comments,
        users.username AS username,
        is_dispatched
    FROM stocks
        LEFT JOIN items ON items.id = stocks.item_fid
        LEFT JOIN categories ON categories.id = stocks.category_fid
        LEFT JOIN skus ON skus.id = stocks.sku_fid
        LEFT JOIN containers ON containers.id = stocks.container_fid
        LEFT JOIN warehouse_locations ON warehouse_locations.id = stocks.warehouse_location_fid
        LEFT JOIN users ON users.id = stocks.user_fid;

-------------------------------------------------------------------------------

CREATE OR REPLACE VIEW stock_location_history_view
AS
    SELECT
        stock_location_history.id AS id,
        date,
        group_uuid,
        items,
        containers.container_id AS container_id,
        warehouse_locations.warehouse_location_id AS warehouse_location_id,
        move_type,
        stock_location_history.status AS status,
        users.username AS username
    FROM stock_location_history
        LEFT JOIN containers ON containers.id = stock_location_history.container_fid
        LEFT JOIN warehouse_locations ON warehouse_locations.id = stock_location_history.warehouse_location_fid
        LEFT JOIN users ON users.id = stock_location_history.user_fid;

-------------------------------------------------------------------------------
