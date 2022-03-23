$('#login').on('submit', fazerLogin);

function fazerLogin(e) {
  e.preventDefault();

  $.ajax({
    url: "/login",
    method: "POST",
    data: {
      email: $('#email').val(),
      senha: $('#senha').val(),
    }
  }).done(function(){
    window.location = "/home";
  }).fail(function(){
    Swal.fire("Erro!", "Usuário ou senha inválidos", "error");
  })
}