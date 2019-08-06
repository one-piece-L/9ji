$(function(){
    /*  */
    /* 密码 */
    let pwdText = "";
    let cfpwdText="";
  
    /* 用户名 */
    let usernameText = "";
    /* 手机号码 */
    let phoneText = "";
    /* 邮箱号 */
    let mailText ="";
    /* 手机验证码 */
    let pcodeText ="";

    let pwdisok = false;
    let cfpwdisok=false;
  
    /* 用户名 */
    let usernameisok = false;
    /* 手机号码 */
    let phoneisok = false;
    /* 邮箱号 */
    let pcodeisok =false;


    /* 先获取信息输入框 */

    let userName = $("#userUID");
    let pwd      = $("#userpwd3");
    let cfpwd    = $("#userpwd4");
    let phone    = $("#usermobile2");
    let email    = $("#usermail");
    let pcode    = $("#phonecode2");
    
    let getcode = $("#dyMobileButton2");
    let check   = $("#mmprovision2");
    let reg     = $("#regbut2");


    //输入框的正则
    let regUsername = /^[a-zA-Z0-9\u4e00-\u9fa5]{4,16}$/;
    let regPwd      =/^[a-zA-Z0-9]{6,}$/;
    let regPhone    =/^1[3-9]\d{9}$/;
    let regEmail    =/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;


    
    // 切换注册表
    $(".zhuce-tab li").click(function () { 
        // e.preventDefault();
        
        $(this).addClass("xz").siblings().removeClass("xz")
        $(".reg").toggle();
        
        
    });  
    userName.blur(function(){
         let text = $.trim($(this).val());
          if(text.length==0){
              $(this).next().html("亲用户名不能为空哟！").css( "color","#f33");
              usernameisok = false
          }else if(!regUsername.test(text)){
            $(this).next().html("亲用户名格式不正确哟！").css( "color","#f33");
            usernameisok = false
          }else{
            $(this).next().html("太棒了！这是正确的用户名").css( "color","green")
            usernameText = text;
            usernameisok = true;
          }
    })
    pwd.blur(function(){
        let text = $.trim($(this).val());
         if(text.length==0){
             $(this).next().html("亲密码不能为空哟！").css( "color","#f33");
             pwdisok = false;
         }else if(!regPwd.test(text)){
           $(this).next().html("亲密码格式不正确哟！").css( "color","#f33");
           pwdisok = false;
         }else{
           $(this).next().html("太棒了！这是正确的密码").css( "color","green")
           pwdText = text;
           pwdisok = true;
         }
   }) ;
   cfpwd.blur(function(){
    let text = $.trim($(this).val());
     if(text.length==0){
         $(this).next().html("亲密码不能为空哟！").css( "color","#f33");
         cfpwdisok=false;
     }else if(text != pwdText){
       $(this).next().html("亲密码不一样哟！").css( "color","#f33");
       cfpwdisok=false;
     }else{
       $(this).next().html("太棒了！密码一致").css( "color","green")
       cfpwdText = text;
       cfpwdisok=true;
     }
   });  
   phone.blur(function(){
    let text = $.trim($(this).val());
     if(text.length==0){
         $(this).nextAll("em").html("亲手机号不能为空哟！").css( "color","#f33");
         phoneisok = false;
     }else if(!regPhone.test(text)){
       $(this).next().html("亲手机号不合法哟！").css( "color","#f33");
       phoneisok = false;
     }else{
       $(this).next().html("太棒了！这是正确的手机号").css( "color","green")
       phoneText = text;
       phoneisok = true;
     }
   });
   email.blur(function(){
    let text = $.trim($(this).val());
    if(text.length==0){
    }else if(!regEmail.test(text)){
       $(this).next().html("亲邮箱号不合法哟！").css( "color","#f33");
     }else{
       $(this).next().html("太棒了！这是正确的邮箱号").css( "color","green")
       mailText = text;
     }
   });
   pcode.blur(function(){
    let text = $.trim($(this).val());
    if(text.length==0){
        $(this).nextAll("em").html("验证码不能为空！").css( "color","#f33");
        pcodeisok =false}
    //  else if(!regEmail.test(text)){
    //    $(this).next().html("亲验证码不合法哟！").css( "color","#f33");
    //    pcodeisok =false}
     else{
       $(this).nextAll("em").html("太棒了！这是正确的验证码").css( "color","green")
       pcodeText = text;
       pcodeisok =true;
     }
   });
 
    /* 点击注册按钮的事件 */
    // (1) 先获取标签绑定点击事件
    // (2) 检查是否满足条件，如果满足条件那么就发送网络请求，否则提示
    // [1] 表单要验证通过  && [2] 勾选同意注册协议
      reg.click(function() {
			let isCheck = check.is(":checked");
			if (!isCheck) {
				alert("请阅读并同意用户协议");
            return;
        }
        console.log("aaaa");
        pcodeText = 2467;
        if (pwdisok &&
            cfpwdisok &&
            usernameisok &&
            phoneisok &&
            pcodeisok  
        ) {
            console.log("aaaa");
            
            $.ajax({
                type: "post",
                url: "../api/register.php",
                dataType: "json",
                data: `username=${usernameText}&password=${pwdText}&phone=${phoneText}&mail=${mailText}`,
                // dataType: "dataType",
                success: function(response) {
                   
                    console.log(response);
                    /* 先检查请求的结果，然后做出对应的处理 */
                    if (response.status == "success") {
                        alert(response.msg);
                        /* 跳转到登录页面 */
                        // window.location.href = "http://www.baidu.com"
                    } else {
                        console.log("aaaa");
                        
                        alert(response.msg);
                    }
                }
            });
        }
        else{
            alert("请完善信息！")
        }

        // http://127.0.0.1/day-31/Code/login/sever/api/register.php 
    })
    
    


})