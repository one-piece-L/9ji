$(function(){

    class loging{
        constructor(){
            
        }
        init(){
            this.getUser();
        }
        getInfo(){
            $.ajax({
                type: "post",
                url: "../api/login.php",
                data: `username=${this.user}&password=${this.pwd}`,
                dataType: "JSON",
                success: function (response) {
                     if(response.status == "error"){
                        alert(`${response.msg}`) ;

                     }else{
                        alert(`${response.msg}`);
                        window.location.href = "http://127.0.0.1:1905/9ji/index1.html"
                     }
                }
            });
        }
        getUser(){

           $("a.login-button").click(()=>{
               console.log("aaa");
               
            this.user =  $.trim($(".login-input[type='text']").val());
            this.pwd  =  $.trim($(".login-input[type='password']").val())
            if(this.user.length == 0){
                alert("请输入用户名或手机号");
              }else{
                    if(this.pwd.length == 0){
                        alert("请输入密码");
                    }else{
                        this.getInfo()
                    }
                
               }
           })
         
        }
    }
  (new loging()).init();

})