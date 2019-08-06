$(function(){
    class goodlist{
        constructor(data){
            
        }
        init(){

        }
        care
    }

    $.getJSON("../json/goodslist.json", 
        function (data) {
            (new goodlist(data)).init()
        }
    );
    
})