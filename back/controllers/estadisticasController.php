<?php
// controllers/estadisticasController.php

require_once __DIR__ . '/../config/database.php';

class EstadisticasController
{

    // GET /api/estadisticas/top-war
    public function topWar()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT * 
                FROM jugadores 
                WHERE war >=30
                ORDER BY CAST(war AS DECIMAL(4,2)) DESC 
 
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top WAR: ' . $e->getMessage()]);
        }
    }

    //Get /api/estadisticas/top-hits

    public function tophits()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT * 
                FROM jugadores 
                WHERE hits >=1000
                ORDER BY hits DESC;
 
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top WAR: ' . $e->getMessage()]);
        }
    }

    // GET /api/estadisticas/top-avg
    public function topAvg()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                    *
                FROM jugadores 
                WHERE promedio_bateo >=0.280 and veces_al_bate>100
                ORDER BY CAST(promedio_bateo AS DECIMAL(4,3)) DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top AVG: ' . $e->getMessage()]);
        }
    }

    // GET /api/estadisticas/top-hr

    public function topHr()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                    *
                FROM jugadores 
                WHERE home_runs >=100
                ORDER BY home_runs DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top AVG: ' . $e->getMessage()]);
        }
    }


    // GET /api/estadisticas/top-dobles

    public function topDobles()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                    *
                FROM jugadores 
                WHERE dobles >=100
                ORDER BY dobles DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top AVG: ' . $e->getMessage()]);
        }
    }

    // GET /api/estadisticas/top-triples

 public function topTriples()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                    *
                FROM jugadores 
                WHERE triples >=30
                ORDER BY triples DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top AVG: ' . $e->getMessage()]);
        }
    }

    // GET /api/estadisticas/top-ops

    public function topOps()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                    *
                FROM jugadores 
                WHERE ops >=0.280
                ORDER BY CAST(ops AS DECIMAL(4,3)) DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top AVG: ' . $e->getMessage()]);
        }
    }
    
    // GET /api/estadisticas/top-rc (Runs Created)

    public function topRc()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                    *
                FROM jugadores 
                WHERE carreras_impulsadas >=700
                ORDER BY carreras_impulsadas DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top AVG: ' . $e->getMessage()]);
        }
    }

    // GET /api/estadisticas/top-iso (Isolated Power)

    public function topIso()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                    *,
                (porcentaje_slugging-promedio_bateo) AS iso
                FROM jugadores
                ORDER BY (iso) DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top AVG: ' . $e->getMessage()]);
        }
    }

    // GET /api/estadisticas/top-porcentajebb (Walk Percentage)

    public function topPorbb()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                    *
                FROM jugadores 
                where porcentaje_embase>0.250
                ORDER BY CAST( porcentaje_embase AS DECIMAL(4,3) ) DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top AVG: ' . $e->getMessage()]);
        }
    }
    
    // GET /api/estadisticas/top-k (Strikeout Percentage)

    public function topPork()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                *, ((ponches/veces_al_bate)*100) AS porcentaje_strike
                FROM jugadores  
                ORDER BY `porcentaje_strike` DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top AVG: ' . $e->getMessage()]);
        }
    }

    // GET /api/estadisticas/top-xbh (Extra-Base Hits)

        public function topEbh()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                *, (dobles+triples+home_runs) AS Extra_base_hits
                FROM jugadores  
                ORDER BY `Extra_base_hits` DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top AVG: ' . $e->getMessage()]);
        }
    }

    // GET /api/estadisticas/top-sb (Stolen Base Percentage)

        public function topPsb()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                *, ((bases_robadas)/(bases_robadas+atrapado_robando))*100 AS porcentaje_base_robada
                FROM jugadores  
                ORDER BY `porcentaje_base_robada` DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top AVG: ' . $e->getMessage()]);
        }
    }


    // GET /api/estadisticas/top-tb (Total Bases)

    public function topTb()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                *, (hits+(2*dobles)+(3*triples)+(4*home_runs)) AS total_bases
                FROM jugadores  
                ORDER BY `total_bases` DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top AVG: ' . $e->getMessage()]);
        }
    }

    // GET /api/estadisticas/top-allstar

    public function topAllstar()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                *
                FROM jugadores 
                where all_star_appearances>0
                ORDER BY all_star_appearances DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top AVG: ' . $e->getMessage()]);
        }
    }

    // GET /api/mapa/ciudades

public function topCity()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
               SELECT 
                j1.lugar_nacimiento,
                j2.total_jugadores,  
                j1.id,
                j1.nombre as jugador_destacado,
                j1.war as war_del_destacado
            FROM jugadores j1
            INNER JOIN (
                SELECT 
                    lugar_nacimiento,
                    MAX(war) as max_war,
                    COUNT(*) as total_jugadores  
                FROM jugadores
                WHERE lugar_nacimiento IS NOT NULL
                GROUP BY lugar_nacimiento
            ) j2 
            ON j1.lugar_nacimiento = j2.lugar_nacimiento 
            AND j1.war = j2.max_war
            ORDER BY j2.total_jugadores DESC, j1.nombre;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top 1B: ' . $e->getMessage()]);
        }
    }

    // GET /api/estadisticas/resumen
    public function resumen()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                    COUNT(*) as total_jugadores,
                    SUM(home_runs) as total_hr,
                    AVG(CAST(war AS DECIMAL(4,2))) as avg_war,
                    MAX(CAST(war AS DECIMAL(4,2))) as max_war,
                    (SELECT nombre FROM jugadores ORDER BY CAST(war AS DECIMAL(4,2)) DESC LIMIT 1) as mejor_war
                FROM jugadores
            ");
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($row);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener resumen: ' . $e->getMessage()]);
        }
    }
}
