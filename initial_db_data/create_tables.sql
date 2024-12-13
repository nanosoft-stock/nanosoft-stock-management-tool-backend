CREATE TABLE IF NOT EXISTS users (
    id SERIAL,
    email VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_on TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),

    PRIMARY KEY (id),
    UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS user_table_preferences (
    id SERIAL,
    user_fid INT NOT NULL,
    table_preference_name VARCHAR(50) NOT NULL,
    columns JSONB[] NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_on TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    modified_on TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),

    PRIMARY KEY (id),
    FOREIGN KEY (user_fid) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS user_preferences (
    id SERIAL,
    user_fid INT NOT NULL,
    current_user_table_preference_fid INT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_on TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    modified_on TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),

    PRIMARY KEY (id),
    FOREIGN KEY (user_fid) REFERENCES users(id),
    FOREIGN KEY (current_user_table_preference_fid) REFERENCES user_table_preferences(id),
    UNIQUE(user_fid)
);

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL,
    category VARCHAR(20) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_on TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    created_by INT NOT NULL,

    PRIMARY KEY (id),
    UNIQUE (category),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS warehouse_locations (
    id SERIAL,
    warehouse_location_id VARCHAR(20) NOT NULL,
    status VARCHAR(10) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_on TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    created_by INT NOT NULL,  

    PRIMARY KEY (id),
    UNIQUE (warehouse_location_id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS containers (
    id SERIAL,
    container_id VARCHAR(10) NOT NULL,
    warehouse_location_fid INT NOT NULL,
    status VARCHAR(10) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_on TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    created_by INT NOT NULL,  

    PRIMARY KEY (id),
    UNIQUE (container_id),
    FOREIGN KEY (warehouse_location_fid) REFERENCES warehouse_locations(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS items (
    id SERIAL,
    item_id VARCHAR(10) NOT NULL,
    status VARCHAR(10) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_on TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    created_by INT NOT NULL,  

    PRIMARY KEY (id),
    UNIQUE (item_id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS fields (
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
    FOREIGN KEY (category_fid) REFERENCES categories(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS skus (
    id SERIAL,
    sku VARCHAR(50) NOT NULL,
    category_fid INT NOT NULL,
    specifications JSONB NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_on TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    created_by INT NOT NULL DEFAULT 1,  

    PRIMARY KEY (id),
    UNIQUE (sku),
    FOREIGN KEY (category_fid) REFERENCES categories(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS stocks (
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
    is_dispatched BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (id),
    UNIQUE(item_fid),
    UNIQUE(serial_number),
    FOREIGN KEY (item_fid) REFERENCES items(id),
    FOREIGN KEY (category_fid) REFERENCES categories(id),
    FOREIGN KEY (sku_fid) REFERENCES skus(id),
    FOREIGN KEY (container_fid) REFERENCES containers(id),
    FOREIGN KEY (warehouse_location_fid) REFERENCES warehouse_locations(id),
    FOREIGN KEY (user_fid) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS stock_location_history(
    id BIGSERIAL,
    date TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    group_uuid UUID,
    items VARCHAR(10)[] NOT NULL, -- And Is it right to store item_id's in a ARRAY when a container moves -- and maybe it should be stock_id
    container_fid INT NOT NULL,
    warehouse_location_fid INT NOT NULL,
    move_type VARCHAR(20) NOT NULL,
    status VARCHAR(10) NOT NULL,
    user_fid INT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (container_fid) REFERENCES containers(id),
    FOREIGN KEY (warehouse_location_fid) REFERENCES warehouse_locations(id),
    FOREIGN KEY (user_fid) REFERENCES users(id)
);
