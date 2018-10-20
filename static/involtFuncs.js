/*global
ADSAFE, report, jslint
*/


/*process_countF = 0;
var temp_data_objF = [];
involtFunction.processDataF = function(){
	document.getElementsByClassName('gg1')[0].innerHTML = process_countF;

	let objString = involt.pin.A[1] + involt.pin.A[2] + involt.pin.A[3] + involt.pin.A[4] + involt.pin.A[5] + involt.pin.A[6];
	let objActual = JSON.parse(objString);

	temp_data_objF[process_countF] = objActual;
	document.getElementsByClassName('gg1')[0].innerHTML += JSON.stringify(temp_data_objF[process_count]);
	process_countF++;
	//alert("called");



	if( process_countF >= 10 ){
		//process_countF = 0;
		for(let i=process_countF-1; i>=0; i--){
			if(temp_data_objF[i].dist < maxDist(20, temp_data_objF[i].deg) && temp_data_objF[i].dist != 0 && temp_data_objF[i].dist > maxDistC(20, temp_data_objF[i].deg)){
				MarkObs(temp_data_objF[i].positionX, temp_data_objF[i].positionY + 1, "OBS");
				temp_data_objF = [];
				process_countF = 0;
				document.getElementsByClassName('gg1')[0].innerHTML = process_countF;
				return 0;
			}
			temp_data_objF.slice(i, 1);
			//document.getElementsByClassName('gg1')[0].innerHTML += JSON.stringify(temp_data_objF[i]);
		}
		UnMarkObs(temp_data_objF[i].positionX, temp_data_objF[i].positionY + 1, "DIS");
		temp_data_objF = [];
		document.getElementsByClassName('gg1')[0].innerHTML = " 10 complete ";
		process_countF = 0;
		
	}
	//localStorage.setItem("testJSON", objActual);
}



function maxDist (box_size, deg) {
	let actual_deg = parseInt(Math.abs(90 - deg));
	let actual_rad = (actual_deg*Math.PI)/180;
	console.log(actual_deg);
	console.log(actual_rad);
	if(actual_deg >= 19){
		return Math.ceil((box_size/2)/Math.sin(actual_rad));
	}else if(actual_deg <= 19){
		return Math.ceil((box_size + (box_size/2))/Math.cos(actual_rad));
	}
}

function maxDistC(box_size, deg){
	return (box_size/2)/Math.sin((Math.abs(90 - deg)*Math.PI)/180);
}*/
