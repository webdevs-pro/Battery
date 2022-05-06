// Load native UI library
var gui = require('nw.gui');

// Create a tray icon
var tray = new nw.Tray({ title: 'Battery status' });


var color;
const bc = new BroadcastChannel('test_channel');
bc.onmessage = event => { 
	console.log(event.data); 
	color = event.data;
	setTrayIcon();
}






// Give it a menu
var tray_menu = new gui.Menu();
tray_menu.append(new gui.MenuItem({
	label: 'Show App',
	type: 'normal',
	click: function () {
		// tray.remove();
		// tray = null;
		gui.Window.get().show();
	}
}));
tray_menu.append(new gui.MenuItem({
	label: 'Reload',
	type: 'normal',
	click: function () {
		tray.remove();
		tray = null;
		document.location.reload(true); 
	}
}));
tray_menu.append(new gui.MenuItem({
	label: 'Close',
	type: 'normal',
	click: function () {
		tray.remove();
		tray = null;
		gui.App.quit();
	}
}));

tray.menu = tray_menu;

tray.on('click', function() {
	gui.Window.get().show();
})




gui.Window.open('/html/main.html', {
	show: false,
	position: "center",
	resizable: false
});



process.on('uncaughtException', function (err) {
   alert(err);
	gui.App.quit();
})



// on close app
gui.Window.get().on('close', function(){
	var main_win = gui.Window.get();
	gui.Window.get().hide();
});
// on close app
gui.Window.get().on('minimize', function(){
	gui.Window.get().hide();
});








setInterval(function(){
	setTrayIcon();
}, 10000)

function setTrayIcon() {
	navigator.getBattery().then(function(battery) {
		var level = battery.level * 100;
		console.log('color', color);
		tray.icon = 'assets/' + color + '/' + level + '-' + color + '.png';
	});
}




 