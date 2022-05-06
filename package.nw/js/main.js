jQuery(document).ready(function($) {
	
	$('#on').on('click', function() {
		relayOn();
	})
	$('#off').on('click', function() {
		relayOff();
	})

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






const bc = new BroadcastChannel('test_channel');
if ( getPreferredColorScheme() == 'light' ) {
	bc.postMessage('black');
} else {
	bc.postMessage('white');
}





var color;
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
	colorScheme = event.matches ? "dark" : "light";
	if ( colorScheme == 'light' ) {
		color = 'black';
	} else {
		color = 'white';
	}
	bc.postMessage(color);
});

function getPreferredColorScheme() {
	if (window.matchMedia) {
	  if(window.matchMedia('(prefers-color-scheme: dark)').matches){
		 return 'dark';
	  } else {
		 return 'light';
	  }
	}
	return 'light';
 }