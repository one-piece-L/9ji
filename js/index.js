$(function(){
    /* 获取json数据 */
      $.getJSON("./json/index.json",
          function (data) {
            
           (new Troika(data)).radeUI();
           (new Floors(data)).radeUI()
         }
      );
     /* --------轮播图--------- */
    class Banner {
        constructor(){
             this.i = 0;
             this.timer = "";
        }
        init(){
            $(".banner-bd li").eq(2).css("display","block").siblings().css("display","none");
            $(".banner-hd li").eq(2).addClass("on").siblings().removeClass("on");
            this.Auto();
            this.Trigger()  
         }
        Trigger(){
             var temp = this
                     //这里用funtion的this指向<ul></ul>,用箭头函数不一样Banner
            $(".banner-bd,.banner-btn,.banner-hd li").hover(()=>{ 
                clearInterval( this.timer);
                $(".banner-btn").css("display","block");   
            },
            ()=>{
                this.Auto(); 
                $(".banner-btn").css("display","none")
            });
            //第一种思想没能实现
            // $(".banner-btn").click(function(){
            //     let index = $(this).index()
            //     console.log(index);
            //     console.log("第一个",$i);
            //     if(index=2){
            //         i++;
            //         console.log("2teo",i);
                    
            //     }else{
            //         i--;
            //         console.log("3pss",i);
            //     }
            // })
           //第二次实现了但不好
            // $(".banner-prev").click(()=>{
            //     this.i--;
            //       this.Togg();
            // })
            // $(".banner-next").click(()=>{
            //     this.i++;
            //     this.Togg();
            // })
            //第三次把第一次的构思实现了
            $(".banner-btn").click(function(){
                let indexs = $(this).index()
                if(indexs == 2){
                    temp.i--;
                }else{
                    temp.i++;
                }
                  temp.Togg();
            })

          $(".banner-hd li").on("click mouseenter",function(){
                let index = $(this).index()
                      temp.i = index;
                   temp.Togg();  
          })  
         }
         Togg(){
            if(this.i>=3){
                this.i = 0;
               };
              $(".banner-bd li").eq(this.i).css("display","none").siblings().stop().fadeToggle(800);
              $(".banner-hd li").eq(this.i).addClass("on").siblings().removeClass("on")
                 
         }
        Auto(){  
                                 //这里用箭头函数this指向Banner和funtion指向Windows是
         this.timer = setInterval(()=>{
            this.i++;
            this.Togg();    
            },3000)    
        }
    }
    (new Banner()).init();
    /*---------  三架马车 ---------  */
    class Troika{
        constructor(data){
          this.arr = data.troika.item;
        }
        radeUI(){
             let list =  this.arr.map((element)=>{
                   return `<div class="troika-list margin-right">
                         ${this.radeTitle(element.title)}
                         ${this.radeBody(element.list)}
                     </div>
                    `
             }).join(" "); 
             $("#go_troika").html(list);
             $(".troika-list").eq(2).removeClass("margin-right");
            let body =  $(".troika-body");
            body.children(".left").children("a:even").addClass("big-img").children("img").css({width:"160px", height:"160px"});
            body.children(".left").children("a:odd").addClass("bottom-img").children("img").css({width:"80px", height:"80px"});
            body.children(".right").children("a").children("img").css({width:"80px", height:"80px"})
        }
        radeTitle(tit){
         return  `<div class="troika-title">
              <a href="${tit.ad.url}">
                <img class="get-src" data-src="${tit.id}" src="${tit.src}"
                width="393" height="54" alt="${tit.ad.title}">
             </a>
            </div>`
        }
        radeBody(list){
            let items = $.map(list,function(ele){
                return ` <a href="${ele.ad.url}" title="${ele.ad.title}" class="anim-left" target="detail">
                <img class="get-src" data-src="${ele.id}"
                    src="${ele.src}" alt="${ele.ad.title}">
                <div class="diy-tip">
                    <h3 style="color:#e2933e">${ele.ad.title}</h3>
                    <p>${ele.ad.tip}</p>
                </div>
                 </a>`
             })
           return ` <div class="troika-body">
                            <div class="left">
                              ${items[0] + items[1]}
                            </div>
                            <div class="right">
                               ${items[2] + items[3] + items[4]}
                            </div>
                        </div>` 
        }
    }
    /* ------机友派------------ */
    class Floors{
        constructor(data){
            this.arr = data.floors.item;
        }
        init(){

        }
        radeUI(){
         let floor = this.arr.map((ele)=>{

               return `   <div id="go_floor${ele.id+1}" class="diy-floor ${ele.style} monitor">
                <div class="floor-title">
              <a href="${ele.title.ad.url}">
               <img class="get-src" data-src="${ele.title.id}" src="${ele.title.src}" width="1200" height="54" alt="${ele.title.ad.title}">
               </a>
            </div>
            ${this.radeMain(ele)}
            ${ this.radeLink(ele)}
               </div>
           `
            });
            //   let appends = $(floor)
            $("#floor").append(floor)


           
        }
     
        radeMain(ele){ 
    
            /* --------leftAD ------*/
            let phrase = ele.leftAD.phrase.list.map(function(eles){
                return ` <span>
                  <a class="light" title="${eles.text}" href="${eles.url}">${eles.text}</a>
                    </span>`
            }).join(" ");
            let leftAD =`  <div class="leftAD">
            <a href="${ele.leftAD.ad.ad.url}" title="${ele.leftAD.ad.ad.title}" class="topAD anim-zoom">
                <img class="get-src" data-src="${ele.leftAD.ad.id}" src="${ele.leftAD.ad.src}" width="190" height="290" alt="${ele.leftAD.ad.ad.title}">
                <div class="diy-tip">
                    <h3 style="color:${ele.color}">${ele.leftAD.ad.ad.title}</h3>
                    <p class="grey-6">${ele.leftAD.ad.ad.tip}</p>
                </div>
            </a>
            <div class="bottomAD" style="background:${ele.color}">
                <a href="${ele.leftAD.text.url}" title="${ele.leftAD.text.value}" class="textAD ellipsis" style="background:${ele.color}">${ele.leftAD.text.value}<em>&gt;</em></a>
                <dl>
                    <dt>${ele.leftAD.phrase.title}</dt>
                    <dd>
                    ${phrase}
                    </dd>
                </dl>
            </div>
        </div>`
         /* ------- shoplist------------*/
        let tempColor = ele.color;
        let lis = ele.shoplist.map(function(element){
              return ` <li>
                <a href="${element.ad.url}" title="${element.ad.title}" class="anim-left">
                    <img class="get-src" data-src="${element.id}" src="${element.src}" width="120" height="120" alt="${element.ad.title}">
                    <div class="diy-tip" style="color:${tempColor}">
                        <h3>${element.ad.title}</h3>
                        <p style="color: #555">${element.ad.tip}</p>
                        <div data-ppid="${element.ad.ppid}" class="get-price">￥7450.00</div>
                    </div>
                </a>
            </li>`
        }).join(" ");
        
        let shoplist =`<div class="shop-list">
        <ul class="overflow-hide">
            ${lis}
             
        </ul>
         </div>`
          /* -------- rightAD -----------*/
          let tip = ele.rightAD.map(function(elees){
              return ` <a href="${elees.ad.url}" class="anim-left">
              <img class="get-src" data-src="${elees.id}" src="${elees.src}" width="80" height="80" alt="${elees.ad.title}">
                 <div class="diy-tip" style="color:${tempColor}">
                     <h3>${elees.ad.title}</h3>
                    <p style="color:#555">${elees.ad.tip}</p>
                 </div>
             </a>`
          }).join(" ");
          let rightAD = `<div class="rightAD">
                       ${tip}
                    </div>`

            return  `<div class="floor-main">
                        ${leftAD}${shoplist}${rightAD}
                    </div>`

        }
        radeLink(ele){
            let tempColor = ele.color;
           let a = ele.link.map(function(elements){
                return `<a href="${elements.url}" style="color:${tempColor}">${elements.text}</a>`          
            }).join(" ");
            return  ` <div class="brand-link">
            <div class="link-list">
            <span class="left" style="color:${ele.color}">品质推荐</span>
                    ${a}
             </div>
             <div class="link-bg" style="background:${ele.color}"></div>
         </div>`
        }
    }
    /* -----电梯--------*/
    class Lift{
        constructor(){
            this.oNav = $(".diy-elevator"); //导航壳
            this.aNav = oNav.find('li'); //导航
            this.aDiv = $('#main .louceng'); //楼层
             this.oTop = $('#goTop'); //回到顶部 
        }
        monitor(){
            $(window).scroll(function() {
                //可视窗口高度
                var winH = $(window).height();
                //鼠标滚动的距离
                var iTop = $(window).scrollTop();
    
                if(iTop >= $("#header").height()) {
                    oNav.fadeIn();
                    oTop.fadeIn();
                    //鼠标滑动样式改变
                    aDiv.each(function() {
                        if(winH + iTop - $(this).offset().top > winH / 2) {
                            aNav.removeClass('active');
                            aNav.eq($(this).index()).addClass('active');
                        }
                    })
                } else {
                    oNav.fadeOut();
                    oTop.fadeOut();
                }
            })
        }
        leap(){
              //点击回到当前楼层
    aNav.click(function() {
        var t = aDiv.eq($(this).index()).offset().top;
        $('body,html').animate({
            "scrollTop": t
        }, 500);
        $(this).addClass('active').siblings().removeClass('active');
    });
    //回到顶部
    oTop.click(function() {
        $('body,html').animate({
            "scrollTop": 0
        }, 500)
    })
        }
    }
    var oNav = $('#LoutiNav'); //导航壳
    var aNav = oNav.find('li'); //导航
    var aDiv = $('#main .louceng'); //楼层
    var oTop = $('#goTop'); //回到顶部 
    $(window).scroll(function() {
            //可视窗口高度
            var winH = $(window).height();
            //鼠标滚动的距离
            var iTop = $(window).scrollTop();

            if(iTop >= $("#header").height()) {
                oNav.fadeIn();
                oTop.fadeIn();
                //鼠标滑动样式改变
                aDiv.each(function() {
                    if(winH + iTop - $(this).offset().top > winH / 2) {
                        aNav.removeClass('active');
                        aNav.eq($(this).index()).addClass('active');
                    }
                })
            } else {
                oNav.fadeOut();
                oTop.fadeOut();
            }
        })
    //点击回到当前楼层
    aNav.click(function() {
        var t = aDiv.eq($(this).index()).offset().top;
        $('body,html').animate({
            "scrollTop": t
        }, 500);
        $(this).addClass('active').siblings().removeClass('active');
    });
    //回到顶部
    oTop.click(function() {
        $('body,html').animate({
            "scrollTop": 0
        }, 500)
    })
})
