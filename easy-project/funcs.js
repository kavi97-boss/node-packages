import {exec, execSync} from 'child_process'
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra'


export const __dirname = dirname(fileURLToPath(import.meta.url));

const from_path = __dirname

export function packageVersion(){
    let rawdata = fs.readFileSync(path.join(from_path, 'package.json'));
    let pkg = JSON.parse(rawdata);
    return pkg.version
}

export function done_txt(txt){
    console.log("\x1b[32m[   DONE]\x1b[0m" ,`${txt}`)
}
export function err_txt (txt){
    return console.log("\x1b[31m[  ERROR]\x1b[0m" ,`${txt}`)
}

export function warning_txt (txt){
    console.log("\x1b[31m[WARNING]\x1b[0m" ,`${txt}`)
}

export function createFolder(path, callBackDone=()=>{}){
    try{
        fs.mkdirSync(path)
        callBackDone()
    }
    catch(err){
        err_txt(err)
    }
}

export function deleteFolder(path, callBackDone=()=>{}){
    try{
        fs.rmSync(path, {
            force:true,
            recursive:true
        })
        callBackDone()
    }
    catch(err){
        err_txt(err)
    }
}

export function makeProject(from, to, callBackDone=()=>{}, callBackError=()=>{}){
    try{
        fs.copySync(from, to)
        callBackDone()
    }
    catch(err){
        err_txt(err)
        callBackError()
    }
}

export function deleteProject(project_name, current_path){
    const path_to_project = path.join(current_path, project_name)
    process.chdir(current_path)
    deleteFolder(path_to_project, ()=>{
        done_txt(`Something went wrong. \x1b[36m${project_name}\x1b[0m project \x1b[31mdeleted\x1b[0m`)
    })
}

export function cmd(command, callBackDone=()=>{}, callBackError=()=>{}){
    try{
        const data = execSync(command, {
            timeout:0,
            maxBuffer:400*4096
        })
        console.log(data.toString())
        callBackDone()
    }
    catch(err){
        err_txt(err)
        callBackError()
    }
}

export function jsonNameEdit(path, name, callBackDone=()=>{}){
    let raw_file = fs.readFileSync(path)
    let packages_file = JSON.parse(raw_file)
    packages_file.name = name
    fs.writeFileSync(path, JSON.stringify(packages_file), (err)=>{
        if(err){
            err_txt(err)
        }
    })
    callBackDone()
}
