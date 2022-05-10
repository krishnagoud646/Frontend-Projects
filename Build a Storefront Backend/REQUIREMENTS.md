# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 


#### database schema

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


## API Endpoints
#### Products
- Index 
- Show
- Create [token required]


#### Users
- Index [token required]
- Show [token required]
- Create N[token required]


#### Orders
- Current Order by user (args: user id)[token required]

## Data Shapes

#### Product
-  id: number
- name: string
- price: number
- [OPTIONAL]category:string

             
 Column |         Type          | Collation | Nullable |               Default
--------+-----------------------+-----------+----------+-------------------------------------
 id     | integer               |           | not null | nextval('product_id_seq'::regclass)
 name   | character            |          | 
 price  | integer               |           |          | 


#### User
- id
- firstname
- lastname
- username
- password
- table
                                  Table "public.users"
   Column   |          Type          |                     Modifiers
------------+------------------------+----------------------------------------------------
 id         | integer                | not null default nextval('users_id_seq'::regclass)
 firstname | character   | 
 lastname  | character   | 
 username  | character   | 
 password   | character  | 



#### Orders
- id:number
- quantity : number
- user_id : number
- status : string

 Column  |         Type          | Collation | Nullable |              Default
----------+-----------------------+-----------+----------+------------------------------------
 id       | integer               |           | not null | nextval('orders_id_seq'::regclass)
 quantity | integer               |           |          | 
 user_id  | integer               |           |          | 
 status   | character  |           |          | 

                                    

#### Orders_product

- id: number
- order_id: number
- product_id: number

                    
                              Table "public.orders_product"
   Column   |  Type   | Collation | Nullable |                  Default
------------+---------+-----------+----------+--------------------------------------------
 id         | integer |           | not null | nextval('orders_product_id_seq'::regclass)
 order_id   | integer |           |          | 
 product_id | integer |           |          | 
 quantity | integer               |           |          |


 