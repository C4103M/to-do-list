<?php

namespace App\Models;

class User
{
    private ?int $id;
    private string $nome;
    private string $email;
    private string $hash_senha;

    // Construtor agora é privado e apenas atribui valores
    private function __construct(string $nome, string $email, string $hash_senha, ?int $id = null)
    {
        $this->id = $id;
        $this->nome = $nome;
        $this->email = $email;
        $this->hash_senha = $hash_senha;
    }
    public static function createNew(string $nome, string $email, string $senhaPura): self
    {
        $hash = password_hash($senhaPura, PASSWORD_DEFAULT);
        // 'self' se refere à própria classe User.
        // Aqui chamamos o construtor privado com os dados já tratados.
        return new self($nome, $email, $hash);
    }
    public static function fromDatabase(array $data): self
    {
        return new self(
            $data['nome'],
            $data['email'],
            $data['hash_senha'], // Passando o hash diretamente
            (int) $data['id']
        );
    }
    // Getters e Setters
    public function getHash()
    {
        return $this->hash_senha;
    }
    public function getId()
    {
        return $this->id;
    }
    public function getEmail()
    {
        return $this->email;
    }
    public function getNome()
    {
        return $this->nome;
    }
    public function setId(int $id): void
    {
        $this->id = $id;
    }
}
