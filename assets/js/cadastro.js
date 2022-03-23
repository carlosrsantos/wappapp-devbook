$('#formulario-cadastro').on('submit', criarUsuario);

function criarUsuario(evento) {
  evento.preventDefault();

  if($('#senha').val() != $('#confirmar-senha').val()) {    
    Swal.fire("Hum...", "Senhas não coincidem", "error");
    return;
  }

  $.ajax({
    url: "/usuarios",
    method: "POST",
    data: {
      nome: $('#nome').val(),
      nick: $('#nick').val(),
      email: $('#email').val(),
      senha: $('#senha').val(),
    }
  }).done(function() {
    Swal.fire("Sucesso!", "Usuário cadastrado com sucesso!", "success")
      .then(function(){
        $.ajax({
          url: "/login",
          method: "POST",
          data:{
            email: $('#email').val(),
            senha: $('#senha').val(),
          }          
        }).done(function(){
          window.location = "/home";
        }).fail(function(){
          Swal.fire("Erro!", "Erro ao autenticar o usuário!", "error")
        })
      })
    
  }).fail(function(erro) {
    console.log(erro);
    Swal.fire("Erro!", "Não foi possível cadastrar o usuário!", "error");
  })
}
