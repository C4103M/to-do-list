<?php
namespace App\Services;

class Response implements \JsonSerializable {
    public int $status;
    private string $message;
    private mixed $token;

    public function __construct(int $status, string $message, $token = null) {
        $this->status = $status;
        $this->message = $message;
        $this->token = $token;
    }

    public function jsonSerialize(): mixed {
        return [
            'status' => $this->status,
            'message' => $this->message,
            'token' => $this->token
        ];
    }

    public function send(): void {
        echo json_encode($this);
        exit;
    }
}
