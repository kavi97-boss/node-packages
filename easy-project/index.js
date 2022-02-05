#!/usr/bin/env node

import {cmd, createFolder, deleteProject, done_txt, err_txt, jsonNameEdit, makeProject, packageVersion, __dirname} from './funcs.js'
import program from 'commander'
import path from 'path'
import fs from 'fs-extra'


const from_path = __dirname
const current_path = process.cwd()
const VERSION = packageVersion()


const frontend = {
    react:path.join(from_path, 'templates', 'react'),
    next:path.join(from_path, 'templates', 'next'),
    angular:path.join(from_path, 'templates', 'angular')
}
const backend = {
    express:path.join(from_path, 'templates', 'express'),
    flask:path.join(from_path, 'templates', 'flask')
}

const BACKEND = 'backend'
const FRONTEND = 'frontend'

// application details
program
  .name('easy-project')
  .description('Easy to create project with many templates')
  .version(VERSION);

// options
program
    .option('-f, --frontend <frontend>', 'set frontend framework or library list: react, next, angular')
    .option('-b, --backend <backend>', 'set backend framework or library list: express, flask')

// application action
program
    .command("create <project-name>")
    .description('create web base projects with basic template')
    .action((project_name)=>{
        const options = program.opts()

        const project_exist = fs.existsSync(path.join(current_path, project_name))

        if(project_exist){
            err_txt('Project name exist please choose another name')
            return process.exit()
        }
        else{
            const path_to_project = path.join(current_path, project_name)
            // create project folder
            createFolder(path_to_project, ()=>{
                done_txt(`${project_name} created`)

                makeProject(backend.flask, path_to_project)

                // cd to project folder
                process.chdir(path_to_project)

                // if backend attribute exist
                if(options.backend){
                    const path_to_backend = path.join(path_to_project, BACKEND)

                    // create backend folder
                    createFolder(path_to_backend, ()=>{
                        switch (options.backend){
                            // create express project
                            case('express'):{
                                makeProject(backend.express, path_to_backend, ()=>{
                                    process.chdir(path_to_backend)
                                    jsonNameEdit(path.join(path_to_backend, 'package.json'), `${project_name}-backend`, ()=>{
                                        cmd('npm install', ()=>{
                                            done_txt('Project requirements installed')
                                            done_txt('Express project created successfully!')
                                        },()=>{
                                            deleteProject(project_name, current_path)
                                        })
                                    }, ()=>{
                                        deleteProject(project_name, current_path)
                                    })
                                },()=>{
                                    deleteProject(project_name, current_path)
                                })
                                break
                            }
                            // create flask project
                            case('flask'):{
                                makeProject(backend.flask, path_to_backend, ()=>{
                                    cmd('pip install flask flask-cors',()=>{
                                        done_txt('Project requirements installed')
                                        done_txt('Flask project created successfully!')
                                    },()=>{
                                        deleteProject(project_name, current_path)
                                    })
                                },()=>{
                                    deleteProject(project_name, current_path)
                                })
                                break
                            }
                            default:{
                                // cd to project folder
                                deleteProject(project_name, current_path)  
                                break                             
                            }
                        }
                    })
                }
                if(options.frontend){
                    const path_to_frontend = path.join(path_to_project, FRONTEND)

                    createFolder(path_to_frontend, ()=>{
                        switch (options.frontend){
                            // create react project
                            case('react'):{
                                makeProject(frontend.react, path_to_frontend, ()=>{
                                    process.chdir(path_to_frontend)
                                    jsonNameEdit(path.join(path_to_frontend, 'package.json'), `${project_name}-frontend`,()=>{
                                        cmd('npm install', ()=>{
                                            done_txt('Project requirements installed')
                                            done_txt('ReactJS project created successfully!')
                                        },()=>{
                                            deleteProject(project_name, current_path)
                                        })
                                    },()=>{
                                        deleteProject(project_name, current_path)
                                    })                                    
                                },()=>{
                                    deleteProject(project_name, current_path)
                                })
                                break
                            }
                            // create nextjs project
                            case('next'):{
                                makeProject(frontend.next, path_to_frontend, ()=>{
                                    process.chdir(path_to_frontend)
                                    jsonNameEdit(path.join(path_to_frontend, 'package.json'), `${project_name}-frontend`,()=>{
                                        cmd('npm install', ()=>{
                                            done_txt('Project requirements installed')
                                            done_txt('NextJS project created successfully!')
                                        },()=>{
                                            deleteProject(project_name, current_path)
                                        })
                                    },()=>{
                                        deleteProject(project_name, current_path)
                                    })                                    
                                },()=>{
                                    deleteProject(project_name, current_path)
                                })
                                break
                            }
                            // create angular project
                            case('angular'):{
                                makeProject(frontend.angular, path_to_frontend, ()=>{
                                    process.chdir(path_to_frontend)
                                    jsonNameEdit(path.join(path_to_frontend, 'package.json'), `${project_name}-frontend`,()=>{
                                        cmd('npm install -g @angular/cli', ()=>{
                                            cmd('npm install', ()=>{
                                                done_txt('Project requirements installed')
                                                done_txt('NextJS project created successfully!')
                                            })
                                        },()=>{
                                            deleteProject(project_name, current_path)
                                        })
                                    },()=>{
                                        deleteProject(project_name, current_path)
                                    })
                                },()=>{
                                    deleteProject(project_name, current_path)
                                })
                                break
                            }
                            // defaults
                            default:{
                                // cd to project folder
                                deleteProject(project_name, current_path)  
                                break                             
                            }
                        }
                    })
                }
                else{
                    // if there is no any -f or -b attribute delete project folder
                    process.chdir(current_path)
                    deleteProject(project_name, current_path)                  
                }
            })
        }
    })


program.parse(process.argv)