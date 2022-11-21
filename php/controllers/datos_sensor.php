<?php
session_start();
include_once("../model/conect.php");
$sql = new SQLConexion();
$row = $sql->selectData("
SELECT id_datos,equipo,temperatura,humedad,presion,fecha_hora
FROM datos_sensor
ORDER BY id_datos DESC
LIMIT 20;
");
if($row){
    $response_array['status'] = 'success';
    $response_array['datos'] = json_encode($row);
}else{
    $response_array['status'] = 'error';
}
header('Content-type: application/json');
echo json_encode($response_array);