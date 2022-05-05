

// init
var gui = require('nw.gui');




//gui.Window.get().showDevTools();

	
	

	
	
	


	
// on close app
gui.Window.get().on('close', function(){
	gui.App.quit();
});
	

		
		
		
		
// JQUERY
jQuery(document).ready(function($) {
	
	
	
	
	// show main menu
	main_menu_init();

		
		
		
		




	$('#on').on('click', function() {
		relayOn();
	})
	$('#off').on('click', function() {
		relayOff();
	})

	setInterval(function() {
		navigator.getBattery().then(function(battery) {

			var level = battery.level;
			$('#level').text(level);
	
			console.clear();
			console.log('battery', battery);
	
		});
	}, 3000)


});


const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function runCommand(command) {
  const { stdout, stderr, error } = await exec(command);
  if(stderr){console.error('stderr:', stderr);}
  if(error){console.error('error:', error);}
  return stdout;
}


async function relayOn () {
	var command = 'cd \inc && hidusb-relay-cmd id=YWM8T ON 1';
	var result = await runCommand(command);
	console.log("_result", result);
}

async function relayOff () {
	var command = 'cd \inc && hidusb-relay-cmd id=YWM8T OFF 1';
	var result = await runCommand(command);
	console.log("_result", result);
}


