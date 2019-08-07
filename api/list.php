<?php
$db = mysqli_connect("127.0.0.1","root","","9ji");

# 查询数据库中商品的总数量(103)
$sql = "SELECT * FROM phones";
$result = mysqli_query($db, $sql);
$ListCount = mysqli_num_rows($result);

# 计算页码值(总共有多少页)
$count = 20;
$pageCount = ceil($ListCount / $count);

# JSON数据返回
$data = array("status"=>"success","msg"=>"获取成功","data"=>array("count"=> $pageCount));
echo json_encode($data, true);

?>