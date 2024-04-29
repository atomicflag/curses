use tauri::{
    command,
    plugin::{Builder, TauriPlugin},
    Runtime,
};

#[command]
fn translate(value: String) -> String {
    "hello".to_owned()
}

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("pirate")
        .invoke_handler(tauri::generate_handler![translate])
        .build()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = translate("asdf".to_owned());
        assert_eq!(result, "hello");
    }
}
