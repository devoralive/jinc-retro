<?php
$now = (new DateTime())->format('U');

$data_dir = __DIR__ . DIRECTORY_SEPARATOR . 'datas';
if (!is_readable($data_dir) && !is_writable($data_dir)) {
    throw new Exception("Bad datas dir configuration", 500);
}

if (!isset($_POST['hash']) && !isset($_POST['id']) && !isset($_POST['position']) && !isset($_POST['target'])) {
    throw new Exception("Invalid Request", 500);
} else {
    $session_dir = $data_dir . DIRECTORY_SEPARATOR . $_POST['hash'];
    $user_file = $session_dir . DIRECTORY_SEPARATOR . $_POST['id'];
    $target_file = $session_dir . DIRECTORY_SEPARATOR . $_POST['target'];
}

if (!is_readable($session_dir)) {
    mkdir($session_dir);
}
if (!file_exists($user_file)) {
    touch($user_file);
}
if (!file_put_contents($user_file, $_POST['position'])] {
    throw new Exception("An Error occur during saving position", 500);
}

$response = new stdClass();
if (file_exists($target_file)) {
    $dif = filemtime($target_file);
    if ($dif > 60) {
        $response->connected = false;
    } else {
        $response->connected = true;
        $response->position = file_get_contents($target_file);
    }
}

echo json_encode($response);
exit(0);