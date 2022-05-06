// Load native UI library
var gui = require('nw.gui');

// Create a tray icon
var tray = new nw.Tray({ title: 'Battery status' });


var color = 'white';
const bc = new BroadcastChannel('test_channel');







// Give it a menu
var tray_menu = new gui.Menu();
tray_menu.append(new gui.MenuItem({
	label: 'Show App',
	type: 'normal',
	click: function () {
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
	label: 'Dark',
	type: 'normal',
	click: function () {
		switchToDarkTheme();
		color = 'white';
		setTrayIcon();
	}
}));
tray_menu.append(new gui.MenuItem({
	label: 'Light',
	type: 'normal',
	click: function () {
		switchToLightTheme();
		color = 'black';
		setTrayIcon();
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
	resizable: false,
	show_in_taskbar: false
});



process.on('uncaughtException', function (err) {
   alert(err);
	gui.App.quit();
})



// on close app
gui.Window.get().on('close', function(){
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



const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function runCommand(command) {
  const { stdout, stderr, error } = await exec(command);
  if(stderr){console.error('stderr:', stderr);}
  if(error){console.error('error:', error);}
  return stdout;
}
async function switchToDarkTheme() {
	var command = 'powershell.exe -Command "Set-ItemProperty -Path HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize -Name SystemUsesLightTheme -Value 0 -Type Dword -Force"';
	var result = await runCommand(command);
	console.log("_result", result); 

	command = 'powershell.exe -Command "Set-ItemProperty -Path HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize -Name AppsUseLightTheme -Value 0 -Type Dword -Force"';
	result = await runCommand(command);
	console.log("_result", result); 
}
async function switchToLightTheme() {
	var command = 'powershell.exe -Command "Set-ItemProperty -Path HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize -Name SystemUsesLightTheme -Value 1 -Type Dword -Force"';
	var result = await runCommand(command);
	console.log("_result", result); 

	command = 'powershell.exe -Command "Set-ItemProperty -Path HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize -Name AppsUseLightTheme -Value 1 -Type Dword -Force"';
	result = await runCommand(command);
	console.log("_result", result); 
}



