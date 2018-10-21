$(document).ready(function(){
    var unit= $(".line").css('marginTop');
    document.getElementsByClassName('one')[0].style.webkitTransform = 'rotate(0deg)'; 
    document.getElementsByClassName('two')[0].style.webkitTransform = 'rotate(0deg)'; 
    
    gg();
    t2heta();
})

$(function(){
    
    $(".nodes_container")
        .on('input', '.x_axis', function(){
            $(this).attr('value',$(this).val());
            //console.log(document.getElementById(1).css('position'));
            $("X:nth-child(" + parseInt($(this).attr('id')) + ")").css('left', $(this).val());
            alert($("#1").attr('id'));
        })
        .on('input', 'y_axis', function(){
            alert("inY");
        })
})
    
    function em(input) {
        let emSize = parseFloat($("body").css("font-size"));
        return (parseInt(emSize) * input);
    }


    var one_val, two_val, three_val, four_val;

    function change_angle_via_numin(){
        one_val = document.getElementsByClassName('one_value')[0].value,
        two_val = document.getElementsByClassName('two_value')[0].value,
        three_val = document.getElementsByClassName('three_value')[0].value,
        four_val = document.getElementsByClassName('four_value')[0].value;
        
        if(one_val>180||two_val>360||three_val>360||four_val>360){
            alert("input can't be higher than 360degree");
            // have some work to do here
        }else{
        document.getElementsByClassName('one')[0].style.webkitTransform = 'rotate('+one_val+'deg)'; 
        document.getElementsByClassName('two')[0].style.webkitTransform = 'rotate('+two_val+'deg)'; 
        document.getElementsByClassName('three')[0].style.webkitTransform = 'rotate('+three_val+'deg)'; 
        document.getElementsByClassName('four')[0].style.webkitTransform = 'rotate('+four_val+'deg)';
        }
    }
    
    function change_angle(){
        
        one_val = document.getElementsByClassName('in_one')[0].value,
        two_val = document.getElementsByClassName('in_two')[0].value,
        three_val = document.getElementsByClassName('in_three')[0].value,
        four_val = document.getElementsByClassName('in_four')[0].value;
        
        document.getElementsByClassName('one')[0].style.webkitTransform = 'rotate('+one_val+'deg)'; 
        document.getElementsByClassName('two')[0].style.webkitTransform = 'rotate('+two_val+'deg)'; 
        document.getElementsByClassName('three')[0].style.webkitTransform = 'rotate('+three_val+'deg)'; 
        document.getElementsByClassName('four')[0].style.webkitTransform = 'rotate('+four_val+'deg)';
        
        document.getElementsByClassName("one_value")[0].value= one_val;
        document.getElementsByClassName("two_value")[0].value= two_val;
        document.getElementsByClassName("three_value")[0].value= three_val;
        document.getElementsByClassName("four_value")[0].value= four_val;
        
    }

    var node_counter = 1;

    function add_nodes(){
        let node_ins= document.getElementsByClassName("nodes_container")[0];
        let node_actual = document.getElementsByClassName('nodes')[0];
        node_ins.innerHTML= node_ins.innerHTML +  '<div class="node_inputs_container"><span class="node_inputs_title">' + node_counter + '</span><input class="x_axis" id="' + node_counter + 'in"  type="number" value="0" oninput="setnodeX()"><input class="y-axis" type="number" value="0" oninput="setnodeY()"></div>';
        node_actual.innerHTML = node_actual.innerHTML + '<div class="node" id="' + node_counter + '"></div>';
        //this.innerHTML= '<h1>gg</h1>';
        node_counter+=1; 
    }








    var h1b = 11;
    var h2b = 11;
    var pie = 3.1416;
    var x=0;
    var y=0,z= 0;
    var h1= 10, h2= 10, x2= 2, y2= 10, theta= ((180 * atan(y2/x2)) / pie), h1v, h2v;

    
    function t2heta(){
        Math.atan(x2/y2);
        console.log( Math.atan(10/2) )
    } 
    
    function getN( x1, y1, x2, y2){
        return Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
    };
    

    var y2=20;
    
    function gg(){
        setTimeout(
            function(){
                h2v= ( ( 180 * Math.acos( ( ( h1 * h1 ) + ( h2 * h2 ) - ( getN(0,0,x2,y2) * getN(0,0,x2,y2) ) ) / ( 2 * h1 * h2 ) ) ) / pie );

                h1v= (180 - theta - ( ( 180 * Math.acos( ( ( h1 * h1 ) + ( getN(0,0,x2,y2) * getN(0,0,x2,y2) ) - ( h2 * h2 ) ) / ( 2 * h1 * getN(0,0,x2,y2)))) / pie ) ) ;

                console.log(h1v + " " + h2v);

                document.getElementsByClassName('three')[0].style.webkitTransform = 'rotate('+h1v+'deg)'; 
                document.getElementsByClassName('four')[0].style.webkitTransform = 'rotate('+( 360 - h2v)+'deg)'; 
                
                y2-=.1;
                
                if(y2>0){ gg();}

            }, 50);
        /*document.getElementsByClassName('three')[0].animate({
            webkitTransform: 'rotate('+h1v+'deg)'
        })*/
    }

    

    

    
    

    
    
    /*
    var grid= document.getElementsByClassName('grid')[0];
    var axisX= document.getElementsByClassName('axisX')[0];
    var axisY= document.getElementsByClassName('axisY')[0];
    var lineX= document.getElementsByClassName('X')[0].innerHTML;
    axisX.innerHTML+= axisX.innerHTML; 
    alert($(".grid").height());
    //for(var i=0; i< parseInt($(".grid").height()); i+=em(.5)){
       // axisX.innerHTML+= axisX.innerHTML;      
   // }*/
    
    