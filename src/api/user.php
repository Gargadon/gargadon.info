<?php

require 'vendor/autoload.php';
require 'db.php';

header("Access-Control-Allow-Origin: " . $allow_origin);
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET");
header("Allow: GET");
header("Content-Type: application/json");

try {
    $connect = new PDO($dsn, $db_user, $db_password);
    $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    if (empty($_GET['id'])) {
        $error = 'Please Enter ID User Details';
        $objeto = new stdClass();
        $objeto->error = $error;
        echo json_encode($objeto);
        exit;
    }
    
    $id = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);

    $query = "SELECT * FROM users WHERE id = :id";
    $statement = $connect->prepare($query);
    $statement->bindParam(':id', $id, PDO::PARAM_INT);
    $statement->execute();
    $data = $statement->fetch(PDO::FETCH_ASSOC);
    
    if ($data) {
        $objeto = new stdClass();
        $objeto->id = $data['id'];
        $objeto->username = $data['username'];
        $objeto->avatar = $data['avatar'];
        echo json_encode($objeto);
    } else {
        $error = 'ID User Not Valid';
        $objeto = new stdClass();
        $objeto->error = $error;
        echo json_encode($objeto);
    }
    
} catch (PDOException $e) {
    $error = 'Database Error: ' . $e->getMessage();
    $objeto = new stdClass();
    $objeto->error = $error;
    echo json_encode($objeto);
}

?>
