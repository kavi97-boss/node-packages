# easy-project

This package is for make basic template projects easialy. For now this can only build react template and basic express server template only. I'm currently upgrading this package for more frameworks and libraries.

you must install this on glabaly

```
npm install -g easy-project
```

## Example 01 - Create react project

React is a frontend library so you have to declare as `--frontend react` or `-f react` for create project.

```
easy-project create project-name --frontend react
```

or

```
easy-project create project-name -f react
```

## Example 02 - Create nodejs express project

Express is use for backend server with nodejs so you have to use `--backend node` or `-b node` for create basic nodejs express server project.

```
easy-project create project-name --backend node
```

or

```
easy-project create project-name -b node
```

## Example 03 - Create both frontend and backend same time

For this you have use `-f` and `-b` both attributes

```
easy-project create project-name --frontend react --backend node
```

or

```
easy-project create project-name -f react -b node
```

### Frontend libraries/framework list

-   `-f react` or `--frontend react` for ReactJS
-   `-f next` or `--frontend next` for NextJS
-   `-f angular` or `--frontend angular` for Angular

### Backend libraries/framework list

-   `-b express` or `--backend express` Express server
-   `-b flask` or `--backend flask` Flask server

Thank you for using `easy-project` have fun !!!
