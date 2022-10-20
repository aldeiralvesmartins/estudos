<?php

namespace Alura\Pdo\Infrastructure\Persistence;

use PDO;

class ConnectionCreator
{
    public static function createConnection(): PDO
    {
        $connection = new PDO(
            'mysql:host=mysql-57:3306;dbname=app_db',
            'r2soft',
            'r2147258369'
        );
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
var_dump($connection);exit;
        return $connection;
    }
}
