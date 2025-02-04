<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:X-Request-With');
header('Access-Control-Allow-Methods: GET,POST,PUT,DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

//namespace
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Slim\Factory\AppFactory;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;


// require '../../vendor/autoload.php';
require '../src/config/db.php';

$app = AppFactory::create();

$secretKey = "l0l@123"; // ki me zgjedh ni secretkey qfaredush tani ki me perdor per enkriptim edhe dekriptim
$ACCESS_TOKEN_LIFESPAN_IN_SECONDS = 28800; // 8 Hours in seconds

$app->get('/', function (Request $request, Response $response) {
    $response->getBody()->write("Hello world!");
    return $response;
});

// Add newsletter
$app->post('/api/newsletter/add', function (Request $request, Response $response) {
    $get = json_decode(file_get_contents("php://input"));
    //$name_customerNwl = "test";
    //$email_customerNwl = "test";

    $name_customerNwl = $get->data->name_customerNwl;
    $email_customerNwl = $get->data->email_customerNwl;
    $ip_address = $_SERVER['REMOTE_ADDR'];


    $sql = "INSERT INTO customers_nwl (name_customerNwl	, email_customerNwl, ip_address)
	VALUES(:name_customerNwl, :email_customerNwl, :ip_address)";


    try {
        //Get DB Object
        $db = new db();
        //Connect
        $db = $db->connect();
        //look in database if there are data with that email
        $query = $db->prepare("SELECT  * FROM customers_nwl WHERE email_customerNwl = :email_customerNwl");
        $query->bindParam(':email_customerNwl', $email_customerNwl);
        $query->execute();
        //if it´s 0 add it if not error email
        if ($query->rowCount() == 0) {
            //adds data
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':name_customerNwl', $name_customerNwl);
            $stmt->bindParam(':email_customerNwl', $email_customerNwl);
            $stmt->bindParam(':ip_address', $ip_address);
            $stmt->execute();

            //it returns response for success
            $response->getBody()->write(json_encode(array(
                "response" => 200
            )));
        } else {
            $response->getBody()->write(json_encode(array(
                "response" => "email_customerNwl"
            )));
        }
        return $response;
    } catch (PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}';
    }
});

// Login
$app->post('/api/login', function (Request $request, Response $response) {
    global $secretKey;
    $get = json_decode(file_get_contents("php://input"));

    $email = $get->data->email;
    $password = $get->data->password;

    $sql = 'SELECT * FROM users WHERE email = :email';

    try {
        //Get DB Object
        $db = new db();
        //Connect
        $db = $db->connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // check if user found with email
        if ($stmt->rowCount() > 0) {
            // check user password
            // create jwt
            if (password_verify($password, $row['password'])) {
                $jwt = generateJwtToken('localDB', $secretKey, $row['id_users'], $row['email']);

                $response->getBody()->write(json_encode(array(
                    "response" => $jwt
                )));

            } else {
                // todo response with http code in header 403
                $response->getBody()->write(json_encode(array(
                    "response" => 403
                )));

            }
        } else {
            $response->getBody()->write(json_encode(array(
                "response" => 403
            )));
        }

        return $response;

    } catch (PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}';
    }
});
//Generate JWT Token
function generateJwtToken($strategy, $secretKey, $user_id, $email): string
{
    $payload = array(
        "user_id" => $user_id,
        "email" => $email,
        "iat" => time(), // current timestamp
        "strategy" => $strategy
    );
    return  JWT::encode($payload, $secretKey, 'HS512');
}



//Azure Custom JWT Token
$app->post('/api/azure_callback', function (Request $request, Response $response) {
    global $secretKey;
    //$get = json_decode(file_get_contents("php://input"));
    //$get = json_decode($_POST);
    //print_r($request->getParams());
    //print_r($get->getParsedBody());
    //exit();
    //$email = $request->getParam('email');
    //$password = $request->getParam('password');
    $params = $request->getParsedBody();
    $user_id = $params['user_id'];
    $email = $params['email'];
    $password = $params['password'];
    /**
     * 1.read parameter from request(email...)
     * 2.Call generate jwt token ('azure', 'user_id', 'email'...)
     * 3.Response (write jwt token )
     */
    $request->getAttribute($request);
    $jwt = generateJwtToken('azure', $secretKey, $user_id, $email, $password);
    $response->getBody()->write(json_encode(array(
        "response" => $jwt
    )));

    return $response;
});


