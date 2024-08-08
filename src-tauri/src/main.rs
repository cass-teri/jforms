// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

fn build_menu() -> Menu {
    let menu = Menu::new()
        .add_submenu(Submenu::new(
            "App",
            Menu::new()
                .add_native_item(MenuItem::Quit)
        ))
        .add_submenu(Submenu::new(
            "File",
            Menu::new()
                .add_item(CustomMenuItem::new("new_project".to_string(), "New Project"))
                .add_item(CustomMenuItem::new("open_project".to_string(), "Open Project"))
                .add_item(CustomMenuItem::new("save_project".to_string(), "Save Project"))
                .add_native_item(MenuItem::Separator)
                .add_item(CustomMenuItem::new("save_data_schema".to_string(), "Save Data Schema"))
                .add_item(CustomMenuItem::new("save_ui_schema".to_string(), "Save UI Schema"))
                .add_native_item(MenuItem::Separator)
                .add_item(CustomMenuItem::new("save_all".to_string(), "Save All"))
        ));

    menu
}

fn main() {
    tauri::Builder::default()
        .menu(build_menu())
        .on_menu_event(|event| {
            match event.menu_item_id() {
                "new_project" => {
                    event.window().emit("new_project", "").unwrap();
                }
                "open_project" => {
                    println!("Open Project");
                    event.window().emit("open_project", "").unwrap();
                }
                "save_project" => {
                    event.window().emit("save_project", "").unwrap();
                }
                "save_data_schema" => {
                    event.window().emit("save_data_schema", "").unwrap();
                }
                "save_ui_schema" => {
                    event.window().emit("save_ui_schema", "").unwrap();
                }
                "save_all" => {
                    event.window().emit("save_all", "").unwrap();
                }
                _ => {}
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
