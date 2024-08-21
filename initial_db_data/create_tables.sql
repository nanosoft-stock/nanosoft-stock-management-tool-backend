CREATE TABLE IF NOT EXISTS users (
    user_uuid UUID NOT NULL DEFAULT gen_random_uuid(),
    email VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL,
    vs_column_fields VARCHAR(50)[],
    vs_visible_fields VARCHAR(50)[],

    PRIMARY KEY (user_uuid),
    UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS categories (
    category VARCHAR(20) NOT NULL,

    PRIMARY KEY (category)
);

CREATE TABLE IF NOT EXISTS warehouse_locations (
    warehouse_location_id VARCHAR(20) NOT NULL,

    PRIMARY KEY (warehouse_location_id)
);

CREATE TABLE IF NOT EXISTS containers (
    container_id VARCHAR(10) NOT NULL,
    warehouse_location_id VARCHAR(20) NOT NULL,
    status VARCHAR(10),

    PRIMARY KEY (container_id),
    FOREIGN KEY (warehouse_location_id) REFERENCES warehouse_locations(warehouse_location_id)
);

CREATE TABLE IF NOT EXISTS items (
    item_id VARCHAR(10) NOT NULL,
    status VARCHAR(10),

    PRIMARY KEY (item_id)
);

CREATE TABLE IF NOT EXISTS fields (
    field_uuid UUID NOT NULL DEFAULT gen_random_uuid(),
    field VARCHAR(50) NOT NULL,
    category VARCHAR(20) NOT NULL,
    datatype VARCHAR(10) NOT NULL,
    in_sku BOOLEAN NOT NULL,
    is_background BOOLEAN NOT NULL,
    is_lockable BOOLEAN NOT NULL,
    name_case VARCHAR(10) NOT NULL,
    value_case VARCHAR(10) NOT NULL,
    display_order SMALLINT NOT NULL,

    PRIMARY KEY (field_uuid),
    UNIQUE (field, category),
    FOREIGN KEY (category) REFERENCES categories(category)
);

CREATE TABLE IF NOT EXISTS skus (
    sku_uuid UUID NOT NULL DEFAULT gen_random_uuid(),
    sku VARCHAR(20) NOT NULL,
    category VARCHAR(20) NOT NULL,
    specifications JSONB NOT NULL,

    PRIMARY KEY (sku_uuid),
    UNIQUE (sku),
    FOREIGN KEY (category) REFERENCES categories(category)
);

CREATE TABLE IF NOT EXISTS stocks (
    date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    category VARCHAR(20) NOT NULL,
    sku_uuid UUID,
    serial_number VARCHAR(50),
    item_id VARCHAR(10) NOT NULL,
    container_id VARCHAR(10),
    warehouse_location_id VARCHAR(20),
    supplier_info VARCHAR(255),
    comments VARCHAR(255),
    user_uuid UUID NOT NULL,

    PRIMARY KEY (item_id),
    UNIQUE(serial_number),
    FOREIGN KEY (category) REFERENCES categories(category),
    FOREIGN KEY (sku_uuid) REFERENCES skus(sku_uuid),
    FOREIGN KEY (item_id) REFERENCES items(item_id),
    FOREIGN KEY (container_id) REFERENCES containers(container_id),
    FOREIGN KEY (warehouse_location_id) REFERENCES warehouse_locations(warehouse_location_id),
    FOREIGN KEY (user_uuid) REFERENCES users(user_uuid)
);

CREATE TABLE IF NOT EXISTS laptop_specifications(
    item_id VARCHAR(10) NOT NULL,
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

    PRIMARY KEY (item_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id)
);

CREATE TABLE IF NOT EXISTS tft_specifications(
    item_id VARCHAR(10) NOT NULL,
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

    PRIMARY KEY (item_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id)
);


CREATE TABLE IF NOT EXISTS docking_station_specifications(
    item_id VARCHAR(10) NOT NULL,
    make VARCHAR(255),
    model VARCHAR(255),
    condition VARCHAR(255),

    PRIMARY KEY (item_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id)
);

CREATE TABLE IF NOT EXISTS stock_location_history(
    date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    slh_uid UUID NOT NULL DEFAULT gen_random_uuid(),
    group_uid UUID,
    items VARCHAR(10)[] NOT NULL,
    container_id VARCHAR(10) NOT NULL,
    warehouse_location_id VARCHAR(20) NOT NULL,
    move_type VARCHAR(10) NOT NULL,
    status VARCHAR(10) NOT NULL,
    user_uuid UUID NOT NULL,

    PRIMARY KEY (slh_uid),
    FOREIGN KEY (container_id) REFERENCES containers(container_id),
    FOREIGN KEY (warehouse_location_id) REFERENCES warehouse_locations(warehouse_location_id),
    FOREIGN KEY (user_uuid) REFERENCES users(user_uuid)
);
