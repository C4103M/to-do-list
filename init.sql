CREATE TABLE users(
	id int auto_increment primary key,
	nome varchar(50) not null,
    email varchar(50) unique not null,
    hash_senha varchar(100) not null
);