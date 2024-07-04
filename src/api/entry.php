<?php

require 'vendor/autoload.php';
require 'db.php';

header("Access-Control-Allow-Origin: " . $allow_origin);
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST");
header("Allow: GET, POST");
header("Content-Type: application/json");

try {
    $connect = new PDO($dsn, $db_user, $db_password);
    $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $query = "SELECT entries.id, entries.title, entries.content, entries.date, users.username, users.avatar FROM entries INNER JOIN users ON entries.author = users.id";
    
    if (!empty($_GET['id'])) {
        $id = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);
        $query .= " WHERE entries.id = :id";
    }
    
    $query .= " ORDER BY entries.id DESC LIMIT 5";
    $entries = $connect->prepare($query);
    
    if (!empty($_GET['id'])) {
        $entries->bindParam(':id', $id, PDO::PARAM_INT);
    }
    
    $entries->execute();
    $result = $entries->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

?>
