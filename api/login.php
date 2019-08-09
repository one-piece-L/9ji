<?php
$db = mysqli_connect("127.0.0.1","root","","9ji");

$username = $_REQUEST["username"];
$password = $_REQUEST["password"];


$sqlname = "SELECT * FROM nameinfo  WHERE username = '$username' OR phone = '$username'";
$sqlpwd = "SELECT * FROM nameinfo  WHERE password = '$password'";

$data = array("status" => "", "msg" => "", "data" => "");
$result = mysqli_query($db,$sqlname);
// print_r($result) ;   mysqli_result Object ( [current_field] => 0 [field_count] => 5 [lengths] => [num_rows] => 1 [type] => 0 )
// 判断多少行
$row = mysqli_num_rows($result);

if($row == 1){
    $res = mysqli_query($db,$sqlpwd);
    $rows = mysqli_num_rows($res);
    if( $rows == 1){
        $data["status"] = "success";
        $data["msg"] = "恭喜你，登录成功！";
    }else {
        $data["status"] = "error";
        $data["msg"] = "登录失败：密码不正确！";
    }   
}else {
    $data["status"] = "error";
    $data["msg"] = "登录失败：用户名或手机号不存在！";
}
echo json_encode($data, true);
?>