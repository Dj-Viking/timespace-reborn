use flate2::read::GzDecoder;
use std::fs::File;
// use std::io::prelude::*;
use std::{env, io};
use tar::Archive;

fn main() -> io::Result<()> {
    println!("READ GZIP!");
    // collect command line args

    let args: Vec<String> = env::args().collect();

    println!("{:?}", args[1]);

    let path: &String = &args[1];

    let tar_gz: File = File::open(path)?;
    let tar: GzDecoder<File> = GzDecoder::new(tar_gz);
    let mut archive: Archive<GzDecoder<File>> = Archive::new(tar);
    archive.unpack(".")?;

    // let mut buffer = String::new();
    // let stdin = io::stdin();
    // let mut handle = stdin.lock();

    // handle.read_line(&mut buffer)?;

    // println!("newly created string from buffer {}", buffer);

    Ok(())
}
