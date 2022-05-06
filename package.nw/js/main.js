jQuery(document).ready(function($) {
	
	$('#on').on('click', function() {
		relayOn();
	})
	$('#off').on('click', function() {
		relayOff();
	})

});






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




 bc.onmessage = event => { 
	console.log(event.data); 
	var theme = event.data;
	if ( theme == 'dark' ) {
		switchToDarkTheme();
	}
}
async function switchToDarkTheme() {
	var command = '%SystemRoot%\system32\WindowsPowerShell\v1.0\powershell.exe -Command "Set-ItemProperty -Path HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Themes\Personalize -Name SystemUsesLightTheme -Value 0 -Type Dword -Force"';
	var result = await runCommand(command);
	console.log("_result", result); 
}
