-- users
BEGIN;

CREATE TABLE IF NOT EXISTS users_new (
    id SERIAL,
    email VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_on TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),

    PRIMARY KEY (id),
    UNIQUE (email)
);

INSERT INTO users_new 
    (email, username)
SELECT 
    email, username 
FROM users;

SELECT * FROM users_new;

COMMIT;


-- categories
BEGIN;

CREATE TABLE IF NOT EXISTS categories_new (
    id SERIAL,
    category VARCHAR(20) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_on TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    created_by INT NOT NULL,

    PRIMARY KEY (id),
    UNIQUE (category),
    FOREIGN KEY (created_by) REFERENCES users_new(id)
);

INSERT INTO categories_new
    (category, created_by)
SELECT 
    category, 1 AS created_by 
FROM categories 
ORDER BY category;

SELECT * FROM categories_new;

COMMIT;


-- warehouse_locations
BEGIN;

CREATE TABLE IF NOT EXISTS warehouse_locations_new (
    id SERIAL,
    warehouse_location_id VARCHAR(20) NOT NULL,
    status VARCHAR(10) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_on TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    created_by INT NOT NULL,  

    PRIMARY KEY (id),
    UNIQUE (warehouse_location_id),
    FOREIGN KEY (created_by) REFERENCES users_new(id)
);

INSERT INTO warehouse_locations_new
    (warehouse_location_id, status, created_by)
SELECT 
    warehouse_location_id, status, 1 AS created_by
FROM warehouse_locations
ORDER BY warehouse_location_id;

SELECT * FROM warehouse_locations_new LIMIT 10;

COMMIT;


-- containers
BEGIN;

CREATE TABLE IF NOT EXISTS containers_new (
    id SERIAL,
    container_id VARCHAR(10) NOT NULL,
    warehouse_location_fid INT NOT NULL,
    status VARCHAR(10) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_on TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    created_by INT NOT NULL,  

    PRIMARY KEY (id),
    UNIQUE (container_id),
    FOREIGN KEY (warehouse_location_fid) REFERENCES warehouse_locations_new(id),
    FOREIGN KEY (created_by) REFERENCES users_new(id)
);

INSERT INTO containers_new
    (container_id, warehouse_location_fid, status, created_by)
SELECT
    containers.container_id, warehouse_locations_new.id AS warehouse_location_fid, containers.status, 1 AS created_by
FROM containers 
    INNER JOIN warehouse_locations_new ON warehouse_locations_new.warehouse_location_id = containers.warehouse_location_id
ORDER BY containers.container_id;

SELECT * FROM containers_new LIMIT 10;

COMMIT;


-- items
BEGIN;

CREATE TABLE IF NOT EXISTS items_new (
    id SERIAL,
    item_id VARCHAR(10) NOT NULL,
    status VARCHAR(10) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_on TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    created_by INT NOT NULL,  

    PRIMARY KEY (id),
    UNIQUE (item_id),
    FOREIGN KEY (created_by) REFERENCES users_new(id)
);

INSERT INTO items_new
    (item_id, status, created_by)
SELECT 
    item_id, status, 1 AS created_by
FROM items
ORDER BY item_id;

SELECT * FROM items_new LIMIT 10;

COMMIT;


-- fields
BEGIN;

CREATE TABLE IF NOT EXISTS fields_new (
    id SERIAL,
    field VARCHAR(50) NOT NULL,
    category_fid INT NOT NULL,
    datatype VARCHAR(20) NOT NULL,
    in_sku BOOLEAN NOT NULL,
    is_background BOOLEAN NOT NULL,
    is_lockable BOOLEAN NOT NULL,
    name_case VARCHAR(10) NOT NULL,
    value_case VARCHAR(10) NOT NULL,
    display_order INT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_on TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    created_by INT NOT NULL,  

    PRIMARY KEY (id),
    UNIQUE (field, category_fid),
    FOREIGN KEY (category_fid) REFERENCES categories_new(id),
    FOREIGN KEY (created_by) REFERENCES users_new(id)
);

INSERT INTO fields_new
    (field, category_fid, datatype, in_sku, is_background, is_lockable, name_case, value_case, display_order, created_by)
SELECT field, categories_new.id AS category_fid, datatype, in_sku, is_background, is_lockable, name_case, value_case, display_order, 1 AS created_by
FROM fields
    INNER JOIN categories_new ON categories_new.category = fields.category
