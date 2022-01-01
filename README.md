# File-Upload 🖇

This project is a Full Stack File Uplaod project, the frontent is React and for backend I used node.js express framework.For storing files I used server's filesystem, though it's not a good practice, because after each server update filesystem get updated and you lose it, anyway it's the only way to store files for free😅 for now and this project had also purpose to strengthen my skills in pure node.js filesystem modules. I hosted both client and server sides on heroku.

## Packgaes and technologies 
- styled-components
- react
- typescript
- express
- multer


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

#### server

`PORT`
`NODE_ENV=development`
`BACKEND_URL=http://localhost:${PORT}`

#### client

`REACT_APP_SERVER_URL`

## Project link
[File Upload](http://file-upload-client.herokuapp.com/)
