<?php

require 'vendor/autoload.php';
require 'db.php';

$error = '';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET");
header("Allow: GET");
header("Content-Type: application/json");
$connect = new PDO($dsn, $db_user, $db_password);

if (empty($_GET['id'])) {
    $error = 'Please Enter ID User Details';
    $objeto = new stdClass();
    $objeto->error = $error;
    $json = json_encode($objeto);
} else {
    $id = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);

    $query = "SELECT * FROM users WHERE id = ?";
    $statement = $connect->prepare($query);
    $statement->execute([$id]);
    $data = $statement->fetch(PDO::FETCH_ASSOC);
    if ($data) {
        $objeto = new stdClass();
        $objeto->id = $data['id'];
        $objeto->username = $data['username'];
        $objeto->avatar = $data['avatar'];
        $json = json_encode($objeto);
    } else {
        $error = 'ID User Not Valid';
        $objeto = new stdClass();
        $objeto->error = $error;
        $json = json_encode($objeto);
    }
}
echo $json;
