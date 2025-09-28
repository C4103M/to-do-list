<?php 
namespace App\Config;
use PDO;
use PDOException;
use Dotenv\Dotenv;

require __DIR__ . '/../../vendor/autoload.php';

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();


class Database {
    private $host = '';
    private $db = '';
    private $user = '';
    private $pass = '';
    private $charset = '';
    private $pdo;

    public function __construct() {
        $this->host = $_ENV['DB_HOST'];
        $this->db = $_ENV['DB_NAME'];
        $this->user = $_ENV['DB_USER'];
        $this->pass = $_ENV['DB_PASS'];
        $this->charset = $_ENV['CHARSET'];

        $dns = "mysql:host={$this->host};dbname={$this->db};charset={$this->charset}";
        $options = [
            PDO::ATTR_ERRMODE =>PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO:: ATTR_EMULATE_PREPARES   => false,
        ];
        try {
            $this->pdo = new PDO($dns, $this->user, $this->pass, $options);
        } catch(PDOException $e) {
            echo('Erro na conexão: ' . $e->getMessage());
        }
    }
    public function getConection() {
        return $this->pdo;
    }

}
function test_database() {
    $bd = new Database;
    $con = $bd->getConection();
    if($con) {
        echo json_encode(["status" => "Conexão realisada com sucesso"]);
    }
}
