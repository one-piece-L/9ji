<?php
$con = mysqli_connect("127.0.0.1", "root", "", "9ji");
$sql = "SELECT cart.*,phones.name,phones.price,phones.imagePath FROM cart , phones WHERE cart.ppid = phones.ppid";
$result = mysqli_query($con, $sql);
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($data, true);

?>