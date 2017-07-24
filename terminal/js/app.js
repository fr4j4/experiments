
function init(){

}


function start(){
	
}

function showTab(tabId){
	console.log("show ["+tabId+"]");
	$(".content").css("display","none");
	$(".tab").addClass("inactive");
	
	$("#tab_"+tabId).removeClass("inactive");
	$("#tab_"+tabId).removeClass("active");
	
	$("#tab_"+tabId).addClass("active");
	$("#"+tabId).css("display","block");
}