// Check user
$app->get('/api/checkuser/{token}', callable: function (Request $request, Response $response) {
    global $secretKey;
    global $ACCESS_TOKEN_LIFESPAN_IN_SECONDS;

    $jwt = $request->getAttribute('token');
    $decode = JWT::decode($jwt, new Key($secretKey, 'HS512')); // Dekriptimi per  mi mar tdhenat se a jon nrregull

    $user_id = $decode->user_id; // Data prej payload qe e kemi nlogin
    $email = $decode->email;
    $iat = $decode->iat;
    $strategy = $decode->strategy;
    $expirationTime = $iat + $ACCESS_TOKEN_LIFESPAN_IN_SECONDS;
    $currentTime = time();


    // check if access token still valid
    if ($expirationTime < $currentTime) {
        return $response->withStatus(403);
    }

    if ($strategy === 'azure') {

    } elseif ($strategy === 'localDB') {

    }

    try {
        //Get DB Object
        $db = new db();
        //Connect
        $db = $db->connect();

        $sql1 = 'SELECT * FROM users WHERE email = :email AND id_users = :id_users';
        $statement = $db->prepare($sql1);
        $statement->bindParam(':email', $email);
        $statement->bindParam(':id_users', $user_id);
        $statement->execute();

        if ($statement->rowCount() !== 0) {
            return $response->withStatus(200);

        } else {
            return $response->withStatus(403);

        }

    } catch (PDOException $e) {
        $response->getBody()->write(json_encode(array(
            "response" => $e->getMessage()
        )));
    }
    return $response;
});


//Get all Data
$app->post('/api/admin', function (Request $request, Response $response) {

    $sql = 'SELECT * FROM customers_nwl';
    try {
        //Get DB Object
        $db = new db();
        //Connect
        $db = $db->connect();

        $stmt = $db->query($sql);
        $users = $stmt->fetchALL(PDO::FETCH_OBJ);
        $db = null;
        $response->getBody()->write(json_encode($users));
        return $response;

    } catch (PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}';
    }
});


//Get User by ID
$app->get('/api/newsletter/{id_customerNwl}', function (Request $request, Response $response) {
    $id_customerNwl = $request->getAttribute('id_customerNwl');

    try {
        //Get DB Object
        $db = new db();
        //Connect
        $db = $db->connect();
        $sql = "SELECT * FROM customers_nwl WHERE id_customerNwl = '$id_customerNwl'";
        $stmt = $db->query($sql);
        $users = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;
        $response->getBody()->write(json_encode($users));
        return $response;

    } catch (PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}';
    }
});


// Delete user
$app->delete('/api/admin/delete/{id_customerNwl}', function (Request $request, Response $response) {
    $id_customerNwl = $request->getAttribute('id_customerNwl');

    $sql = "DELETE FROM customers_nwl WHERE id_customerNwl = '$id_customerNwl'";
    try {
        //Get DB Object
        $db = new db();
        //Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);
        $stmt->execute();
        $response->getBody()->write(json_encode(array(
            "response" => 200

        )));
        return $response;

    } catch (PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}';
    }
});

//Edit
$app->post('/api/newsletter/edit', function (Request $request, Response $response) {
    $get = json_decode(file_get_contents("php://input"));
    // $name_customerNwl = 'test';
    // $email_customerNwl = 'test';
    // $id_customerNwl = 2;

    $name_customerNwl = $get->data->name_customerNwl;
    $email_customerNwl = $get->data->email_customerNwl;
    $id_customerNwl = $get->data->id_customerNwl;
    try {
        //Get DB Object
        $db = new db();
        //Connect
        $db = $db->connect();

        $sql1 = 'SELECT * FROM customers_nwl WHERE email_customerNwl = :email_customerNwl AND id_customerNwl != :id_customerNwl';
        $statement = $db->prepare($sql1);
        $statement->bindParam(':email_customerNwl', $email_customerNwl);
        $statement->bindParam(':id_customerNwl', $id_customerNwl);
        $statement->execute();

        if ($statement->rowCount() === 0) {
            $sql = "UPDATE customers_nwl SET email_customerNwl = :email_customerNwl, name_customerNwl = :name_customerNwl WHERE id_customerNwl = '$id_customerNwl'";
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':name_customerNwl', $name_customerNwl);
            $stmt->bindParam(':email_customerNwl', $email_customerNwl);
            $stmt->execute();

            $response->getBody()->write(json_encode(array(
                "response" => 200

            )));
        } else {
            $response->getBody()->write(json_encode(array(
                "response" => 403

            )));
        }

    } catch (PDOException $e) {
        $response->getBody()->write(json_encode(array(
            "response" => $e->getMessage()

        )));
    }
    return $response;
});


?>