$(document).ready(function () {
    //making the grid map draggable and resizable
    var map = $(".map_container");

    map.draggable();


    $(".map_container").bind('mousewheel DOMMouseScroll', function (event) {

        let height = parseInt(map.outerHeight());
        let width = parseInt(map.outerWidth());
        let step = 2;

        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
            map.css({
                "height": height + ((height * 2) / 100),
                "width": width + ((width * 2) / 100)
            })
        } else {
            map.css({
                "height": height - ((height * 2) / 100),
                "width": width - ((width * 2) / 100)

            })
        }

    })




    /////// highlight on hover


    // define the height, width and bot size in centemeter
    total_width = 100;
    total_height = 100;
    bot_size = 20;
    total_box = (total_height / bot_size) * (total_width / bot_size);
    box_in_x = total_width / bot_size;
    box_in_y = total_height / bot_size;

    document.getElementsByClassName('Xco-ordinate_input')[0].setAttribute('max', box_in_x - 1);
    document.getElementsByClassName('Yco-ordinate_input')[0].setAttribute('max', box_in_y - 1);

    //populating the pixels array
    populate(total_width / bot_size, total_height / bot_size, "UND");

    for (let i = 0; i < total_box; i++) {
        document.getElementsByClassName('map_container')[0].innerHTML += '<div class="pixel"></div>';
    }


    $(".pixel").css({
        "width": 100 / (total_width / bot_size) + "%",
        "height": 100 / (total_height / bot_size) + "%"
    })

    var X_val = 0,
        Y_val = 0;
    
    

    $(".XYsubmit").click(function () {
        X_val = document.getElementsByClassName("Xco-ordinate_input")[0].value;
        Y_val = document.getElementsByClassName("Yco-ordinate_input")[0].value;
        //console.log(X_val + " , " + Y_val);
        MarkObs(X_val, Y_val)
        console.log(GetPixel(X_val, Y_val));
    })
    
    $(".pixel").click(function(){
        let Conates = GetCOordinates($(this).index());
        let x=Conates[0];
        let y=Conates[1];
        if(pixels[getIndex(x,y)].state == "OBS"){
            UnMarkObs(x,y,"DIS");
            unsavepixel(x,y);
        }else{
            savepixel(x,y);
            MarkObs(x,y,"OBS");
        }
    })
    
    console.log(pixels);
    console.log("pixels22");
    console.log(pixels[0]);
    pathfind(pixels, pixels[0], pixels[pixels.length - 1]);
})

//jquery code ends here :D















var pixels = []; //an array to hold all the objects(the grid) 

var obstacles = []; //array to hold the obstacles

function pixel(X, Y, obs) {
    this.X_co_ordinate = X;
    this.Y_co_ordinate = Y;
    this.state = obs; //availale states OPN, UND, OBS, DIS, NULL
    this.g = 0;
    this.h = 0;
    this.f = 0;
    this.last = null;
} //every block in the grid is a pixel

//01719372596

function populate(height, width, obs_val = "UND") {
    
    pixels[0] = new pixel(0, 10, obs_val);
    
    for (h = height-1, i = 0; h >= 0; h--) {
        for (w = 0; w < width; w++, i++) {
            var temp_obs = new pixel(w, h, obs_val);
            //temp_obs.last = pixels[0];
            pixels[i] = temp_obs; //saving temp_pixel object to pixels array
        }
    }
        
} //populating the grid AKA pixels with pixel objects or blocks


function MarkObs(x = 0, y = 0, obs_val = null) {

    let i = getIndex(x,y);
    console.log(i);
    document.getElementsByClassName('pixel')[i].style.background = "black";

    let pix = GetPixel(x, y);
    console.log(pix);
    pix.state = obs_val;

    return GetPixel(x, y);
} // mark the selected pixels as an obstacle

function UnMarkObs(x=0, y=0, obs_val= "DIS"){
    let i = getIndex(x,y);
    document.getElementsByClassName('pixel')[i].style.background = "white";
    
    let pix = GetPixel(x,y);
    pix.state = obs_val;
    
    return GetPixel(x,y);
} // mark the selected pixels as open

function GetCOordinates(i) {
    
    let x = i % box_in_x;
    let y = box_in_y - ((i - x) / box_in_x) - 1;
    
    return [x,y];
} //get x and y value of the object when passed the index of the object in the pixel array

function getIndex(x, y) {
    return (box_in_x * (box_in_y - y - 1)) + (parseInt(x));
} // reverse of getcoordinates()

function GetPixel(x, y) {

    return pixels[getIndex(x, y)];
} // return the pixel when passed x and y val


var obs_array_index = 0;

function savepixel(x = 0, y = 0) {

    let bulletString = obs_array_index;
    let valString = "(" + x + "," + y + ")";
    document.getElementsByClassName("val_container_mother")[0].innerHTML += '<div class="val_container"><span class="bullet">' + "" + '</span><span class="val">' + valString + '</span> </div>';
    obstacles[obs_array_index] = GetPixel(x,y);
    obs_array_index++;
} 

function unsavepixel(x=0,y=0){
    obs_array_index--;
    let i = obstacles.indexOf(pixels[getIndex(x,y)]);
    console.log(i);
    obstacles.splice(i,1);
    let ToRemove = document.getElementsByClassName('val_container')[i];
    ToRemove.remove();
    console.log(ToRemove);
}






///////////////////////////////////////////////////////////


// this funtion is where the problem shows up most of the times
function getG(current, start, NEW){
    
    if(current.g != 0){
        let g = 1;
        while (current && current != start && current.last != start){
            current = current.last;
            g++;
        }
        current.g = g;
        return current.g;   
    }else{
        return current.g;
    }
} //get the g val(cost to come to this pixel from the start) of the current pixel


