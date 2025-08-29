<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Incluir helpers y cargar variables de entorno
require_once __DIR__ . '/helpers.php';
loadEnv(__DIR__ . '/../.env');


/*
Ejemplo: Configuración CORS para dominios específicos en PHP
Cuando quieras restringir el acceso CORS a un dominio o una lista de dominios específicos, 
en vez de usar '*' (que permite todos), 
debes configurar la cabecera HTTP Access-Control-Allow-Origin con el dominio deseado.

    // Permitir solo el dominio especificado
    header('Access-Control-Allow-Origin: https://tudominio.com');

    //Código para múltiples dominios permitidos (dinámico)
        $allowedOrigins = [
            'https://example.com',
            'https://midominio.com',
        ];

        if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
            header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
        } else {
            // Opcional: dominio por defecto o sin acceso
            header('Access-Control-Allow-Origin: https://default-allowed.com');
        }

*/

?>