ORDER BY display_order, category_fid;

SELECT * FROM fields_new LIMIT 10;

COMMIT;


-- skus
BEGIN;

CREATE TABLE IF NOT EXISTS skus_new (
    id SERIAL,
    sku VARCHAR(50) NOT NULL,
    category_fid INT NOT NULL,
    specifications JSONB NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_on TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    created_by INT NOT NULL DEFAULT 1,  

    PRIMARY KEY (id),
    UNIQUE (sku),
    FOREIGN KEY (category_fid) REFERENCES categories_new(id),
    FOREIGN KEY (created_by) REFERENCES users_new(id)
);

-- EMPTY INSERT

SELECT * FROM skus_new LIMIT 10;

COMMIT;


-- stocks
BEGIN;

CREATE TABLE IF NOT EXISTS stocks_new (
    id SERIAL,
    date TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(), -- created_on
    item_fid INT NOT NULL,
    category_fid INT NOT NULL,
    sku_fid INT,
    serial_number VARCHAR(50),
    container_fid INT NOT NULL,
    warehouse_location_fid INT NOT NULL,
    supplier_info VARCHAR(255),
    comments VARCHAR(255),
    user_fid INT NOT NULL, -- created_by
    is_active BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (id),
    UNIQUE(item_fid),
    UNIQUE(serial_number),
    FOREIGN KEY (item_fid) REFERENCES items_new(id),
    FOREIGN KEY (category_fid) REFERENCES categories_new(id),
    FOREIGN KEY (sku_fid) REFERENCES skus_new(id),
    FOREIGN KEY (container_fid) REFERENCES containers_new(id),
    FOREIGN KEY (warehouse_location_fid) REFERENCES warehouse_locations_new(id),
    FOREIGN KEY (user_fid) REFERENCES users_new(id)
);

INSERT INTO stocks_new 
    (date, item_fid, category_fid, sku_fid, serial_number, container_fid, warehouse_location_fid, supplier_info, comments, user_fid)
SELECT
    date, items_new.id AS item_fid, categories_new.id AS category_fid, NULL AS sku_fid, serial_number, containers_new.id AS container_fid, warehouse_locations_new.id AS warehouse_location_fid, supplier_info, comments, users_new.id AS user_fid
FROM stocks
    INNER JOIN items_new ON items_new.item_id = stocks.item_id
    INNER JOIN categories_new ON categories_new.category = stocks.category
    INNER JOIN containers_new ON containers_new.container_id = stocks.container_id
    INNER JOIN warehouse_locations_new ON warehouse_locations_new.warehouse_location_id = stocks.warehouse_location_id
    INNER JOIN users ON users.user_uuid = stocks.user_uuid
    INNER JOIN users_new ON users_new.email = users.email
ORDER BY stocks.date;

SELECT * FROM stocks_new LIMIT 10;

COMMIT;


-- docking_station_specifications
BEGIN;

CREATE TABLE IF NOT EXISTS docking_station_specifications_new (
    id SERIAL,
    item_fid INT NOT NULL,
    make VARCHAR(255),
    model VARCHAR(255),
    condition VARCHAR(255),

    PRIMARY KEY (id),
    UNIQUE(item_fid),
    FOREIGN KEY (item_fid) REFERENCES items_new(id)
);

INSERT INTO docking_station_specifications_new
    (item_fid, make, model, condition)
SELECT
    items_new.id, make, model, condition
FROM docking_station_specifications
    INNER JOIN items_new ON items_new.item_id = docking_station_specifications.item_id
    INNER JOIN stocks_new ON stocks_new.item_fid = items_new.id
ORDER BY stocks_new.date;

SELECT * FROM docking_station_specifications_new LIMIT 10;

COMMIT;


-- graphics_card_specifications
BEGIN;

CREATE TABLE IF NOT EXISTS graphics_card_specifications_new (
    id SERIAL,
    item_fid INT NOT NULL,
    make VARCHAR(255),
    model VARCHAR(255),
    condition VARCHAR(255),
    ram VARCHAR(255),
    profile VARCHAR(255),
    vga VARCHAR(255),
    dvi VARCHAR(255),
    dms VARCHAR(255),
    dp VARCHAR(255),
    mini_dp VARCHAR(255),
    hdmi VARCHAR(255),
    usb_c VARCHAR(255),
    ethernet VARCHAR(255),
    supplier_id VARCHAR(255),
    works_order VARCHAR(255),

    PRIMARY KEY (id),
    UNIQUE(item_fid),
    FOREIGN KEY (item_fid) REFERENCES items_new(id)
);

