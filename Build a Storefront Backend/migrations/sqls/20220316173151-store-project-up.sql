
/* Replace with your SQL commands */
CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR,
     lastname VARCHAR,
     username VARCHAR,
     password VARCHAR);

CREATE TABLE Orders(
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    user_id INTEGER REFERENCES Users,
    status VARCHAR
    );

CREATE TABLE Product(
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    price INTEGER NOT NULL,
    specifications VARCHAR
    );

CREATE TABLE Orders_product(
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES Orders(id),
    product_id INTEGER REFERENCES Product(id));