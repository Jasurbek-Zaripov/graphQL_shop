create TABLE persons (
  id INT GENERATED ALWAYS AS IDENTITY primary key,
  username VARCHAR(50) not null ,
  password text not null check(password ~ '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,12}$'),
  contact VARCHAR(12) not null UNIQUE check(contact ~ '^\d+$'), --only number
  email VARCHAR(100) not null UNIQUE check(email ~ '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$'),
  role VARCHAR(5) not null check(role in ('admin','user')) default 'user' --default role user
);

create table categories (
  id INT GENERATED ALWAYS AS IDENTITY primary key,
  name varchar(100) NOT NULL UNIQUE 
);

create table sap_categories (
  id INT GENERATED ALWAYS AS IDENTITY primary key,
  parent_category_id INT,
  name varchar(100) NOT NULL UNIQUE,

    FOREIGN KEY(parent_category_id) 
	    REFERENCES categories(id)
        ON DELETE CASCADE
);

create table products (
  id INT GENERATED ALWAYS AS IDENTITY primary key,
  name varchar(100) NOT NULL,
  sap_category_id INT,
  price INT NOT NULL,
  short_desc varchar(100) NOT NULL,
  long_desc varchar(300),
  img_url varchar(500) NOT NULL,
  added_time timestamp NOT NULL DEFAULT now(),

  FOREIGN KEY(sap_category_id) 
	    REFERENCES sap_categories(id)
        ON DELETE CASCADE
);

create TABLE orders (
  id INT GENERATED ALWAYS AS IDENTITY primary key,
  user_id INT,
  product_id INT,
  is_paid boolean not null default false,
  added_time TIMESTAMP not null DEFAULT NOW(),
  changed_time TIMESTAMP,
  count INT not null default 1,
  
  FOREIGN KEY(user_id) 
	    REFERENCES persons(id)
        ON DELETE CASCADE,
  FOREIGN KEY(product_id) 
	    REFERENCES products(id)
        ON DELETE CASCADE
);