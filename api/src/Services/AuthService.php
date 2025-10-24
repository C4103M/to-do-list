<?php
namespace App\Services;

use Dotenv\Dotenv;
use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use App\Services\Response;
use App\repository\UserRepository;

require __DIR__ . '/../../vendor/autoload.php';

$dotenv = \Dotenv\Dotenv::createImmutable(__DIR__ . '/../Config');
$dotenv->load();

class AuthService
{
    private UserRepository $userRepo;
    private $key_jwt;
    
    public function __construct()
    {
        $this->userRepo = new UserRepository();
        $this->key_jwt = $_ENV["KEY"];
    }

    public function gerar_token(User $user)
    {
        $payload = [
            "id" => $user->getId(),
            "email" => $user->getEmail(),
            "nome" => $user->getNome(),
            "iat" => time(),
            "exp" => time() + 3600 // expira em 1h
        ];
        return JWT::encode($payload, $this->key_jwt, "HS256");
    }
    public function decode_token($token): array {
        $decoded = JWT::decode($token, new Key($this->key_jwt, 'HS256'));
        $decoded = (array) $decoded;
        return $decoded;
    }
    public function login(string $email, string $senha)
    {
        $user = $this->userRepo->findByEmail($email);
        if (!$user) {
            return new Response(404, "Usuário não encontrado");
        }
        if(!password_verify($senha, $user->getHash())) {
            return new Response(401, "Não autorizado");
        }
        $token = $this->gerar_token($user);
        return $this->userRepo->setTk($token);
    }
}
