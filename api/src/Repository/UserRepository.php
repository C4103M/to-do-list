<?php

namespace App\Repository;

use PDO;
use App\Models\User;
use App\Config\Database;
use App\Services\AuthService;
use App\Services\Response;
use Exception;

class UserRepository
{
    private PDO $pdo;

    public function __construct()
    {
        $db = new Database;
        $this->pdo = $db->getConection();
    }

    public function findByEmail(string $email): ?User
    {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE email = :email LIMIT 1");
        $stmt->execute(['email' => $email]);
        $data = $stmt->fetch();

        if (!$data) {
            return null;
        }

        // Aqui você instancia o User já preenchido
        $usuario = User::fromDatabase($data);

        return $usuario;
    }

    public function cadastrar($nome, $email, $senhaPura)
    {
        try {
            $novoUsuario = User::createNew($nome, $email, $senhaPura);
            $stmt = $this->pdo->prepare("
            INSERT INTO users (nome, email, hash_senha) 
            VALUES (:nome, :email, :senha)
            ");
            $ok = $stmt->execute([
                'nome'  => $novoUsuario->getNome(),
                'email' => $novoUsuario->getEmail(),
                'senha' => $novoUsuario->getHash()
            ]);
            if (!$ok) throw new Exception("Algo deu errado", 500);
            // pega o ID gerado automaticamente
            $id = (int) $this->pdo->lastInsertId();
            $novoUsuario->setId($id);

            // Seta os cookies para requisições futuras

            $auth_service = new AuthService();
            $token = $auth_service->gerar_token($novoUsuario);
            $resp = $this->setTk($token);;
            return $resp;
        } catch (Exception $e) {
            return new Response($e->getCode(), $e->getMessage());
        }
    }
    public function setTk($tk)
    {
        try {
            $cookie_name = 'access_token';
            setcookie(
                $cookie_name,
                $tk,
                [
                    'expires' => time() + 3600,
                    'path' => '/',
                    'secure' => false,
                    'httponly' => true,
                    'samesite' => 'None'
                ]
            );
            http_response_code(201);
            return new Response(201, "Usuário cadastrado com sucesso");
        } catch (Exception $e) {
            return new Response($e->getCode(), $e->getMessage());
        }
    }
}
// GERAR UMA CLASSE CHAMADA RESPOSTA QUE VAI SER RESPONSÁVEL POR RETORNAR OU ERRO OU A RESPOSTA OK, DEPENDENDO DO QUE PRECISAR,
//  O UNICO PROBLEMA É QUE PRA CADA RESPOSTA EU TEREI TALVEZ O CONTEUDO DIFERENTE, AMANHÃ EU VEJO