// Load native UI library
var gui = require('nw.gui');

// Create a tray icon
var tray = new nw.Tray({ title: 'Tray', icon: 'assets/Group 1.png' });


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
	tray.icon = 'assets/Group 1.png'
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
	tray.icon = 'assets/Group 2.png'
});
// on close app
gui.Window.get().on('minimize', function(){
	gui.Window.get().hide();
	tray.icon = 'assets/Group 2.png'
});


