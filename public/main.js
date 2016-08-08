$(document).ready(function() {

  $("#delete-button").click(function() {
    var id = $("#delete-id").val()
    console.log(id)
    $.ajax({
       url: "/users/" + id,
       type: 'DELETE',
       success: function (res) {
         $("#delete-result").html(JSON.stringify(res))
         console.log("deleted")
       }
     })
  })

  $("#create-button").click(function() {
    console.log("Create")
    var name = $("#newuser-name").val()
    var email = $("#newuser-email").val()
    var id = Number($("#newuser-id").val())
    console.log(id, name, email)
    var data = JSON.stringify({
      id: id,
      name: name,
      email: email
    })

    $.ajax({
      url: "http://192.168.20.28:3000/users",
      type: 'POST',
      contentType: 'application/json',
      data: data,
      success: function (res) {
        console.log(res)
        $("#create-result").html(JSON.stringify(res))
        console.log("user Created")
      },
      error: function (err) {
        console.log(err)
      }
    })
  })

})
