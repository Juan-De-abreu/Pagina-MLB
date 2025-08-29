<?php
// core/helpers.php
function loadEnv(string $path): void {
    if (!file_exists($path)) {
        throw new Exception("El archivo .env no existe en: $path");
    }
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (str_starts_with(trim($line), '#')) {
            continue; // Ignorar comentarios
        }
        [$key, $value] = explode('=', $line, 2);
        $_ENV[trim($key)] = trim($value);
    }
}
?>