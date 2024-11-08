Preciso de um esquema de tabelas onde preciso de clientes nome, telefone, endereço, referente de pagamento,horas trabalhado ,valor hora tabelas de funcionários nome, telefone dados bancários, horas trabalhado, valor hora e preciso de um pra serviço que teria o cliente, um ou mais funcionários, valor hora ,horas trabalhado, lembrando que pode ter um mais funcionários onde as horas trabalhado e o valor será dividido igualmente pra todos funcionários que trabalharam nesse serviço específico 



<?php

$databasePath = __DIR__ . '/banco.sqlite';
$pdo = new PDO('sqlite:' . $databasePath);

echo 'Conectei';

$pdo->exec("INSERT INTO phones (area_code, number, student_id) VALUES ('24', '999999999', 1), ('21', '22222222', 1);");


$createTableSql = '
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY,
        name TEXT,
        birth_date TEXT
    );

    CREATE TABLE IF NOT EXISTS phones (
        id INTEGER PRIMARY KEY,
        area_code TEXT,
        number TEXT,
        student_id INTEGER,
        FOREIGN KEY(student_id) REFERENCES students(id)
    );
';
$pdo->exec($createTableSql);
