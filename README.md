
# Issue Tracker 







## Features of this app

- Create, Read, Update and Delete issues.
- Issues are sorted by priority 
- Backend Api in Nodejs 
- Storing values in MongoDB



## Environment Variables

To run this project, you will need to add the following environment variables to your config/default.json file

`"MongoURI": "<Paste-here-your-mongoDB-connection-string>"`




## Installation (Please follow the order)

Install dependencies
1) Go in the project root (to install server dependencies)

```bash
  npm install 
  
```
2) cd to client (to install client dependencies) 



```bash
  cd client
  npm install
```

3) cd back to root and run the project.



```bash
  cd ../
  npm run dev
```
4) The project will now be running in developer mode (Client on localhost:3000, server on localhost:5000) using concurrently script.

## Tech Stack

**Client:** ReactJs, Redux, HTML, CSS

**Server:** NodeJs, Express

**Database:** MongoDB





