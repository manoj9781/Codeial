class chatEngine {
  constructor(chatBoxId, userEmail) {
    this.chatBox = $(`#${chatBoxId}`);
    this.userEmail = userEmail;

    this.socket = io.connect('http://localhost:8000');

    if (this.userEmail) {
      this.connectionHandler();
    }
  }

  connectionHandler() {
    let self = this;
    this.socket.on('connect', function () {
      console.log('Connection established using socket');

      self.socket.emit('joinRoom', {
        userEmail: self.userEmail,
        chatRoom: 'codeial',
      });
      self.socket.on('user_joined', function (data) {
        console.log('A user joined', data);
    })
    
    });
  }
}
