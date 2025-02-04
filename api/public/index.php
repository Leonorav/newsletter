<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:X-Request-With');
header('Access-Control-Allow-Methods: GET,POST,PUT,DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

require '../src/routes/index.php';
$app->run();