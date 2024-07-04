<?php

require 'vendor/autoload.php';
require 'db.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$error = '';

header("Access-Control-Allow-Origin: " . $allow_origin);
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: POST");
header("Allow: POST");

if (strtoupper($_SERVER['REQUEST_METHOD']) != 'POST') {
	throw new Exception('Only POST requests are allowed');
}

header("Content-Type: application/json");
$connect = new PDO($dsn, $db_user, $db_password);
$data = json_decode(file_get_contents('php://input'), true);
$objeto = new stdClass();
$id = '';
$username = '';

if (!empty($data)) {
	try {
		$decoded = JWT::decode($data['token'], new Key($key, 'HS256'));
		$id = $decoded->data->id;
		$username = $decoded->data->username;
		$nbf = $decoded->nbf;
		$exp = $decoded->exp;
		if ($nbf > time() || $exp < time()) {
			$objeto->logged = true;
			$objeto->error = 'Invalid token';
		} else {
			// Compruebo en la BD que el usuario existe
			$query = "SELECT * FROM users WHERE username = ?";
			$statement = $connect->prepare($query);
			$statement->execute([$username]);
			$data = $statement->fetch(PDO::FETCH_ASSOC);
			if ($data['id'] == $id) {
				$avatar = $data['avatar'];
				// Solo para mostrar usuarios
				$objeto->logged = true;
				$objeto->data = array(
					array('id' => $id),
					array('username' => $username),
					array('email' => $data['email']),
					array('avatar' => $avatar),
					array('nbf' => $nbf),
					array('exp' => $exp)
				);
			} else {
				$objeto->logged = false;
				$objeto->error = 'Invalid user';
			}
		}
	} catch (exception $e) {
		$objeto->logged = false;
		$objeto->error = 'Invalid user';
	}
} else {
	$objeto->logged = false;
	$objeto->error = 'User not logged';
}
$json = json_encode($objeto);
echo $json;
