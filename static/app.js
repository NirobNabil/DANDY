$(document).ready(function () {

	localStorage.clear();
	
	window.addEventListener("beforeunload", function (e) {
		var confirmationMessage = "\o/";

		(e || window.event).returnValue = confirmationMessage; //Gecko + IE
		return confirmationMessage;               //Webkit, Safari, Chrome
		
		
		console.log("closing");
	});
	
	//getting values from the storage and udating
	if(localStorage.getItem('savedPixels')){
		pixels = JSON.parse(localStorage.getItem('savedPixels'));
		total_width = localStorage.getItem('total_width');
		total_height = localStorage.getItem('total_height');
		bot_size = localStorage.getItem('bot_size');
		box_in_x = localStorage.getItem('box_in_x');
		box_in_y = localStorage.getItem('box_in_y');
		total_box = localStorage.getItem('total_box');
		for (let i = 0; i < total_box; i++) {
        	document.getElementsByClassName('map_container')[0].innerHTML += '<div class="pixel"></div>';
    	}//adding the pixels
		//console.log(pixels);
		for(let i=0; i<pixels.length; i++){
			if(pixels[i].state == "OBS"){
				MarkObs(pixels[i].X_co_ordinate, pixels[i].Y_co_ordinate, pixels[i].state);
				savepixel(pixels[i].X_co_ordinate, pixels[i].Y_co_ordinate);	
			}
		}
		
	}else{
		pixels = [];
		total_width = 300;
		total_height = 300;
		bot_size = 20;
		box_in_x = total_width / bot_size;
		box_in_y = total_height / bot_size;
		total_box = box_in_x * box_in_y;
		populate(total_width / bot_size, total_height / bot_size, "UND");
		for (let i = 0; i < total_box; i++) {
        	document.getElementsByClassName('map_container')[0].innerHTML += '<div class="pixel"></div>';
    	}//adding the pixels
	}

	$(".save").click(function(){
		let pixelsString = JSON.stringify(pixels);
		localStorage.setItem('savedPixels', pixelsString);
		localStorage.setItem('total_width', total_width);
		localStorage.setItem('total_height', total_height);
		localStorage.setItem('bot_size', bot_size);
		localStorage.setItem('box_in_x', box_in_x);
		localStorage.setItem('box_in_y', box_in_y);
		localStorage.setItem('total_box', total_box);
		alert("gg");
	})
	
	
	
	
	
	
	
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


    //populating the pixels array
    


    $(".pixel").css({
        "width": 100 / (total_width / bot_size) + "%",
        "height": 100 / (total_height / bot_size) + "%"
    })

    var X_val = 0,
        Y_val = 0;
    
    

    
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

	OBSToMark = [pixels[getIndex(0,0)],pixels[getIndex(0,1)],pixels[getIndex(0,2)],pixels[getIndex(0,3)],pixels[getIndex(0,4)],pixels[getIndex(0,5)],pixels[getIndex(0,6)],pixels[getIndex(0,7)],pixels[getIndex(0,8)],pixels[getIndex(0,9)],pixels[getIndex(0,10)],pixels[getIndex(0,11)],pixels[getIndex(0,12)],pixels[getIndex(0,13)],pixels[getIndex(0,14)],pixels[getIndex(1,14)],pixels[getIndex(2,14)],pixels[getIndex(3,14)],pixels[getIndex(4,14)],pixels[getIndex(5,14)],pixels[getIndex(6,14)],pixels[getIndex(7,14)],pixels[getIndex(8,14)],pixels[getIndex(9,14)],pixels[getIndex(10,14)],pixels[getIndex(11,14)],pixels[getIndex(12,14)],pixels[getIndex(13,14)],pixels[getIndex(14,14)],pixels[getIndex(7,0)],pixels[getIndex(7,1)],pixels[getIndex(7,2)],pixels[getIndex(7,3)],pixels[getIndex(7,4)],pixels[getIndex(7,5)],pixels[getIndex(7,6)],pixels[getIndex(7,7)],pixels[getIndex(7,8)],pixels[getIndex(7,9)],pixels[getIndex(7,10)],pixels[getIndex(8,10)],pixels[getIndex(12,10)],pixels[getIndex(13,10)],pixels[getIndex(14,10)],pixels[getIndex(13,9)],pixels[getIndex(13,8)],pixels[getIndex(13,7)],pixels[getIndex(13,6)],pixels[getIndex(14,6)],pixels[getIndex(14,7)],pixels[getIndex(14,8)],pixels[getIndex(14,9)],pixels[getIndex(4,0)],pixels[getIndex(5,0)],pixels[getIndex(6,0)],pixels[getIndex(6,1)],pixels[getIndex(5,1)],pixels[getIndex(1,7)],pixels[getIndex(2,7)],pixels[getIndex(2,6)],pixels[getIndex(2,5)],pixels[getIndex(1,5)],pixels[getIndex(1,6)],pixels[getIndex(2,12)],pixels[getIndex(2,11)],pixels[getIndex(3,11)],pixels[getIndex(3,12)],pixels[getIndex(12,0)],pixels[getIndex(12,1)],pixels[getIndex(13,1)],pixels[getIndex(14,1)],pixels[getIndex(14,0)],pixels[getIndex(13,0)] ];
	markArr(OBSToMark, "OBS");
	
	//// using inputs
	var go = document.getElementsByClassName('XYsubmit')[0];
	alert(go);
	go.addEventListener('click',function(){
		let XS=document.getElementsByClassName('Xco-ordinate_input_start')[0].value;
		let YS=document.getElementsByClassName('Yco-ordinate_input_start')[0].value;
		let XE=document.getElementsByClassName('Yco-ordinate_input_end')[0].value;
		let YE=document.getElementsByClassName('Yco-ordinate_input_end')[0].value;
		pathfind(pixels,pixels[getIndex(XS,YS)],pixels[getIndex(XE,YE)]);
	})
	
	msg = new SpeechSynthesisUtterance('you can\'t select books with negative index');
    synth.speak(msg);
	
})

