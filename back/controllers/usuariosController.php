<?php
require_once __DIR__ . '/../config/database.php';

class usuariosController
{
    private $pdo;

    public function __construct()
    {
        global $pdo;
        $this->pdo = $pdo;
    }

    // GET /api/usuarios
    public function AllUsuarios()
    {
        try {
            $stmt = $this->pdo->query("SELECT * FROM usuarios ORDER BY id ASC");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener usuarios: ' . $e->getMessage()]);
        }
    }

    // GET /api/usuarios/{id}
    public function UsuarioById($id)
    {
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM usuarios WHERE id = ?");
            $stmt->execute([$id]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$row) {
                http_response_code(404);
                echo json_encode(['message' => 'Usuario no encontrado']);
                return;
            }

            echo json_encode($row);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener el usuario: ' . $e->getMessage()]);
        }
    }

    // POST /api/usuarios
    public function createUsuario()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!$data) {
            http_response_code(400);
            echo json_encode(['error' => 'Datos JSON inválidos']);
            return;
        }

        if (empty($data['email']) || empty($data['password']) || empty($data['nombre'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Email, contraseña y nombre son obligatorios']);
            return;
        }

        $passwordHash = password_hash($data['password'], PASSWORD_DEFAULT);

        try {
            $stmt = $this->pdo->prepare("INSERT INTO usuarios (email, password_hash, nombre, es_admin, creado_en) 
                                           VALUES (:email, :password_hash, :nombre, :es_admin, NOW())");
            $stmt->execute([
                ':email' => $data['email'],
                ':password_hash' => $passwordHash,
                ':nombre' => $data['nombre'],
                ':es_admin' => $data['es_admin'] ?? 0,
            ]);

            $id = $this->pdo->lastInsertId();
            $stmt2 = $this->pdo->prepare("SELECT * FROM usuarios WHERE id = ?");
            $stmt2->execute([$id]);
            $usuarioCreado = $stmt2->fetch(PDO::FETCH_ASSOC);

            http_response_code(201);
            echo json_encode($usuarioCreado);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error en base de datos: ' . $e->getMessage()]);
        }
    }

    // PUT /api/usuarios/{id}
    public function updateUsuario($id)
    {
        header('Content-Type: application/json');
        $data = json_decode(file_get_contents("php://input"), true);

        if (!$data) {
            http_response_code(400);
            echo json_encode(['message' => 'Datos inválidos']);
            return;
        }

        $fields = [];
        $params = [];

        if (isset($data['nombre'])) {
            $fields[] = "nombre = ?";
            $params[] = $data['nombre'];
        }
        if (isset($data['email'])) {
            $fields[] = "email = ?";
            $params[] = $data['email'];
        }
        if (isset($data['password']) && strlen($data['password']) > 0) {
            $password_hash = password_hash($data['password'], PASSWORD_BCRYPT);
            $fields[] = "password_hash = ?";
            $params[] = $password_hash;
        }

        if (count($fields) === 0) {
            http_response_code(400);
            echo json_encode(['message' => 'No hay campos para actualizar']);
            return;
        }

        $params[] = $id;
        $sql = "UPDATE usuarios SET " . implode(", ", $fields) . " WHERE id = ?";

        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($params);

            http_response_code(200);
            echo json_encode(['message' => 'Usuario actualizado correctamente']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Error actualizando usuario']);
            error_log($e->getMessage());
        }
    }

    // DELETE /api/usuarios/{id}
 public function eliminarUsuario($id)
{
    try {
        // Iniciar transacción
        $this->pdo->beginTransaction();

        // Verificar que el usuario exista
        $stmtCheck = $this->pdo->prepare("SELECT id FROM usuarios WHERE id = ?");
        $stmtCheck->execute([$id]);
        if ($stmtCheck->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(['error' => 'Usuario no encontrado']);
            return;
        }

        // Eliminar de favoritos_equipos
        $stmtFavEquipos = $this->pdo->prepare("DELETE FROM favoritos_equipos WHERE user_id = ?");
        $stmtFavEquipos->execute([$id]);

        // Eliminar de favoritos_jugadores
        $stmtFavJugadores = $this->pdo->prepare("DELETE FROM favoritos_jugadores WHERE user_id = ?");
        $stmtFavJugadores->execute([$id]);

        // Eliminar de notificaciones_usuarios
        $stmtNotificaciones = $this->pdo->prepare("DELETE FROM notificaciones_usuario WHERE usuario_id = ?");
        $stmtNotificaciones->execute([$id]);

        // Finalmente eliminar al usuario
        $stmt = $this->pdo->prepare("DELETE FROM usuarios WHERE id = ?");
        $stmt->execute([$id]);

        // Confirmar transacción
        $this->pdo->commit();

        http_response_code(200);
        echo json_encode(['mensaje' => 'Usuario y datos relacionados eliminados exitosamente']);
    } catch (PDOException $e) {
        // Revertir si hay error
        $this->pdo->rollBack();
        http_response_code(500);
        echo json_encode(['error' => 'Error en base de datos: ' . $e->getMessage()]);
    }
}

}
