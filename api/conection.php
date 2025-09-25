<?php 
class Database {
    private $host = "mysql";
    private $db = "dbaura";
    private $user = "aura_user";
    private $pass = "1234";
    private $charset = 'utf8mb4';
    private $pdo;

    public function __construct() {
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
$bd = new Database;
$con = $bd->getConection();
if($con) {
    echo json_encode(["status" => "Conexão realisada com sucesso"]);
}
echo 'tee';