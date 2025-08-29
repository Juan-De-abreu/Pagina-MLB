<?php
// config/database.php

$host = $_ENV['DB_HOST'] ;
$dbname = $_ENV['DB_NAME'] ;
$username = $_ENV['DB_USER'] ;
$password = $_ENV['DB_PASS'] ;

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Conexión fallida: ' . $e->getMessage()]);
    exit;
}


/* Ejemplo de conexión con PostgreSQL usando PDO
try {
    $pdoPg = new PDO("pgsql:host=$host;port=5432;dbname=$dbname;user=$username;password=$password");
    $pdoPg->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Conexión PostgreSQL fallida: ' . $e->getMessage()]);
    exit;
}
*/

/* Ejemplo de conexión con SQL Server usando PDO
try {
    $pdoSqlsrv = new PDO("sqlsrv:Server=$host;Database=$dbname", $username, $password);
    $pdoSqlsrv->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Conexión SQL Server fallida: ' . $e->getMessage()]);
    exit;
}
*/

/* Ejemplo de conexión con MySQLi (procedural)
$mysqli = mysqli_connect($host, $username, $password, $dbname);
if (!$mysqli) {
    http_response_code(500);
    echo json_encode(['error' => 'Conexión MySQLi fallida: ' . mysqli_connect_error()]);
    exit;
}
*/
?>