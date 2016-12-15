function ajaxUpvote(url) {
  const headers = {
    'csrf-token': $('[name="_csrf"]').val()
  }
  return Promise.resolve(
    $.ajax({
      url,
      method: 'GET',
      dataType: 'json',
      headers
    })
  )
}

function ajaxDownvote(url) {
  const headers = {
    'csrf-token': $('[name="_csrf"]').val()
  }
  return Promise.resolve(
    $.ajax({
      url,
      method: 'GET',
      dataType: 'json',
      headers
    })
  )
}

$('#btnUpvote').on('click', function (e) {
  e.preventDefault()
  const url = '/ajax' + $(this).attr('href')
      ajaxUpvote(url)
        .then(data => {
          location.assign('/')
        })
        .catch(xhr => {
          $('.help-block').text(xhr.responseText)
        })
})

$('#btnDownvote').on('click', function (e) {
  e.preventDefault()
  const url = '/ajax' + $(this).attr('href')
      ajaxDownvote(url)
        .then(data => {
          location.assign('/')
        })
        .catch(xhr => {
          $('.help-block').text(xhr.responseText)
        })
})