INSERT INTO graphics_card_specifications_new
    (item_fid, make, model, condition, ram, profile, vga, dvi, dms, dp, mini_dp, hdmi, usb_c, ethernet, supplier_id, works_order) 
SELECT
    items_new.id, make, model, condition, ram, profile, vga, dvi, dms, dp, mini_dp, hdmi, usb_c, ethernet, supplier_id, works_order 
FROM graphics_card_specifications
    INNER JOIN items_new ON items_new.item_id = graphics_card_specifications.item_id
    INNER JOIN stocks_new ON stocks_new.item_fid = items_new.id
ORDER BY stocks_new.date;

SELECT * FROM graphics_card_specifications_new LIMIT 10;

COMMIT;


-- laptop_specifications
BEGIN;

CREATE TABLE IF NOT EXISTS laptop_specifications_new (
    id SERIAL,
    item_fid INT NOT NULL,
    aiken_id VARCHAR(255),
    supplier_id VARCHAR(255),
    make VARCHAR(255),
    model VARCHAR(255),
    model_number VARCHAR(255),
    processor VARCHAR(255),
    ram VARCHAR(255),
    storage1_size VARCHAR(255),
    storage2_size VARCHAR(255),
    keyboard VARCHAR(255),
    webcam VARCHAR(255),
    battery1 VARCHAR(255),
    battery2 VARCHAR(255),
    touch_screen VARCHAR(255),
    case_grade VARCHAR(255),
    screen_grade VARCHAR(255),
    repair_required VARCHAR(255),
    t_cmos VARCHAR(255),
    t_speaker VARCHAR(255),
    t_usb VARCHAR(255),
    t_lan VARCHAR(255),
    t_lcd VARCHAR(255),
    t_keyboard VARCHAR(255),
    t_touchpad VARCHAR(255),
    t_wifi VARCHAR(255),
    t_battery1 VARCHAR(255),
    t_battery2 VARCHAR(255),
    t_webcam VARCHAR(255),
    t_microphone VARCHAR(255),
    t_touch_screen VARCHAR(255),
    wwan_card VARCHAR(255),
    display_size VARCHAR(255),
    resolution VARCHAR(255),
    coa VARCHAR(255),
    os VARCHAR(255),
    storage1_type VARCHAR(255),
    storage1_model VARCHAR(255),
    storage1_serial VARCHAR(255),
    storage2_type VARCHAR(255),
    storage2_model VARCHAR(255),
    storage2_serial VARCHAR(255),
    video_card VARCHAR(255),
    imei VARCHAR(255),
    works_order VARCHAR(255),

    PRIMARY KEY (id),
    UNIQUE(item_fid),
    FOREIGN KEY (item_fid) REFERENCES items_new(id)
);

INSERT INTO laptop_specifications_new
    (item_fid, aiken_id, supplier_id, make, model, model_number, processor, ram, storage1_size, storage2_size, keyboard, webcam, battery1, battery2, touch_screen, case_grade, screen_grade, repair_required, t_cmos, t_speaker, t_usb, t_lan, t_lcd, t_keyboard, t_touchpad, t_wifi, t_battery1, t_battery2, t_webcam, t_microphone, t_touch_screen, wwan_card, display_size, resolution, coa, os, storage1_type, storage1_model, storage1_serial, storage2_type, storage2_model, storage2_serial, video_card, imei, works_order) 
SELECT
    items_new.id, aiken_id, supplier_id, make, model, model_number, processor, ram, storage1_size, storage2_size, keyboard, webcam, battery1, battery2, touch_screen, case_grade, screen_grade, repair_required, t_cmos, t_speaker, t_usb, t_lan, t_lcd, t_keyboard, t_touchpad, t_wifi, t_battery1, t_battery2, t_webcam, t_microphone, t_touch_screen, wwan_card, display_size, resolution, coa, os, storage1_type, storage1_model, storage1_serial, storage2_type, storage2_model, storage2_serial, video_card, imei, works_order
FROM laptop_specifications
    INNER JOIN items_new ON items_new.item_id = laptop_specifications.item_id
    INNER JOIN stocks_new ON stocks_new.item_fid = items_new.id
ORDER BY stocks_new.date;

