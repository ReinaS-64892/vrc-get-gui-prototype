// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            editor_open_command,
            get_project_info,
            remove_package,
            update_package_all,
            repo_update
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

const VRC_GET: &str = "vrc-get";

#[tauri::command]
fn editor_open_command(path: String) {
    let editor_path = "F:/unityproject/editor/2022.3.6f1/Editor/Unity.exe";
    let _ = Command::new(editor_path)
        .arg("-projectPath")
        .arg(&path)
        .spawn();
    // println!("{}", path);
}

#[tauri::command]
fn get_project_info(path: String) -> Result<String, String> {
    let mut binding = Command::new(VRC_GET);
    binding.args(["info", "project","--json-format","1"]);
    let command = binding.current_dir(path);
    let result = command.output();
    // println!("{:?}", result);
    match result {
        Ok(output) => {
            let output_str: String = match String::from_utf8(output.stdout) {
                Ok(output_str) => {
                    // println!("{}", output_str);
                    output_str
                }
                Err(_) => return Err("Error".to_owned()),
            };

            return Ok(output_str.to_owned());
        }
        Err(_) => {
            return Err("Error".to_owned());
        }
    }
}

#[tauri::command]
fn remove_package(path: String, package_name: String) -> String {
    let mut bind = Command::new(VRC_GET);
    bind.arg("remove").arg(package_name);
    let command = bind.current_dir(path);

    let handler = command.spawn();
    match handler {
        Ok(mut child) => {
            let exit = child.wait();

            if exit.ok().is_some() {
                "Ok".to_owned()
            } else {
                "Error".to_owned()
            }
        }
        Err(_) => "Error".to_owned(),
    }
}

#[tauri::command]
fn update_package_all(path: String) {
    let mut bind = Command::new(VRC_GET);
    bind.args(["upgrade", "-y"]);
    let command = bind.current_dir(path);

    let handler = command.spawn();
    match handler {
        Ok(mut child) => {
            let _ = child.wait();
            return;
        }
        Err(_) => {}
    }
}

#[tauri::command]
fn repo_update(path: String) {
    let mut bind = Command::new(VRC_GET);
    bind.arg("update");
    let command = bind.current_dir(path);

    let handler = command.spawn();
    match handler {
        Ok(mut child) => {
            let _ = child.wait();
            return;
        }
        Err(_) => {}
    }
}
