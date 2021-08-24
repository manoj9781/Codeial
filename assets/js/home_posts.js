{
    // Method to submit the form data for new Post in AJAX
    let createPost = function () {
        let newPostForm = $('#new-post-from');
        newPostForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    console.log(data);
                },
                error: function (error) {
                    console.log(error.responseText);
                },
            });
        });
    }
    createPost();
   
}