SELECT * FROM laptop_specifications_new LIMIT 10;

COMMIT;


-- tft_specifications
BEGIN;

CREATE TABLE IF NOT EXISTS tft_specifications_new (
    id SERIAL,
    item_fid INT NOT NULL,
    make VARCHAR(255),
    model VARCHAR(255),
    screen_size VARCHAR(255),
    resolution VARCHAR(255),
    usb_c VARCHAR(255),
    hdmi VARCHAR(255),
    display_port VARCHAR(255),
    vga VARCHAR(255),
    ethernet VARCHAR(255),
    grade VARCHAR(255),

    PRIMARY KEY (id),
    UNIQUE(item_fid),
    FOREIGN KEY (item_fid) REFERENCES items_new(id)
);

INSERT INTO tft_specifications_new
    (item_fid, make, model, screen_size, resolution, usb_c, hdmi, display_port, vga, ethernet, grade) 
SELECT
    items_new.id, make, model, screen_size, resolution, usb_c, hdmi, display_port, vga, ethernet, grade
FROM tft_specifications
    INNER JOIN items_new ON items_new.item_id = tft_specifications.item_id
    INNER JOIN stocks_new ON stocks_new.item_fid = items_new.id
ORDER BY stocks_new.date;

SELECT * FROM tft_specifications_new LIMIT 10;

COMMIT;


-- stock_location_history_new
BEGIN;

CREATE TABLE IF NOT EXISTS stock_location_history_new(
    id BIGSERIAL,
    date TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    group_uuid UUID,
    items VARCHAR(10)[] NOT NULL, -- And Is it right to store item_id's in a ARRAY when a container moves
    container_fid INT NOT NULL,
    warehouse_location_fid INT NOT NULL,
    move_type VARCHAR(20) NOT NULL,
    status VARCHAR(10) NOT NULL,
    user_fid INT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (container_fid) REFERENCES containers_new(id),
    FOREIGN KEY (warehouse_location_fid) REFERENCES warehouse_locations_new(id),
    FOREIGN KEY (user_fid) REFERENCES users_new(id)
);

INSERT INTO stock_location_history_new
    (date, group_uuid, items, container_fid, warehouse_location_fid, move_type, status, user_fid)
SELECT
    date, group_uuid, items, containers_new.id AS container_fid, warehouse_locations_new.id AS warehouse_location_fid, move_type, stock_location_history.status, users_new.id AS user_fid
FROM stock_location_history
    INNER JOIN containers_new ON containers_new.container_id = stock_location_history.container_id
    INNER JOIN warehouse_locations_new ON warehouse_locations_new.warehouse_location_id = stock_location_history.warehouse_location_id
    INNER JOIN users ON users.user_uuid = stock_location_history.user_uuid
    INNER JOIN users_new ON users_new.email = users.email
ORDER BY stock_location_history.date;

SELECT * FROM stock_location_history_new LIMIT 10;

COMMIT;


-- DROP all previous Tables
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS warehouse_locations CASCADE;
DROP TABLE IF EXISTS containers CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS fields CASCADE;
DROP TABLE IF EXISTS skus CASCADE;
DROP TABLE IF EXISTS stocks CASCADE;
DROP TABLE IF EXISTS docking_station_specifications CASCADE;
DROP TABLE IF EXISTS graphics_card_specifications CASCADE;
DROP TABLE IF EXISTS laptop_specifications CASCADE;
DROP TABLE IF EXISTS tft_specifications CASCADE;
DROP TABLE IF EXISTS stock_location_history CASCADE;


-- Rename new Tables
ALTER TABLE users_new RENAME TO users;
ALTER TABLE categories_new RENAME TO categories;
ALTER TABLE warehouse_locations_new RENAME TO warehouse_locations;
ALTER TABLE containers_new RENAME TO containers;
ALTER TABLE items_new RENAME TO items;
ALTER TABLE fields_new RENAME TO fields;
ALTER TABLE skus_new RENAME TO skus;
ALTER TABLE stocks_new RENAME TO stocks;
ALTER TABLE docking_station_specifications_new RENAME TO docking_station_specifications;
ALTER TABLE graphics_card_specifications_new RENAME TO graphics_card_specifications;
ALTER TABLE laptop_specifications_new RENAME TO laptop_specifications;
ALTER TABLE tft_specifications_new RENAME TO tft_specifications;
ALTER TABLE stock_location_history_new RENAME TO stock_location_history;
