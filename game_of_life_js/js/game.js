var canvas;
var rows= 30,cols=50;
var block_size=15;//pixels of a block
var block_border=1;
var cells=[];
var step_rate=100;
var running=false;
var first=true;

function getMousePos(canvas, evt) {
    var rect = canvas[0].getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function posToCoords(pos){
	return{
		r:Math.trunc(pos.y/block_size),
		c:Math.trunc(pos.x/block_size),
	}
}

function setAlive(r,c,state){
	pos=((r)*cols)+c;
	cells[pos].alive=true;
}

function toggleAlive(r,c){
	pos=((r)*cols)+c;
	cells[pos].alive=!cells[pos].alive;
}

function selectCell(r,c){
	//console.log("("+r+","+c+")");
	toggleAlive(r,c);
	draw();
}

function init(canvas_id){
	canvas=$("#"+canvas_id);
	canvas.attr('height',rows*block_size);
	canvas.attr('width',cols*block_size);
	canvas.css('border','solid black 2px');
	
	for(i=0;i<rows*cols;i++){
		cell={
			"alive":false,
			"next":false,
			"neighbours":0,
		};
		cells.push(cell);
	}

	canvas[0].addEventListener('click', function(evt) {
		var mousePos = getMousePos(canvas, evt);
		//var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
		coords=posToCoords(mousePos);
		//console.log(message);
		selectCell(coords.r,coords.c);
	}, false);
/*
	canvas.on('move', function(evt) {
		var mousePos = getMousePos(canvas, evt);
		//var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
		coords=posToCoords(mousePos);
		//console.log(message);
		selectCell(coords.r,coords.c);
	}, false);
*/
	setInterval(draw,100);
}

function start(){
	if(first){
		running=true;
		first=false;
	}
	//console.log("loop");
	//time=1000/60;
	if(running){
		step();
	}
	setTimeout(start,step_rate);
	//setInterval(step,step_rate);
	
}

function test(){

}

function clear(){
	ctx=canvas[0].getContext("2d");
	ctx.fillStyle ="#000000";//black background
	ctx.fillRect(0,0,rows*block_size,cols*block_size);
}

function step(){
	//console.log("step");
	for(i in cells){
		c=(i)%cols;
		r=Math.trunc(i/cols);
		cells[i].neighbours=neighbours_count(r,c);
		judge(cells[i]);
		//cells[i].alive=cells[i].next;

	}
	
	for(i in cells){
		cells[i].alive=cells[i].next;
	}
}

function neighbours_count(row,col){
	neighbours=0;

	/* referencia vecinos
	NW	 N   NE
	 W	[X]  E
	SW	 s   SE
	*/


	//pos=(()*cols+();
	/*NW*/
	if(row-1 >=0 && col-1 >=0){
		pos=((row-1)*cols)+(col-1);
		if(cells[pos].alive){
			//console.log("NW");
			neighbours++;
		}
	}
	/*N*/
	if(row-1 >=0){
		pos=((row-1)*cols)+col;
		if(cells[pos].alive){
			//console.log("N");
			neighbours++;
		}
	}
	/*NE*/
	if(row-1 >=0 && col+1 <cols){
		pos=((row-1)*cols)+col+1;
		if(cells[pos].alive){
			//console.log("NE");
			neighbours++;
		}
	}

	/*W*/
	if(col-1 >=0){
		pos=(row*cols)+(col-1);
		if(cells[pos].alive){
			//console.log("W");
			neighbours++;
		}
	}

	/*E*/
	if(col+1 <cols){
		
		pos=(row*cols)+(col+1);
		if(cells[pos].alive){
			//console.log("E");
			neighbours++;
		}
	}


	/*SW*/
	if(row+1 <rows && col-1 >=0){
		pos=((row+1)*cols)+(col-1);
		if(cells[pos].alive){
			//console.log("SW");
			neighbours++;
		}
	}
	/*S*/
	if(row+1 <rows){
		pos=((row+1)*cols)+col;
		if(cells[pos].alive){
			//console.log("S");
			neighbours++;
		}
	}
	/*SE*/
	if(row+1 <rows && col+1 <cols){
		pos=((row+1)*cols)+col+1;
		if(cells[pos].alive){
			//console.log("SE");
			neighbours++;
		}
	}


	return neighbours;
}

function judge(cell){//apply rules to judge if a cell is alive or dead
	n=cell.neighbours;
	if(cell.alive){
		if(n<2 || n > 3){
			cell.next=false;
		}else{
			cell.next=true;
		}
	}else{
		if(n===3){
			cell.next=true;
		}
	}
}

function draw(){
	clear();
	ctx=canvas[0].getContext("2d");
	ctx.fillRect(0,0,cols*block_size,rows*block_size);
	for (i in cells){
		c=(i)%cols;
		r=Math.trunc(i/cols);
		cell=cells[i];

		if(cell.alive){
			ctx.fillStyle="#00ff00";
		}else{
			ctx.fillStyle="#0000ff";
		}
		ctx.fillRect(
			(c*block_size)+block_border,
			(r*block_size)+block_border,
			(block_size)-2*block_border,
			(block_size)-2*block_border
		);
		//ctx.font = "8px Arial";
		//ctx.fillStyle="#ffffff";
		//ctx.fillText(i, c*block_size+block_size/6, r*block_size+block_size/2);
		//console.log("I:"+i);
		//wait(25);
	}
}

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}