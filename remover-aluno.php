<?php

require_once 'vendor/autoload.php';

$pdo = \Alura\Pdo\Infrastructure\Persistence\ConnectionCreator::createConnection();

$preparedStatement = $pdo->prepare('DELETE FROM students WHERE id = ?;');
$preparedStatement->bindValue(1, 5, PDO::PARAM_INT);
var_dump($preparedStatement->execute());





public static function encryptDataSisprime($data)
{
    $key = str_replace('-', '', getenv('SECRET_KEY_SISPRIME'));
    $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc'));

    $encrypted = openssl_encrypt($json_encode($data), 'aes-256-cbc', $key, 0, $iv);

    // Concatena com "::" o conteúdo criptografado e o IV
    $payload = $encrypted . '::' . $iv;

    // Codifica em base64 e depois faz urlencode (simulando o fluxo inverso da decriptação)
    return 'content=' . urlencode(base64_encode($payload));
}














<?php

namespace App\Helpers;

class TrataData
{
    public static function treatDataSisprime($input)
    {
        if (!empty($input['content'])) {
            $decodedData = base64_decode($input['content']);
        } elseif (empty($input[0])) {
            $inputJson = json_encode(file_get_contents('php://input'));
            $input0 = str_replace('content=', '', $inputJson);
            $decodedData = base64_decode($input0);
        } else {
            $input0 = str_replace('content=', '', $input[0]);
            $decodedData = base64_decode($input0);
        }

        $partes = explode('::', $decodedData);
        $decryptedData = openssl_decrypt(
            $partes[0],
            'aes-256-cbc',
            str_replace('-', '', getenv('SECRET_KEY_SISPRIME')),
            0,
            $partes[1]
        );
        if (empty($decryptedData)) {
            $decryptedData = openssl_decrypt(
                $partes[0],
                'aes-256-cbc',
                str_replace('-', '', 'e29119fb-7dcb-47c3-9be1-87e2ea254ca8'),
                0,
                $partes[1]
            );
        }
        return json_decode($decryptedData, true);
    }
}
