$(function(){
   class cart{
       constructor(){
            this.data;
            this.checkeds=true;
            this.remove();
       }
       init(){
        this.getCatInfo()
        
        
       }
       checkEvent(){
        $(".checkAll").click(function(){
            //  让其他的变成自己的状态
              $("input[type='checkbox']").prop("checked",$(this).is(":checked"));
        
         })
         $(".cart-box").on("click",".cart-item input:checkbox",function(){
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
                
             html +=  ` <div class="cart-item">
               
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
                         <div class="count"><a href="javascript:;">-</a> <input type="text"  disabled ="disabled" value="${element.num}"> <a
                                 href="javascript:;">+</a></div>
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
           $(".nums").html(nums)  ; 
       }
       remove(){
        // $(".action a:even");
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
       add(){
        $(".count a[1]")
       }
       
    }
(new cart()).init();
})