//jquery code ends here :D



function utter(){
	synth = window.speechSynthesis;
	msg = new SpeechSynthesisUtterance('you can\'t select books with negative index');
    synth.speak(msg);
}





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

lastPath = [];
function MarkPix(path, val){
	if(val != "UNMARK"){
		if(lastPath.length > 0){
			for(let i=0; i<lastPath.length; i++){
				document.getElementsByClassName('pixel')[getIndex(lastPath[i].X_co_ordinate, lastPath[i].Y_co_ordinate)].style.background = "white";
			}
		}
		lastPath = [];
		for(let i=0; i<path.length; i++){
				document.getElementsByClassName('pixel')[getIndex(path[i].X_co_ordinate, path[i].Y_co_ordinate)].style.background = "green";
		}
	}else {
		for(let i=0; i<path.length; i++){
				document.getElementsByClassName('pixel')[getIndex(path[i].X_co_ordinate, path[i].Y_co_ordinate)].style.background = "white";
		}
	}
}



function MarkObs(x = 0, y = 0, obs_val = null) {

    let i = getIndex(x,y);
    console.log(pixels[i]);
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
	if(x<box_in_x && x>=0 && y<box_in_y && y>=0){
		return (box_in_x * (box_in_y - y - 1)) + (parseInt(x));	
	}else{
		return -1;
	}
} // reverse of getcoordinates()

function GetPixel(x, y) {

    return pixels[getIndex(x, y)];
} // return the pixel when passed x and y val


