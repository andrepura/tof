console.log("i m alive :) ");

var MOCKING = false;

function init() {
	loadData();
	// bind search
	$("#filterTable-input").bind(
			"propertychange change click keyup input paste", function(event) {
				var query = $("#filterTable-input").val();
				if (query.length > 2) {
					console.log("Start search: " + query);
					search(query);
				} else {
					console.log("toooooooooo short");
				}
			});
}

function loadData() {
	console.log("loadData: MOCKING ?? "+MOCKING);

	if (MOCKING) {
		var text = '[{"uid":1234,"id":"asdasd123456","firstname":"max","lastname":"mustermann","phone":"+436761231234","mail":"asd@sdf.com","age":20,"days":5,"section":"infra","test":null},{"uid":1235,"id":"asdasd123457","firstname":"maxima","lastname":"musterfrau","phone":"+436761231234","mail":"asd@sdasedf.com","age":42,"days":4,"section":"team"}]';
		var obj = JSON.parse(text);
		drawTable(obj);
		return;
	}
}

function search(query) {
	console.log("Search for: " + query);
	clearData();
	if (MOCKING) {
		console.log("MOCKING!!!!!");
		return;
	}
	$.ajax({
		beforeSend : function() {
			$.mobile.showPageLoadingMsg();
		}, // Show spinner
		complete : function() {
			$.mobile.hidePageLoadingMsg()
		}, // Hide spinner
		url : '../tof/search?q=' + encodeURI(query),
		dataType : 'json',
		success : function(data) {
			console.log("data:");
			console.log(data);
			drawTable(data);
		}
	});
}

function drawTable(data) {
	console.log("loadData done");
	if (data.length > 0) {
		drawRowHeaders(data[0]);
	}
	for (var i = 0; i < data.length; i++) {
		drawRow(data[i]);
	}
}

function clearData() {
	$("#show-data-table-header").empty();
	$("#show-data-table").empty();
}

function drawRowHeaders(rowData) {
	var row = $("<tr />")
	$("#show-data-table").append(row);

	var keys = Object.getOwnPropertyNames(rowData);
	console.log(keys);
	for ( var i in keys) {
		row.append($("<td>" + keys[i] + "</td>"));
	}
}

function drawRow(rowData) {
	var row = $("<tr />")
	$("#show-data-table").append(row); // this will append tr element to
	// table... keep its reference for a
	// while since we will add cels into it
	for ( var i in rowData) {
		row.append($("<td>" + rowData[i] + "</td>"));
	}
}