$('#nova-publicacao').on('submit',  criarPublicacao);

$(document).on('click','.curtir-publicacao', curtirPublicacao);
$(document).on('click','.descurtir-publicacao', descurtirPublicacao);

$('#atualizar-publicacao').on('click', atualizarPublicacao);
$('.deletar-publicacao').on('click', deletarPublicacao);

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
    Swal.fire('Sucesso', 'Publicação criada com sucesso', 'success')
    .then(function(){
      window.location.reload();
    })
  }).fail(function(){
    Swal.fire("Erro!", "Não foi possível cadastrar o usuário!", "error");    
  })
}
    
function curtirPublicacao(e) {
  e.preventDefault();

  const elementoClicado = $(e.target);
  const publicacaoId = elementoClicado.closest('div').data('publicacao-id');

  elementoClicado.prop('disabled', true);

  $.ajax({
    url:`/publicacoes/${publicacaoId}/curtir`,
    method: "POST"
  }).done(function(){
    const contadorCurtidas = elementoClicado.next('span');
    const quantidadeCurtidas = parseInt(contadorCurtidas.text());

    contadorCurtidas.text(quantidadeCurtidas + 1);

    elementoClicado.removeClass('text-primary');
    elementoClicado.addClass('descurtir-publicacao');
    elementoClicado.addClass('text-danger');
    elementoClicado.removeClass('curtir-publicacao');

  }).fail(function(){
    Swal.fire("Erro!", "Erro ao curtir a publicação", "error");
  }).always(function(){
    elementoClicado.prop('disabled', false);
  });

}

function descurtirPublicacao(e) {
  e.preventDefault();

  const elementoClicado = $(e.target);
  const publicacaoId = elementoClicado.closest('div').data('publicacao-id');

  elementoClicado.prop('disabled', true);
  $.ajax({
    url:`/publicacoes/${publicacaoId}/descurtir`,
    method: "POST"
  }).done(function(){
    const contadorCurtidas = elementoClicado.next('span');
    const quantidadeCurtidas = parseInt(contadorCurtidas.text());

    contadorCurtidas.text(quantidadeCurtidas - 1);

    elementoClicado.removeClass('descurtir-publicacao');
    elementoClicado.removeClass('text-danger');
    elementoClicado.addClass('curtir-publicacao');
    elementoClicado.addClass('text-primary');

  }).fail(function(){
    Swal.fire("Erro!", "Erro ao descurtir publicação!", "error");
  }).always(function(){
    elementoClicado.prop('disabled', false);
  });

}

function atualizarPublicacao(e) {
  $(this).prop('disabled', true);
  const publicacaoId = $(this).data('publicacao-id');

  $.ajax({
    url: `/publicacoes/${publicacaoId}`,
    method: "PUT",
    data:{
      titulo: $('#titulo').val(),
      conteudo: $('#conteudo').val()
    }
  }).done(function (){
  Swal.fire('Sucesso', 'Publicação atualizada com sucesso', 'success')
    .then(function(){
      window.location = '/home';
    })
  }).fail(function (){  
    Swal.fire("Erro!", "Erro ao editr a publicação", "error");
  }).always(function (){
    $('#atualizar-publicacao').prop('disabled', false)
  })
}

function deletarPublicacao(e) {
  e.preventDefault();

  Swal.fire({
    title:"Atenção!",
    text: "Tem certeza que deseja excluir essa publicação?",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    icon: "warning"
  }).then(function (confirmacao) {
    if(!confirmacao.value) return;

    const elementoClicado = $(e.target);
    const publicacao = elementoClicado.closest('div')
    const publicacaoId = publicacao.data('publicacao-id');
  
    elementoClicado.prop('disabled', true);
  
    $.ajax({
      url: `/publicacoes/${publicacaoId}`,
      method: 'DELETE'
    }).done(function(){
      publicacao.fadeOut("slow", function(){
        $(this).remove();
      });
    }).fail(function(){
      Swal.fire("Erro!", "Erro ao excluir publicação!", "error");
    });
  })
}