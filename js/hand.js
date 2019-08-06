$(function(){
    class navList{
        constructor(data){
            this.arr =  data;
            console.log(this.arr); 
        };
       init(){
          this.careElement(); 
          this. addEvent()
       };
       careElement(){
        let list = this.arr.map(ele=>{
          let left = ele.more.map(function(element){
                    let a = element.clis.map(function(eles){
                 return `<a title="${eles}" href="##">${eles}</a>`
             }).join(" ")
             return ` <div class="nav-menu-item">
                        <h4 class="orange">${element.ctype}</h4>
                        <p>${a}</p>
                        </div>
                        `
         }).join(" ")
         let right =ele.src.map(function(eles){
                return `<a href="##" title=""><img src="${eles}"></a>`
            }).join(" ");
           
           let lis = ele.lis.map(function(eles){
                return `<a title="${eles}" href="##">${eles}</a>`
            }).join(" ");
          return `
          <dl>
           <dt >
            <b><i class="icon m2"></i>
              <a title="${ele.type}" href="##">${ele.type}</a>
             <s>&gt;</s></b>
             <span>${lis}</span>
          </dt>
          <dd style="display: none;">
              <div class="left">
                  ${left}
                  </div>
                  <div class="right">
                      <div class="menu_ad">
                       ${right}
                      </div>
                  </div>
            </dd>
         </dl>`                  
            
        }).join(" "); 
        $(".nav-menu").html(list)
       }
       addEvent(){
        //  切换样式
          $(".nav-menu dl").hover(function () {

            $(this).children("dd").css("display","block")
              // $(this).children("dd").attr("style","display: block;");
              $(this).children("dt").addClass("cut")
            }, function () {
              // $(this).children("dd").attr("style","display: none;");
              $(this).children("dt").removeClass("cut")
              $(this).children("dd").css("display","none")
            }
          );
       }
      
    }
    $.get({
      url:"../api/hand.php",
      dataType:"json",
      success(data){
          // console.log(data);
          let navlist = new navList(data);
          navlist.init() 
      }
  });

})