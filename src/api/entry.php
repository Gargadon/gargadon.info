<?php

require 'vendor/autoload.php';
require 'db.php';

$error = '';

header("Access-Control-Allow-Origin: " . $allow_origin);
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST");
header("Allow: GET, POST");
header("Content-Type: application/json");
$connect = new PDO($dsn, $db_user, $db_password);
$objeto = new stdClass();

if (empty($_GET['id'])) {

    // Consultamos si existe esta entrada
    $query = "SELECT entries.id, entries.title, entries.content, entries.date, users.username, users.avatar FROM entries INNER JOIN users ON entries.author = users.id ORDER BY entries.id DESC LIMIT 5";
    $entries = $connect->prepare($query);

    $entries->execute();

    $result = $entries->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($result);
    $entries = null;
    $query = null;
    echo $json;
} else {
    $id = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);
    $query = "SELECT entries.id, entries.title, entries.content, entries.date, users.username, users.avatar FROM entries INNER JOIN users ON entries.author = users.id WHERE entries.id = " . $id;
    $entries = $connect->prepare($query);
    $entries->execute();

    $result = $entries->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($result);
    $entries = null;
    $query = null;
    echo $json;
}
