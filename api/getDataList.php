<?php
# 先连接数据库
$con = mysqli_connect("127.0.0.1", "root", "", "9ji");

$page = $_REQUEST["page"] * 20;

$typeOrder = $_REQUEST["orderType"];

if($typeOrder == 0)
{
  # 获取所有的商品信息
  $sql = "SELECT * FROM `phones` order by `gid` limit $page , 20";
}else if($typeOrder == 1)
{
  $sql = "SELECT * FROM `phones` ORDER BY `phones`.`sale_price` DESC limit $page , 20";
}else if($typeOrder == 2)
{
  $sql = "SELECT * FROM `phones` ORDER BY `phones`.`sale_price` ASC limit $page , 20";
}



$result = mysqli_query($con,$sql);

# 转换为JSON数据返回
# 该方法返回PHP的数据，该数据中保存两份内容(数组 | 对象)
# mysqli_fetch_all($result, MYSQLI_NUM)   获得的数据是数组结构
# mysqli_fetch_all($result, MYSQLI_ASSOC) 获得的数据是对象结构
$data = array("status" => "success", "msg" => "请求成功", "data" => mysqli_fetch_all($result, MYSQLI_ASSOC));
echo json_encode($data, true);
?>