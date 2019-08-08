$(function(){
    class goodlist{
        constructor(response){
            this.arr =response.data;
        }
        init(){
            this.careEle();
            this.addClick();
        }
        careEle(){
         let  lis =this.arr.map(function(ele){
                
                return  `<li data-ppid="${ele.ppid}">
                <i class="tag-img" style="background-image:url(${ele.promotionImage2});"></i>
                <a href="##" title="${ele.name} ${ele.profile}" class="main-pic-link">
                    <img src="${ele.imagePath}" class="lazy-img main-pic" loaded="true">
                </a>
                <div class="sku-color flex mt-5 overflow-hide"><a href="javascript:" title="${ele.name} " data-ppid="${ele.id}" class="flex-child-noshrink cur">
                <img src="${ele.imagePath}" class="lazy-img" loaded="true"></a>
                </div>
                <a href="##" title="${ele.name}  ${ele.profile}" class="lines-2 mt-5">
                ${ele.name}  ${ele.profile}
                </a>
                <div class="price mt-5 mb-5 flex">
                    <span>
                        <div role="tooltip" id="el-popover-1493" aria-hidden="true" class="el-popover el-popper" style="width:260px;display:none;" tabindex="0">
                            <p class="all-sku-none text-center">加载中...</p>
                        </div>
                        <b class="red font-14 el-popover__reference" aria-describedby="el-popover-1493" tabindex="0">￥${ele.price}</b>
                    </span>
    
                </div>
                <p class="grey-9">已有 <a href="" class="grey-9" "="">${ele.commentCount}</a>
                    人评价</p>
               <a href=" " class="mt-5 flex flex-align-center flex-justify-between"><span>${JSON.parse(ele.rank).text}</span></a>
            </li>`
            }).join(" ");
           
            
            $(".list").children().html(lis);

           
        }
        addClick(){
            $(".list ul").on("click","li",function(){
               let ppid = $(this).attr("data-ppid")
                // console.log( $(this).attr("data-ppid"));
                window.location.href="http://127.0.0.1:1905/9ji/html/goodproduct.html"+ `?ppid=${ppid}`
            })
        }
        
    }
    class side{
        constructor(data){
            this.arr = data;
            // this.imgs = `<img src=""class="lazy-img"  loaded="true">`
            // this.spans=`<span></span>`
        }
        init(){
            this.caretitle();
            this.addCss();
            this.addEvent()
        }
        caretitle(){
      
    let html =  this.arr.map(function(ele){
        let  item = ele.value.map(function(element){
          return ` <a href="##" class="">
                 <span >${element.name}</span>
                  </a>`
        }).join(" ");

      return  `<div class="screening-item flex" >
                     <span class="screening-title grey-9 flex-child-noshrink lines-1">${ele.name}:</span>
                <div class="screening-option flex flex-wrap flex-child-grow">
                    ${item}
                 </div>
             </div>`
   
      }).join(" ");
      $(".screening-box").html(html)
        }
        addCss(){
           let html = `<img src=""
            class="lazy-img"  loaded="true">`
            let temp = this.arr
            let items =  $(".screening-box .screening-item").eq(0)
             items.children("div") .addClass("brand-option").children("a").addClass("brand-item flex flex-center").html(html);
             items.children("div").children("a").children("img").each(function(i){
                 this.src =  temp[0].value[i].imagePath;
             })
             let frist = ` <a href="#"
                class="router-link-exact-active router-link-active main-bgcolor white">
                  <span>全部</span>
              </a>`
             items.nextAll().children("div").each(function(){
                    $(this).prepend(frist); 
             })   
        }
        // toggleEle(result){
        //     let temp = this.arr
        //     let items =  $(".screening-box .screening-item").eq(0).children("div") 
        //     if(result){
        //         items.removeClass("brand-option").children("a").removeClass("brand-item flex flex-center").html(this.spans);
        //         items.children("a").children().each(function(i){
        //             $(this).html =  temp[0].value[i].name;
                    
        //         })
        //     }
        //     else{
        //         items.addClass("brand-option").children("a").addClass("brand-item flex flex-center").html(this.imgs);
        //         items.children("a").children("img").each(function(i){
        //             this.src =  temp[0].value[i].imagePath; 
        //         })
        //     }
        
        // }
        
        addEvent(){
             /* 切换 */
           let item= $(".screening-box .screening-item").eq(0).children("div").children("a");
            //    item.click(()=>{
            //         let chang = $(this).children()
            //         console.log("aaa");
            //      if(chang.is("img")){
            //         this.toggleEle(0);
            //         console.log("aaa");
                    
            //      }else{
            //         this.toggleEle(1);
            //         console.log("bbbbb");
            //      }
                   
            //    })
            /* 点击展开与隐藏 */
            item.eq(13).nextAll().css("display","none");
             item.eq(13).click(function(){
                 $(this).nextAll().toggle();   
            })
         /*  更多选项 */ 
         let more = $(".screening-box .screening-item").eq(5).nextAll();
             more.css("display","none");
             
          $(".more-screening").click(function(){
              more.nextAll().toggle();
             
             let content =  $(this).children("span").html()
              if (content == "收起"){
                $(this).children("span").html("更多选项...")
              }else{
                $(this).children("span").html("收起")
              }      
         })
        }
    }
    
  
   $.getJSON("../json/phonenum.json", 
        function (data) {
            (new side(data)).init();
        }
    );
    /*   ------------------------------------- ------ */
    let orderType = 0;
    
    
    
    
    let getList = (page) => {
        $.ajax({
            type: "post",
            url: "../api/getDataList.php",
            data: `page=${page}&orderType=${orderType}`,
            dataType: "json",
            success: function(response) {
               
               
                // [2] 根据数据渲染页面
                (new goodlist(response)).init();
              
            }
        });

    }

    //[1] 获取服务器存储商品数据
    getList(0);

    // [2] 获取总页码
    $.ajax({
        type: "post",
        url: "../api/getPageCount.php",
        dataType: "json",
        success: function(response) {
            
             let sums    = response.data.sum
            let pageSize = response.data.count;
            for(let i = 1 ; i <= pageSize;i++){
                 $(".el-pager").append(`<li class="number">${i}</li>`);
              }
               $(".el-pager").children().eq(0).addClass("active")
            $("#page").children("a").eq(0).addClass("active");
            $(".box-title").children("span").html(`共搜索到${sums}个商品`);
            $(".el-pagination__total").html(`共${sums}条`);

        }
    });
    // 切换列表页
 (function addEvents(){
        //   用事件委托绑定事件
           $(".el-pager").on("click","li",function(){
               /* (1) 设置当前标签的选中状态 */
                $(this).addClass("active").siblings().removeClass("active");
                 /* (2) 发送网络更新页面 */
                 getList($(this).index());
           })
       })();
       /* 下一个 */
       $(".btn-next").click(function(){
            // $(".el-pager").children()
            let index =$(".el-pager").children(".active").index();
          let lengths = $(".el-pager").children().length -1;
          if(index<lengths){
            let index =$(".el-pager").children(".active").index();
            $(".el-pager").children().eq(index+1).addClass("active").siblings().removeClass("active");
              getList(index+1);
              console.log(122);
              
          }else{
    
            return false
          }
       })
       /* 上一个 */
         $(".btn-prev").click(function(){
            let index =$(".el-pager").children(".active").index();
          if(index>0){
            $(".el-pager").children().eq(index-1).addClass("active").siblings().removeClass("active");
              getList(index-1);
          }else{
            
             return false
          }
       })
       /* 排序 */
     $(".sort-direction").children().click(function(){
            let xun = $(this).index();
            let index =$(".el-pager").children(".active").index();
              
            if(xun){
                orderType = 2;
                getList(index)
                
            }else{
                
                orderType = 1;
                getList(index)
            }
            
     })

})