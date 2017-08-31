const callIndex = function(){
  const btn = document.querySelector('input[type="button"')
  btn.addEventListener('click', function(){
    location.href = '/write'
  })
}

const callWrite = function(){
  const listBtn = document.getElementsByClassName('listBtn')[0]
  const sendBtn = document.getElementsByClassName('sendBtn')[0]

  listBtn.addEventListener('click', function(){
    location.href = '/'
  })
}
