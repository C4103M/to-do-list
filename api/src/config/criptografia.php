<?php
require __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/config');
$dotenv->load();

$chave = $_ENV["key"]; 

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

include_once("/conection.php");

function criptografar($id, $nome, $email, $senha) {

    // $payload = [
    //     'iss' = 'backend_todo',
    //     'iat' => time(),          // hora que foi emitido
    //     'exp' => time() + 3600,   // expira em 1 hora
    // ]
}

function descriptografar($token) {
    
}