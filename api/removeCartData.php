<?php

$con = mysqli_connect("127.0.0.1", "root", "", "9ji");
$ppid = $_REQUEST["ppid"];
$sql = "DELETE FROM cart  WHERE ppid='$ppid'";
mysqli_query($con, $sql);
echo 1;
?>