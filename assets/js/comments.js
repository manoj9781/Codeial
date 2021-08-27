// JavaScript Document

{
    let createComment = function(){
        let newComment = $('#new-comment-form');
        newComment.submit(function(event){
            event.preventDefault();
            
            $.ajax({
                type:'post',
                url :'/posts/create',
				data: newComment.serialize(),
				success:function(data){
					console.log(data);
					
				},
				error: function(error){
					console.log(error);
				}
            })
        })
    }
    
    createComment();
}
