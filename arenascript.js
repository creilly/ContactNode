var name = '';

function data(obj){
    return {data: JSON.stringify(obj)}
}
function nameList(now){
    alert(now);
    $.getJSON('/users',data({name: name, now: now}),function(data){
	alert(JSON.stringify(data));
	var items = [];	

	$.each(data, function(key, val) {
	    if (val == name){
		val = '<b>' + val + '</b>';
	    }
	    items.push('\t<li id="' + key + '">' + val + '</li>');
	});

	$("ul").html(items.join('\n'));
	nameList(false);	
    });
}

$( function() {
    name = $('#name').text().trim();
    nameList(true);
});
