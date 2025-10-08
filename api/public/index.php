<?php header('Content-Type: application/json');

require __DIR__ . '/../vendor/autoload.php';

use App\Controllers\AuthController;
use App\Repository\UserRepository;
use App\Services\AuthService;
use App\Services\Response;
// Teste inserir usuário
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
function teste_cadastrar()
{
    $user_repo = new UserRepository();
    $insercao = $user_repo->cadastrar("Sergio Bastos", "sergio@10", "1234");
    $insercao->send();
}
function cadastrar() {
    $nome  = $_POST["nome"]  ?? null;
    $email = $_POST["email"] ?? null;
    $senha = $_POST["senha"] ?? null;
    // $token = $_POST['token'] ?? null;
    
    if ($nome !== null and $email !== null and $senha !== null) {
        $auth = new AuthService();
        try {
            // $data = $auth->decode_token($token);
            // $nome = $data['nome'];
            // $email = $data['email'];
            // $senha = $data['senha'];
            $user_repo = new UserRepository();
            $insercao = $user_repo->cadastrar($nome, $email, $senha);
            $insercao->send();
        } catch (Exception $e) {
            echo (new Response(400, "falha ao decodificar o token. Verifique os parâmetros que você passou ou a senha de codificação"))->send();
        }
    } else {
        (new Response(400, "Token inválido"))->send();
    }
}
function logar() {
    // $token = $_POST['token'] ?? null;
    $email = $_POST["email"] ?? null;
    $senha = $_POST["senha"] ?? null;

    if($email != null and $senha ) {
        $auth_service = new AuthService();
        try {
            // $data = $auth_service->decode_token($token);
            // $email = $data['email'];
            // $senha = $data['senha'];
            $resposta = $auth_service->login($email, $senha);
            $resposta->send();
        } catch(Exception $e) {
            echo (new Response($e->getCode(), "Falha ao decodificar o token. Verifique 
                os parâmetros que você passou ou a senha de codificação. Erro: ".
            $e->getMessage()))->send();
        }
    }
}



// Pega a URL requisitada
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Remove o prefixo "/public" se precisar
$uri = str_replace('/public', '', $uri);
$uri = str_replace('/api', '', $uri);

// Exemplo de roteamento simples
switch ($uri) {
    case '/cadastro':
        cadastrar();
        break;

    case '/login':
        logar();
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint não encontrado']);
        break;
}
