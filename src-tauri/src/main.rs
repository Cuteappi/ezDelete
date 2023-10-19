// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

fn main() {

  tauri::Builder::default()
	.setup(|app| {
		#[cfg(debug_assertions)] // only include this code on debug builds
		{
			let window = app.get_window("main").unwrap();
			window.open_devtools();
			window.close_devtools();
		}
		Ok(())
	})
  	.on_window_event(|e| {
		if let tauri:: WindowEvent::Resized(_) = e.event() {
			std::thread::sleep(std::time::Duration::from_nanos(1));
		}
	})
	
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