var obs_array_index = 0;
ggxx="";
function savepixel(x = 0, y = 0) {

    let bulletString = obs_array_index;
    let valString = "(" + x + "," + y + ")";
    document.getElementsByClassName("val_container_mother")[0].innerHTML += '<div class="val_container"><span class="bullet">' + "" + '</span><span class="val">' + valString + '</span> </div>';
    obstacles[obs_array_index] = GetPixel(x,y);
	val = "pixels[getIndex" + valString + "],"
	ggxx += val;
	console.log(ggxx);
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

function turnToArr(str){
	
}

function markArr(arr, val){
	for(i=0; i<arr.length; i++){
		MarkObs(arr[i].X_co_ordinate, arr[i].Y_co_ordinate, val)
	}
}














/////// pathfinding begins here

function getG(current, start){
	//console.log("called G of ");
	//console.log(current);
	//console.log(start);
	if(current.g != 0){
		return current.g;
	}else if(current.last != null && current != start){
        current.g = getG(current.last, start) + 1;
    }else if(current == start){
        current.g = 0;
    }else if(current.last == null){
		throw new Error("ERROR: last of current is not set");
	}
	else{
		throw new Error("ERROR: no conditions matched in getG");
	}
    
    return current.g;
}

function getH(current, end){
    current.h = Math.abs(current.X_co_ordinate - end.X_co_ordinate) + Math.abs(current.Y_co_ordinate - end.Y_co_ordinate);
    return current.h;
}

function getF(start, current, end){
    return getG(current, start) + getH(current, end);
}

function getNeighbours(current, start){
    let neighbours = [];
    let tpixelsI = [];
    
    tpixelsI[0] = getIndex(current.X_co_ordinate+1, current.Y_co_ordinate);
    tpixelsI[1] = getIndex(current.X_co_ordinate-1, current.Y_co_ordinate);
    tpixelsI[2] = getIndex(current.X_co_ordinate, current.Y_co_ordinate+1);
    tpixelsI[3] = getIndex(current.X_co_ordinate, current.Y_co_ordinate-1);
    
	
    for(let i=0; i<tpixelsI.length; i++){
        if(tpixelsI[i] && tpixelsI[i] >= 0 && pixels[tpixelsI[i]].state!="OBS"){
			//console.log(tpixelsI[i] + " _ " + i);
			let neighbour = pixels[tpixelsI[i]];
            neighbours.push(neighbour);
			if(neighbour.last == null && neighbour != start){
				//console.log("done for");
				//console.log(neighbour);
				neighbour.last = current;
			}
			
        }
    }
    
    return neighbours;
}


function lowFinArray(openset, start, end){
    let current_low = openset[0];
    
    for(let i=0; i<openset.length; i++ ){
        if(getF(start, openset[i], end) < getF(start, current_low, end)){
            current_low = openset[i];
        }
    }
	
	return current_low;
}

function getPath(current, start){
	let path = [];
	let x=0;
	while(current != start){
		path.push(current);
		//console.log(x+"th");
		//console.log(path);
		x++
		current = current.last;
	}
	MarkPix(path, "black");
	PATH_TO_ERASE = path;
	return path
}

PATH_TO_ERASE = [];
function pathfind(pixels, start, end){
	clearPath();
    let closedSet = [];
	let openSet = [start];
	let current = start;
	
	while(openSet.length > 0){
		//console.log("openset at first");
		//console.log(JSON.parse(JSON.stringify(openSet)));
		//console.log("current");
		current = lowFinArray(openSet, start, end);
		//console.log(current);
		openSet.splice(openSet.indexOf(current), 1);
		closedSet.push(current);
		//console.log("openset after slice");
		//console.log(JSON.parse(JSON.stringify(openSet)));
		
		//console.log("end"); console.log(end);
		if(current === end){
			//console.log("path is");
			return getPath(current, start);
		}
		
		let neighbours = getNeighbours(current, start);
		//console.log("neighbours");
		//console.log(neighbours);
		
		for(let i=0; i<neighbours.length; i++){
			console.log("i " + i);
			//console.log("openset"); console.log(openSet);
			let neighbour = neighbours[i];
			
			if(neighbour === undefined){
				continue;
			}else if(closedSet.includes(neighbour)){
				continue;
			}else if(!openSet.includes(neighbour)){
				openSet.push(neighbour);
				continue;
			}
			
			let tGscore = getG(current, start) + getH(neighbour, current);
			console.log(neighbour.last)
			if(tGscore > getG(neighbour, start)){
				continue;
			}
			
			neighbour.last = current;
			neighbour.g = tGscore;
			neighbour.h = getH(neighbour, end);
			neighbour.f = getF(start, neighbour, end);
			
		}
	}
	
	console.log("no route to destination");
	alert("no route to destination")
}

function clearPath(){
	MarkPix(PATH_TO_ERASE, 'UNMARK') 
}





function utterPath(path){
	let i=0;
	while(i<path.length){
		let XL = path[i].X_co_ordinate;
		let YL = path[i].Y_co_ordinate;
		let XN = path[i+1].X_co_ordinate;
		let YN = path[i+1].Y_co_ordinate;
		if((XN>XN && YL>YN) || (XN<XN && YL<YN)){
			step++;
		}
		if()
	}
}


































