<?php

require 'vendor/autoload.php';
require 'db.php';

use Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: " . $allow_origin);
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: POST");
header("Allow: POST");
header("Content-Type: application/json");

try {
    if (strtoupper($_SERVER['REQUEST_METHOD']) != 'POST') {
        throw new Exception('Only POST requests are allowed');
    }

    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($data['email']) || empty($data['password'])) {
        throw new Exception('Please Enter Email and Password Details');
    }

    $connect = new PDO($dsn, $db_user, $db_password);
    $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $password = $data['password'];

    $query = "SELECT * FROM users WHERE email = :email";
    $statement = $connect->prepare($query);
    $statement->bindParam(':email', $email, PDO::PARAM_STR);
    $statement->execute();
    $user = $statement->fetch(PDO::FETCH_ASSOC);

    $response = new stdClass();

    if ($user && password_verify($password, $user['password_hash'])) {
        $token = JWT::encode(
            array(
                'iat' => time(),
                'nbf' => time(),
                'exp' => time() + 60 * 60 * 24 * 7,
                'data' => array(
                    'id' => $user['id'],
                    'username' => $user['username']
                )
            ),
            $key,
            'HS256'
        );
        $response->token = $token;
    } else {
        $response->error = 'Invalid Email or Password';
    }

    echo json_encode($response);

} catch (Exception $e) {
    $errorResponse = new stdClass();
    $errorResponse->error = $e->getMessage();
    echo json_encode($errorResponse);
}

?>
