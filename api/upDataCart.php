<?php 
$con = mysqli_connect("127.0.0.1", "root", "", "9ji");
$ppid = $_REQUEST["ppid"];
$isActive = $_REQUEST["isActive"];
/* 配置是否传了数据*/
$isAdd =$_REQUEST["isAdd"] == 3 ? 3 :$_REQUEST["isAdd"];

$sql = "SELECT * FROM  cart WHERE ppid = '$ppid'";
$result = mysqli_query($con,$sql);
   /* 002-购物车中已经存在该商品  更新数据 */
   $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
   /* 判断是否加减 */

    $num = $data[0]["num"];
   if($isAdd == 2){
      $num =  $num + 1;
   }elseif($isAdd == 1){
      $num =  $num - 1;
    
   };
   $total = $data[0]["price"] * $num;
  
   /* 更新 */
   $updateSql = "UPDATE cart SET num='$num',total='$total',isActive='$isActive' WHERE ppid='$ppid'";
   mysqli_query($con, $updateSql);

$totalCount = "SELECT * FROM  cart";
$results = mysqli_query($con, $totalCount);


# 转换为JSON数据返回
# 该方法返回PHP的数据，该数据中保存两份内容(数组 | 对象)
# mysqli_fetch_all($result, MYSQLI_NUM)   获得的数据是数组结构
# mysqli_fetch_all($result, MYSQLI_ASSOC) 获得的数据是对象结构
$datass =  mysqli_fetch_all($results, MYSQLI_ASSOC);
echo json_encode($datass, true);
// print_r($data) ;
// echo $num ;

?>



