const socket = io();

$('#chat').hide();

$('#login-btn').click(()=>{
    socket.emit('login',{
        name: $('#login-inp').val()
    })
    $('#login').hide();
    $('#chat').show();
})

$('#send-btn').click(()=>{
    socket.emit('send-msg',{
        msg: $('#chat-area').val(),
        id: socket.id
    })
    // $(".emojionearea").emojioneArea({
    //     placeholder: "Message..."
    // });
    
    $('#chat-area').val('');
    $('.emojionearea-editor').text('');
})

socket.on('recieved-msg',data=>{
    $('#list').append(`<li><strong>${data.name}: </strong>${data.msg}</li>`);
})