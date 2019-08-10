$(function(){
   class cart{
       constructor(){
            this.data;
            this.checkeds=true;
          
       }
       init(){
        this.getCatInfo();
        this.remove();
        this.add();
        
       }
       checkEvent(){
          var temp = this;
        $(".checkAll").click(function(){
            //  让其他的变成自己的状态
              $("input[type='checkbox']").prop("checked",$(this).is(":checked"));
              
         })
         $(".cart-box").on("click",".cart-item input:checkbox",function(){
                temp.updata(this,3);   
                if($(this).prop("checked")==false){
                    $(".checkAll").prop("checked",false)
                }else if($(".cart-item input:checked").length == $(".cart-item:not(.cart-title) input:checkbox").length){
                    $(".checkAll").prop("checked",true)
                }     
         })
       }
    /* 获取数据库中所有购物车相关的信息 */
       getCatInfo(){
           $.ajax({
               type: "post",
               url: "../api/getCartData.php",
               dataType: "json",
               success:  (response)=> {
                  this.data = response;
                  this.redeEle(this.data);
                  this.checkEvent()
                  this. totalPrices();
                  
               }
           });
       }
       redeEle(data){
           let html ="";
           data.forEach(element => {
                if(element.isActive != 1){
                    this.checkeds =false;
                }
                
             html +=  ` <div class="cart-item" data-ppid="${element.ppid}">
               
                     <div class="cart-check"><label class="checkbox radio-box"><input type="checkbox" ${element.isActive==1?"checked":""}></label></div>
                     <div class="cart-product-box relative">
                         <div class="invalid-mark none"></div>
                         <div class="product"><a href="##" class="block relative left pro-img-box">
                         <img src="${element.imagePath}">
                                 </a>
                             <div class="product-title">
                                 <h5>
                                 <a href="##" target="_blank">${element.name} </a></h5>
                                 <div class="margin-top"></div>
                                 <div class="jiuji-server margin-top overflow-hide">
                                  <a href="javascript:;" class="grey-9"><i class="baoxiu"></i>选服务</a>
                                 </div>
                             </div>
                         </div>
                         <div class="unit-price"><b>${element.price}</b></div>
                         <div class="discount">0.00</div>
                         <div class="count"><a href="javascript:;" class="minus">-</a> <input type="text"  disabled ="disabled" value="${element.num}"> <a
                                 href="javascript:;" class="add">+</a></div>
                         <div class="sum"><b class="main-color">${element.total}</b></div>
                         <div class="action"><a  class="move-to-favorate">移入收藏夹</a> <a  class="del"
                                  data-ppid="${element.ppid}">删除</a></div>
                     </div>
             </div>`  
            
           });
           $(".cartparent").html(html);
           $(".checkAll").prop("checked",this.checkeds);    
           
       }
       totalPrices(){
           var res = 0;
           var nums = 0;
           this.data.forEach(function(ele){

               if(ele.isActive == 1){
                    res +=  ele.total*1;
                    nums +=  ele.num*1;  
                 }
           })
           $(".totals").html(`￥${res.toFixed(2)}`);
           $(".nums").html(nums); 
       }
       remove(){
        
        var temp = this;
        $(".cart-box").on("click",".del",function(){
              var ppid = $(this).data("ppid")
              $.ajax({
                  type: "post",
                  url: "../api/removeCartData.php",
                  data: `ppid=${ppid}`,
                  dataType: "json",
                  success: function (response) {
                    temp.getCatInfo(); 
                  }
              });
          
            
             
            
        })

       }
       updata(temp,isAdd){
        var ppid  = $(temp).parents(".cart-item").data("ppid");
        var isActive =$(temp).parents(".cart-item").children(".cart-check").children().children().prop("checked");
       
        
        if(isActive){
            isActive = 1;
        }else{
            isActive = 0;
        }
         
         $.ajax({
             type: "post",
             url: "../api/upDataCart.php",
             data: `ppid=${ppid}&isAdd=${isAdd}&isActive=${isActive}`,
             dataType: "json",
             success: (response)=> {
               this.data = response;
               this.totalPrices();
             }
         });
       }
       add(){
           var temp = this;
        $(".cartparent").on("click",".add",function(){
            var num = $(this).siblings("input:text").val()*1;
            var total = $(this).parent().siblings(".unit-price").children().text()*1;
               num = num +1; 
               total = total*num
            $(this).siblings("input:text").val(num); 
            $(this).parent().siblings(".sum").children().text(total);
            temp.updata(this,2);
        })
        $(".cartparent").on("click",".minus",function(){
            var num = $(this).siblings("input:text").val()*1;
            var total = $(this).parent().siblings(".unit-price").children().text()*1;
            if(num >1){
                num = num - 1;
                total = total*num
                $(this).siblings("input:text").val(num); 
                $(this).parent().siblings(".sum").children().text(total);
                temp.updata(this,1);
            }
        })
        $(".cartparent").on("click",".cart-item input:checkbox",function(){

        })
       
       }
       
    }
(new cart()).init();
})