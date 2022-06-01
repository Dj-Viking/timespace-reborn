use flate2::read::GzDecoder;
use std::io::prelude::*;
use std::{env, io};

fn main() -> io::Result<()> {
    println!("READ GZIP!");
    // collect command line args

    let args: Vec<String> = env::args().collect();

    println!("{:?}", args);

    let mut buffer = String::new();
    let stdin = io::stdin();
    let mut handle = stdin.lock();

    handle.read_line(&mut buffer)?;

    println!("newly created string from buffer {}", buffer);

    Ok(())
}
