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
      });
    });

    $('#send-message').click(function () {
      let msg = $('#chat-message-input').val();

      if (msg != '') {
        self.socket.emit('sendMessage', {
          message: msg,
          user_email: self.userEmail,
          chatRoom: 'codeial',
        });
      }
    });

    self.socket.on('recieveMessage', function (data) {
      console.log('Message Recieved', data.message);

      let newMessage = $('<li>');

      let messageType = 'other-message';

      if (data.user_email == self.userEmail) {
        messageType = 'self-message';
      }

      newMessage.append($(
        '<span>', {
          html: data.message,
        }
      ));

      newMessage.append($(
        '<sub>', {
          html: data.user_email,
        }
      ));

      newMessage.addClass(messageType);

      $('#chat-messages-list').append(newMessage);
    });
  }
}
