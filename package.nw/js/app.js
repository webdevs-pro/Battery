// Load native UI library
var gui = require('nw.gui');

// Create a tray icon
var tray = new nw.Tray({ title: 'Tray', icon: 'assets/icon.png' });

// Give it a menu
var tray_menu = new gui.Menu();
tray_menu.append(new gui.MenuItem({
	label: 'Reload',
	type: 'normal',
	click: function () {
		tray.remove();
		tray = null;
		chrome.runtime.reload();
	}
}));
tray_menu.append(new gui.MenuItem({
	label: 'Close',
	type: 'normal',
	click: function () {
		gui.App.quit();
	}
}));



tray.menu = tray_menu;



gui.Window.open('/html/main.html', {
	// show: false,
	min_width: 1280,
	min_height: 600,
	position: "center"
});


process.on('uncaughtException', function (err) {
    alert(err);
	gui.App.quit();
})



