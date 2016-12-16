$('#btnUpvote').on('click', function (e) {
  e.preventDefault()
  var url = document.URL.split("/")
  var size = url.length
  const str = '/ajax' + $(this).attr('href')
  //console.log(str)
  
  Promise.resolve(
    $.ajax({
    url: str,
    method: 'GET',
    dataType: 'json',
    headers: { 'csrf-token': $('[name="_csrf"]').val() }
          })
  )
    .then(json => {
      if (json.success) {              
              $('#btnGroup').load('/picture/'+url[size-1]+ ' #btnGroup>*',"")

              $('#progressbar').load('/picture/'+url[size-1]+ ' #progressbar>*',"")
      } else {
          $errorContainer.show().text('Nem megfelelő adatok')
      }
          })
      .catch(err => console.log(err))
      })

$('#btnDownvote').on('click', function (e) {
  e.preventDefault()
  var url = document.URL.split("/")
  var size = url.length
  const str = '/ajax' + $(this).attr('href')
  //console.log(str)
  
  Promise.resolve(
    $.ajax({
    url: str,
    method: 'GET',
    dataType: 'json',
    headers: { 'csrf-token': $('[name="_csrf"]').val() }
          })
  )
    .then(json => {
      if (json.success) {              
              
              $('#btnGroup').load('/picture/'+url[size-1]+ ' #btnGroup>*',"")
              // $("#myDiv").load(location.href+" #myDiv>*","");
              $('#progressbar').load('/picture/'+url[size-1]+ ' #progressbar>*',"")
      } else {
          $errorContainer.show().text('Nem megfelelő adatok')
      }
          })
      .catch(err => console.log(err))
      })