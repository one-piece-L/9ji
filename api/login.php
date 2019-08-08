<?php
$db = mysqli_connect("127.0.0.1","root","","9ji");

$username = $_REQUEST["username"];
$password = $_REQUEST["password"];


$sqlname = "SELECT * FROM nameinfo  WHERE username = '$username' OR phone = '$username'";
$sqlpwd = "SELECT * FROM nameinfo  WHERE password = '$password'"


?>