$('#nova-publicacao').on('submit',  criarPublicacao);
$('.curtir-publicacao').on('click', curtirPublicacao);

function criarPublicacao(e){  
  e.preventDefault();

  $.ajax({
    url:"/publicacoes",
    method:"POST",
    data: {
      titulo: $('#titulo').val(),
      conteudo: $('#conteudo').val(),
    }
  }).done(function(){
    window.location = "/home";
  }).fail(function(){
    alert("Erro ao criar a publicação!");    
  })
}
    
function curtirPublicacao(e) {
  e.preventDefault();

  const elementoClicado = $(e.target);
  const publicacaoId = elementoClicado.closest('div').data('publicacao-id');

  $.ajax({
    url:`/publicacoes/${publicacaoId}/curtir`,
    method: "POST"
  }).done(function(){
    const contadorCurtidas = elementoClicado.next('span');
    const quantidadeCurtidas = parseInt(contadorCurtidas.text());

    contadorCurtidas.text(quantidadeCurtidas + 1);

  }).fail(function(){
    alert("Erro ao curtir a publicacao!");
  })

}