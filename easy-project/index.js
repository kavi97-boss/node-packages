#!/usr/bin/env node

// let raw_file = fs.readFileSync(path.join(process.cwd(), 'package.json'))
// let packages_file = JSON.parse(raw_file)

const program = require('commander')
const {exec} = require('child_process')

const fs = require('fs-extra')
const path = require('path')

const base_path = process.cwd()
const from_path = __dirname

const BACKEND = 'backend'
const FRONTEND = 'frontend'

const LATENCY = 2000

var is_frontend_project_created = false
var is_backend_project_created = false

// backend project paths
const express_folder = path.join(path.join(from_path, 'template'), 'express')
const flask_folder = path.join(path.join(from_path, 'template'), 'flask')

// frontend project paths
const react_folder = path.join(path.join(from_path, 'template'), 'react')
const next_folder = path.join(path.join(from_path, 'template'), 'next')
const angular_folder = path.join(path.join(from_path, 'template'), 'angular')

const done_txt = (txt)=>{
    console.log("\x1b[32m",`[ DONE]`,"\x1b[0m" ,`${txt}`)
}
const err_txt = (txt)=>{
    return console.log("\x1b[31m",`[ERROR]`,"\x1b[0m" ,`${txt}`)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function cmd(cmnd){
    await exec(cmnd,(err, stdout, stderr)=>{
        if(err){
            err_txt(`[ERROR] ${err}`)
            return
        }
        if(stderr){
            err_txt(`[STD-ERROR] ${stderr}`)
            return
        }
        console.log(stdout)
    })
}


program
    .version('1.0.0')
    .description('easy-project is a tool for create easialy full web projects with basic templates')


program
    .option('-f, --frontend <frontend>', 'set frontend framework or library list: react')
    .option('-b, --backend <backend>', 'set backend framework or library list: node')


program
    .command("create <project-name>")
    .description('create web base projects with basic template')
    .action((project_name)=>{
        
        let to_path = process.cwd()

        const options = program.opts()

        const project_exist = fs.existsSync(path.join(to_path, project_name))
        
        if(project_exist){
            return err_txt('Project name exist please choose another name')
        }
        else{            
            
            // make project folder
            fs.mkdir(path.join(to_path, project_name), (err)=>{
                if(err){
                    err_txt(err)
                }
                else{
                    done_txt(`Project ${project_name} Created`)

                    // change directory to project
                    process.chdir(path.join(process.cwd(), project_name))
                    
                    // create frontend project
                    if(options.frontend){

                        // create frontend folder
                        fs.mkdir(path.join(process.cwd(), FRONTEND), (err)=>{
                            if(err){
                                err_txt(err)
                            }
                            else{
                                const frontend_method = options.frontend

                                // change directory to frontend
                                const to_frontend = path.join(path.join(base_path, project_name), FRONTEND)
                                process.chdir(to_frontend)

                                switch(frontend_method){

                                    // react project
                                    case 'react':
                                        // copy react folder to project frontend
                                        fs.copy(react_folder, process.cwd(), (err)=>{
                                            if(err){
                                                err_txt(err)
                                            }
                                            else{
                                                done_txt('Frontend React project created')
                                                setTimeout(()=>{
                                                    const frontend_json_path = path.join(path.join(path.join(base_path, project_name), FRONTEND), 'package.json')

                                                    let f_raw_file = fs.readFileSync(frontend_json_path)
                                                    let f_packages_file = JSON.parse(f_raw_file)
                                                    f_packages_file.name = `${project_name}-frontend`
                                                    
                                                    fs.writeFileSync(frontend_json_path, JSON.stringify(f_packages_file), (err)=>{
                                                        if(err){
                                                            err_txt(err)
                                                        }
                                                    })
                                                    process.chdir(to_frontend)
                                                    cmd('npm install')

                                                },LATENCY)
                                            }
                                        })
                                        break
                                    
                                    case 'next':
                                        // copy next folder to project frontend
                                        fs.copy(next_folder, process.cwd(), (err)=>{
                                            if(err){
                                                err_txt(err)
                                            }
                                            else{
                                                done_txt('Frontend NextJS project created')
                                                setTimeout(()=>{
                                                    const frontend_json_path = path.join(path.join(path.join(base_path, project_name), FRONTEND), 'package.json')

                                                    let f_raw_file = fs.readFileSync(frontend_json_path)
                                                    let f_packages_file = JSON.parse(f_raw_file)
                                                    f_packages_file.name = `${project_name}-frontend`
                                                    
                                                    fs.writeFileSync(frontend_json_path, JSON.stringify(f_packages_file), (err)=>{
                                                        if(err){
                                                            err_txt(err)
                                                        }
                                                    })
                                                    process.chdir(to_frontend)
                                                    cmd('npm install')

                                                },LATENCY)
                                            }
                                        })
                                        break

                                    case 'angular':
                                        // copy angular folder to project frontend
                                        fs.copy(angular_folder, process.cwd(), (err)=>{
                                            if(err){
                                                err_txt(err)
                                            }
                                            else{
                                                done_txt('Frontend Angular project created')
                                                setTimeout(()=>{
                                                    const frontend_json_path = path.join(path.join(path.join(base_path, project_name), FRONTEND), 'package.json')

                                                    let f_raw_file = fs.readFileSync(frontend_json_path)
                                                    let f_packages_file = JSON.parse(f_raw_file)
                                                    f_packages_file.name = `${project_name}-frontend`
                                                    
                                                    fs.writeFileSync(frontend_json_path, JSON.stringify(f_packages_file), (err)=>{
                                                        if(err){
                                                            err_txt(err)
                                                        }
                                                    })
                                                    process.chdir(to_frontend)
                                                    cmd('npm install')
                                                    cmd('npm install -g @angular/cli')

                                                },LATENCY)
                                            }
                                        })
                                        break
                                    
                                    // frontend error
                                    default:
                                        err_txt('Not a valid library format')
                                        process.chdir(path.join(base_path, project_name))
                                        fs.rmdir(path.join(process.cwd(), FRONTEND), (err)=>{
                                            if(err){
                                                err_txt(err)
                                            }
                                            else{
                                                process.chdir(base_path)
                                                fs.rmdir(path.join(base_path, project_name), (err)=>{
                                                    if(err){
                                                        err_txt(err)
                                                    }
                                                    else{
                                                        return done_txt(`Project ${project_name} removed`)
                                                    }
                                                })
                                            }
                                        })
                                        break

                                }
                            }
                        })
                    }

                    // create backend project
                    if(options.backend){
                        
                        // create backend folder
                        fs.mkdir(path.join(process.cwd(), BACKEND), (err)=>{
                            if(err){
                                err_txt(err)
                            }
                            else{
                                const backend_method = options.backend

                                // change directory to backend
                                const to_backend = path.join(path.join(base_path, project_name), BACKEND)
                                process.chdir(to_backend)

                                switch(backend_method){

                                    // express project
                                    case 'express':
                                        // copy node folder to project backend
                                        fs.copy(express_folder, process.cwd(), (err)=>{
                                            if(err){
                                                err_txt(err)
                                            }
                                            else{
                                                done_txt('Backend Express project created')
                                                setTimeout(()=>{
                                                    const backend_json_path = path.join(path.join(path.join(base_path, project_name), BACKEND), 'package.json')

                                                    let b_raw_file = fs.readFileSync(backend_json_path)
                                                    let b_packages_file = JSON.parse(b_raw_file)
                                                    b_packages_file.name = `${project_name}-backend`

                                                    fs.writeFileSync(backend_json_path, JSON.stringify(b_packages_file), (err)=>{
                                                        if(err){
                                                            err_txt(err)
                                                        }
                                                    })
                                                    process.chdir(to_backend)
                                                    cmd('npm install')

                                                },LATENCY)
                                            }
                                        })
                                        break
                                    
                                    // flask project
                                    case 'flask':
                                        // copy node folder to project backend
                                        fs.copy(flask_folder, process.cwd(), (err)=>{
                                            if(err){
                                                err_txt(err)
                                            }
                                            else{
                                                done_txt('Backend Flask project created')
                                                setTimeout(()=>{
                                                    cmd('pip install flask')
                                                    cmd('pip install flask-cors')

                                                },LATENCY)
                                            }
                                        })
                                        break
                                    
                                    // backend error
                                    default:
                                        err_txt('Not a valid library format')
                                        process.chdir(path.join(base_path, project_name))
                                        fs.rmdir(path.join(process.cwd(), BACKEND), (err)=>{
                                            if(err){
                                                err_txt(err)
                                            }
                                            else{
                                                process.chdir(base_path)
                                                fs.rmdir(path.join(base_path, project_name), (err)=>{
                                                    if(err){
                                                        err_txt(err)
                                                    }
                                                    else{
                                                        return done_txt(`Project ${project_name} removed`)
                                                    }
                                                })
                                            }
                                        })
                                        break

                                }
                            }
                        })
                    }
                    else{
                        err_txt(`Command format is wrong. you need to add parameters for frontend or backend or both`)
                        process.chdir(path.join(process.cwd(), '..'))
                        fs.rmdir(path.join(process.cwd(), project_name), (err)=>{
                            if(err){
                                err_txt(err)
                            }
                            else{
                                done_txt(`Project ${project_name} removed`)
                            }
                        })
                    }
                    if(is_backend_project_created){
                        console.log('backend created')
                    }
                    if(is_frontend_project_created){
                        console.log('frontend created')
                    }
                }
            })
            
        }
    })

program.parse(process.argv)