function getH(current, end){
    let I = Math.abs(current.X_co_ordinate - end.X_co_ordinate) + Math.abs(current.Y_co_ordinate - end.Y_co_ordinate);
    return I;
} //get the h val(heuristic) of the current pixel

function getF(start,current,end){
    return getG(current,start) + getH(current,end);
} //get the f val(total) of the current pixel

function lowFinArray(arr,start,end){
    // here arr is the grid
    let current_low = arr[0];
    for(let i=0; i<arr.length; i++){
        if(getF(start, current_low, end) < getF(start, arr[i], end)){
            current_low = arr[i];
        }
    }
    
    console.log("current low");
    console.log(current_low);
    
    return current_low;
}

function getneighbours(grid, current){
    
    let neighbours = [];
    
    let tpixel = grid[getIndex(current.X_co_ordinate-1, current.Y_co_ordinate)];
    if(typeof tpixel !== "undefined" && tpixel.state != "OBS"){
        console.log("came in 1 and " + typeof tpixel);
        neighbours.push(grid[getIndex(current.X_co_ordinate-1, current.Y_co_ordinate)]);   
    }
    
    tpixel = grid[getIndex(current.X_co_ordinate+1, current.Y_co_ordinate)];
    if(typeof tpixel !== "undefined" && tpixel != "OBS"){
        console.log("came in 2 and " + typeof tpixel);
        neighbours.push(grid[getIndex(current.X_co_ordinate+1, current.Y_co_ordinate)]);
    }
    
    tpixel = grid[getIndex(current.X_co_ordinate, current.Y_co_ordinate-1)];
    //console.log(getIndex(current.X_co_ordinate, current.Y_co_ordinate-1));
    //console.log(tpixel);
    if(typeof tpixel !== "undefined" && tpixel != "OBS"){
        console.log("came in 3 and " + typeof tpixel);
        neighbours.push(grid[getIndex(current.X_co_ordinate, current.Y_co_ordinate-1)]);   
    }
    
    tpixel = grid[getIndex(current.X_co_ordinate, current.Y_co_ordinate+1)];
    //console.log(getIndex(current.X_co_ordinate, current.Y_co_ordinate+1));
    //console.log(tpixel);
    if(typeof tpixel !== "undefined" && tpixel != "OBS"){
        console.log("came in 4 and " + typeof tpixel);
        neighbours.push(grid[getIndex(current.X_co_ordinate, current.Y_co_ordinate+1)]);   
    }
    
    return neighbours;
} //get the neighbour pixels of the current pixel



//main algo
function pathfind(grid_actual, start, end){
    
    let closedSet = [];
    let grid = grid_actual;
    let openSet = [];
    console.log(openSet);
    openSet = [start];
    console.log(openSet);
    let current = start;
    console.log("start at the very beginning");
    console.log(start);
    console.log("openset at the very beginning");
    console.log(openSet);
    
    //trying to debug
    /*console.log("low F in arr");
    console.log(lowFinArray(grid, start, end));
    console.log(start);
    console.log(current);
    console.log(end);
    console.log(grid);
    */
    
    let x=0;
    while(openSet.length > 0){
        
        //trying to debug
        console.log("executed " + (x++));
        console.log("openset before slice");
        console.log(openSet);
        
        
        current = lowFinArray(openSet, start, end); //assigning the pixel with lowest f val to current
        openSet.splice(openSet.indexOf(current), 1);
        console.log("current");
        console.log(current);
        console.log("openset after slice");
        console.log(openSet);
        
        if(current === end){
            console.log("getPath");
            console.log(getPath(current));
            return 0;
        }
        
        let neighbours = getneighbours(grid, current);
        console.log("neighbours");
        console.log(neighbours);
        for(let i=0; i<neighbours.length; i++){
            
            let neighbour = neighbours[i];
            //console.log("neighbour");
            //console.log(neighbour);
            
            if(neighbour === undefined){
                console.log("neighbour is undefined. continuing")
                continue;
            }
            
            if(closedSet.includes(neighbour)){
                console.log('neighbour in closed set')
                continue;
            }
            
            if(!openSet.includes(neighbour)){
                console.log('neighbour is not in openset. so adding neighbour. it now is');
                console.log(neighbour);
                console.log("openest before addding current neighbour");
                console.log(openSet);
                openSet.push(neighbour);
                console.log('openset after adding the neighbour to opnset');
                console.log(openSet);
            }
            
            //console.log(current);
            let getg = getG(neighbour, start);
            let geth = getH(current, neighbour);
            //console.log(getg);
            let tGscore = getg + geth ; //here getH is being used as a distance funtion
            
            //if(tGscore >= getG(current, start) + geth){
            //    continue;
            //}
            geth = getH(neighbour, end);
            neighbour.last = current;
            neighbour.g = tGscore;
            neighbour.f = getg + geth;  
            closedSet.push(current);
            console.log('neighbour after processing (inner)');
            console.log(neighbour);
            console.log("closed set after one inner loop");
            console.log(closedSet);
            console.log('one inner loop complete');
            
            
        }
        console.log("getPath");
        console.log(getPath(current));
        console.log("loop completed " + x +" time(s)  \n \n ");
        if(x>20){return 0}; //the loop was running forever so i tried this to stop the loop after 10 iterations
        
        if(openSet.length > 26){ return 0 };
    }
    
}

function getPath(current){
    
    console.log("current in getpath");
    console.log(current);
    let path = [];
    while(current.last !== null && typeof current.last !== "undefined" ){
        path.push(current.last);
    }
    
    return path;
}
























