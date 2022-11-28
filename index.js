const app =  require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
const socketio =  require('socket.io');
app.use(cors());

const io = socketio(server, {
     cors:{
         origin:'*',
         methods:['GET', 'PUT', 'DELETE', 'POST']
     }
})


const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
res.send('Server is up and running')
});

io.on("connection", (socket) => {
//Invite new User
socket.emit('message', 'Welcame to exqui chat')

   
    //Join a group
    socket.on('join', (data) =>{
        socket.join(data)
   
    })

    //Runs when an member leaves
  socket.on("disconnect", () => {
     io.emit('message', `The member id ${socket.id} has left the group`)
  })

  //Send text from user
  socket.on('text', data => {
     io.to(data.room).emit('recieve-text', data)
  })

})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});