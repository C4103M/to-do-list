<?php

class User {
    private $id;
    private $nome;
    private $email;
    private $hash_senha;

    public function __construct($id, $nome, $email, $senha)
    {
        $this->id = $id;
        $this->nome = $nome;
        $this->email = $email;

        // Tem que transformar a senha em hash.
        $hash = password_hash($senha, PASSWORD_DEFAULT);
        $this->hash_senha = $hash;
    }

    public function cadastrar(){
        $db = new Database();

    }
}