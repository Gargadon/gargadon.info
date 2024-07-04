<?php

require 'vendor/autoload.php';
require 'db.php';

use Firebase\JWT\JWT;

$error = '';

header("Access-Control-Allow-Origin: " . $allow_origin);
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: POST");
header("Allow: POST");

if (strtoupper($_SERVER['REQUEST_METHOD']) != 'POST') {
    throw new Exception('Only POST requests are allowed');
}

$data = json_decode(file_get_contents('php://input'), true);
header("Content-Type: application/json");
$connect = new PDO($dsn, $db_user, $db_password);
$objeto = new stdClass();

if (empty($data)) {
    $error = 'Please Enter Email Details';
    $objeto->error = $error;
} else {
    $email = $data['email'];
    $password = $data['password'];
    $query = "SELECT * FROM users WHERE email = ?";
    $statement = $connect->prepare($query);
    $statement->execute([$email]);
    $data = $statement->fetch(PDO::FETCH_ASSOC);
    if ($data) {
        if (password_verify($password, $data['password_hash'])) {
            $token = JWT::encode(
                array(
                    'iat'        =>    time(),
                    'nbf'        =>    time(),
                    'exp'        =>    time() + 60 * 60 * 24 * 7,
                    'data'    => array(
                        'id'    =>    $data['id'],
                        'username'    =>    $data['username']
                    )
                ),
                $key,
                'HS256'
            );
            $objeto->token = $token;
        } else {
            $error = 'Wrong Password';
            $objeto->error = $error;
        }
    } else {
        $error = 'Wrong Email Address';
        $objeto->error = $error;
    }
}
$json = json_encode($objeto);
echo $json;
