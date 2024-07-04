<?php

require 'vendor/autoload.php';
require 'db.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Access-Control-Allow-Origin: " . $allow_origin);
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: POST");
header("Allow: POST");
header("Content-Type: application/json");

try {
    if (strtoupper($_SERVER['REQUEST_METHOD']) != 'POST') {
        throw new Exception('Only POST requests are allowed');
    }

    $connect = new PDO($dsn, $db_user, $db_password);
    $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents('php://input'), true);
    $response = new stdClass();

    if (empty($data) || empty($data['token'])) {
        throw new Exception('User not logged in');
    }

    $decoded = JWT::decode($data['token'], new Key($key, 'HS256'));
    $id = $decoded->data->id;
    $username = $decoded->data->username;
    $nbf = $decoded->nbf;
    $exp = $decoded->exp;

    if ($nbf > time() || $exp < time()) {
        throw new Exception('Invalid token');
    }

    // Verify user in the database
    $query = "SELECT * FROM users WHERE username = :username";
    $statement = $connect->prepare($query);
    $statement->bindParam(':username', $username, PDO::PARAM_STR);
    $statement->execute();
    $user = $statement->fetch(PDO::FETCH_ASSOC);

    if ($user && $user['id'] == $id) {
        $response->logged = true;
        $response->data = array(
            'id' => $user['id'],
            'username' => $user['username'],
            'email' => $user['email'],
            'avatar' => $user['avatar'],
            'nbf' => $nbf,
            'exp' => $exp
        );
    } else {
        throw new Exception('Invalid user');
    }

    echo json_encode($response);

} catch (Exception $e) {
    $errorResponse = new stdClass();
    $errorResponse->logged = false;
    $errorResponse->error = $e->getMessage();
    echo json_encode($errorResponse);
}

?>
