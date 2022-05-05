	// main menu init fn
	function main_menu_init() {
		
		// main menu
		var menu = new nw.Menu({type: 'menubar'});
		var file_submenu = new nw.Menu();

		
		// file
		var menu_file = new nw.MenuItem({
			label: 'File',
			submenu: file_submenu
		});
			var submenu_item_reload = new nw.MenuItem({ 
				label: 'Reload app',
				click: function () {
					// chrome.runtime.reload();
					document.location.reload(true); 
				}
			});
			var submenu_item_devtools = new nw.MenuItem({ 
				label: 'Dev tools',
				click: function () {
					gui.Window.get().showDevTools();
				}
			});
			var submenu_item_exit = new nw.MenuItem({ 
				label: 'Exit',
				click: function () {
					gui.App.quit();
				}
			});
		menu.append(menu_file);
		file_submenu.append(submenu_item_reload);
		file_submenu.append(submenu_item_devtools);
		file_submenu.append(submenu_item_exit);
		


		

		
		nw.Window.get().menu = menu;

		
		


		
		


	}
	
	
  