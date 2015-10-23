console.log("i m alive :) ");


function init(){
	loadData();
	//bind search
	$("#filterTable-input").bind("propertychange change click keyup input paste", function(event){
	    
	    console.log("asd");
	 });
}


function loadData(){
	console.log("loadData ");
	
	//TODO: to use real data -> comment
	var text ='[{"uid":1234,"id":"asdasd123456","firstname":"max","lastname":"mustermann","phone":"+436761231234","mail":"asd@sdf.com","age":20,"days":5,"section":"infra","test":null},{"uid":1235,"id":"asdasd123457","firstname":"maxima","lastname":"musterfrau","phone":"+436761231234","mail":"asd@sdasedf.com","age":42,"days":4,"section":"team"}]';
	var obj = JSON.parse(text);
	drawTable(obj);
	return;
	
	$.ajax({
	    url: '../mock/showdata_mock.json',
	    type: "get",
	    dataType: "json",
	    
	    success: function(data, textStatus, jqXHR) {
	    	console.log("data --> "+data);
	        // since we are using jQuery, you don't need to parse response
	        drawTable(data);
	    },
	    error: function(error){
	    	console.log("error --> ");
	    	console.log(error);
	    }	
	});	
}

function search(query){
	console.log("Search for: "+query);
	clearData();
	 $.ajax({
         beforeSend: function() { $.mobile.showPageLoadingMsg(); }, //Show spinner
         complete: function() { $.mobile.hidePageLoadingMsg() }, //Hide spinner
         url: '../tof/search/'+encodeURI(query),
         dataType: 'json',
         success: function(data) {
        	 console.log("");
             console.log(data);
         }
     });
}

function drawTable(data) {
	console.log("loadData done");
	if(data.length > 0){
		drawRowHeaders(data[0]);
	}
    for (var i = 0; i < data.length; i++) {
        drawRow(data[i]);
    }
}

function clearData(){
	$("#show-data-table-header").clear();
	$("#show-data-table").clear();
}

function drawRowHeaders(rowData){
	var row = $("<tr />")
    $("#show-data-table").append(row);
	
	var keys = Object.getOwnPropertyNames(rowData);
	console.log(keys);
	for(var i in keys){
		row.append($("<td>" + keys[i] + "</td>"));
	}	
}

function drawRow(rowData) {
    var row = $("<tr />")
    $("#show-data-table").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
    for(var i in rowData){
		row.append($("<td>" + rowData[i] + "</td>"));
	}
}