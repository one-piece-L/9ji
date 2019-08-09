$(function(){

    class product{
        constructor(){
           this.ppid = window.location.search.slice(1).split("=")[1];
           
        }
        getData(){
            $.ajax({
                type: "post",
                url: "../api/getproduct.php",
                dataType: "json",
                data:`ppid=${this.ppid}`,
                success: (response) =>{
                    
                    this.responses = response.data[0];
                    
                    this.redeLeft(this.responses)
                    this.redeRight();
                    this.addCart()
                }
            });
        }
        init(){
           this.getData();
           /* 给购物车按钮添加点击事件 */
        //    $(".product-btn").click(function() {
        //     window.location.href ="./cart.html";
        //    })
        }
        redeLeft(arr){
             let lis =''
            for(let i = 0;i<5; i++){
                lis += ` <li class="thumb-item">
                  <img src="${arr.imagePath}"
                    class="responsive-image thumb" >
                 </li>`
              }  
           let html = `<div class="preview-box">
            <img src="${arr.imagePath}"
                class="preview-image">
             </div>
             <div class="control-box" >
                <span class="angle-left">&lt;</span>
            <ul class="thumb-list">
                 ${lis}
            </ul>
            <span class="angle-right">&gt;</span>
            </div>` 
            $(".preview-wrap").html(html);
        }
        addLeftEevent(){
            $("")
        }
        redeRight(){
            let data = this.responses;
          let html =  ` <h2>${data.name}</h2>
            <p class="rot">${data.profile}</p>
            <div class="product-price">
               <p>九机价:  &nbsp;&nbsp;<span class="hotprice">￥${data.price}</span>[价格走势]</p>
               <p>销量排行:  &nbsp;&nbsp;<span>${JSON.parse(data.rank).text}</span></p>
               <div class="pinlun">
                   <dl>
                       <dt>用户评价</dt>
                       <dd>${data.commentCount}</dd>
                   </dl>
                   <dl>
                        <dt>商品咨询</dt>
                        <dd>${data.consultCount}</dd>
                    </dl>
                    <dl>
                            <dt>好评率</dt>
                            <dd>${data.praiseRate}</dd>
                    </dl>
               </div>
            </div>
            <div class="select">
                <dl>
                    <dt>容量：</dt>
                    <dd>8 + 128 GB</dd>
                    <dd>8 + 256 GB</dd>
                </dl>
            </div>`
            $(".params-wrapper").prepend(html);;
        }
        addCart(){
              /* 加入购物车的功能 */
    $(".product-btn").click( () =>{
       console.log("aaaaa");
       
        var ppid = this.ppid;
        var price = this.responses.price;       
        $.ajax({
            type: "get",
            url: "../api/addCartData.php",
            data: `ppid=${ppid}&price=${price}`,
            dataType: "json",
            success: function(response) {
                // console.log(response);
                /* 购物车的图标 */
                // var text = response["totalRow"];
                // $("#catShow").html(text)

            }
        });

    })

        }

    }
    (new product()).init();
   
})


