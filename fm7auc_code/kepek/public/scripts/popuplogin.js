$('#btnLogin').on('click', function (e) {
  e.preventDefault()
  const $modal = $('#loginModal')
  if ($modal.length>0) {
    $modal.modal('show')
  } else {
    const $modal = $(`
      <div class="modal fade confirm-modal" tabindex="-1" role="dialog" id="loginModal">
        <div class="modal-dialog modal-md" role="document">
          <div class="modal-content">
            <div class="modal-header">Belépés</div>
            <div class="modal-body">
              <div class="alert alert-danger"></div>
              <div class="form-area"></div>
            </div>
          </div>
        </div>
      </div>
    `)
    const $formContainer = $modal.find('.form-area')
    const $errorContainer = $modal.find('.alert').hide()
    $formContainer.load('/login form', function () {
      $modal.modal('show')
      const $form = $modal.find('form')
      $form.on('submit', function(e) {
        e.preventDefault()
        const data = $(this).serializeArray()
        Promise.resolve(
          $.ajax({
            url: '/ajax/login',
            method: 'POST',
            data,
            dataType: 'json',
            headers: { 'csrf-token': $('[name="_csrf"]').val() }
          })
        )
          .then(json => {
            if (json.success) {
              $('#navContainer').load('/ #navContainer', function() {
                $modal.modal('hide')
              })
              // array.find(function(currentValue, index, arr),thisValue)
              var url = document.URL.split("/")
              var contains = $.inArray('pictures', url) > -1;
              if (contains > -1 ){
                var size = url.length
                //console.log(url[size-1])
                //console.log('/picture/'+url[size-1]+ ' #btnGroup')
                // apró hiba, a gombok nem kerülnek egységes elosztásra
                // undefined viselkedésnek elkönyvelve :D
                // javítva: // $("#myDiv").load(location.href+" #myDiv>*","");
                $('#btnGroup').load('/picture/'+url[size-1]+ ' #btnGroup>*',"")
                $('#voteinfo').load('/picture/'+url[size-1]+ ' #voteinfo>*',"")
              }
              
              
            } else {
              $errorContainer.show().text('Nem megfelelő adatok')
            }
          })
          .catch(err => console.log(err))
      })  
    })
  }
})
