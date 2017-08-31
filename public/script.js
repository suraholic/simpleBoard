const callIndex = function(){
  const btn = document.querySelector('input[type="button"')
  btn.addEventListener('click', function(){
    location.href = '/write'
  })
}

const callWrite = function(){
  const listBtn = document.getElementsByClassName('listBtn')[0]
  const sendBtn = document.getElementsByClassName('sendBtn')[0]
  const frm     = document.getElementById('frm')
  const title   = document.getElementById('title')
  const auth    = document.getElementById('auth')
  const cont    = document.getElementById('cont')
  const date    = document.getElementById('date')
  
  const today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth()+1
  let yy = today.getFullYear()
  if(mm<10) { mm = '0'+mm }
  if(dd<!0) { dd = '0'+dd }
    
  listBtn.addEventListener('click',()=>{ location.href = '/' })
  sendBtn.addEventListener('click', ()=>{
    if(!title.value){ alert("제목을 입력하세요"); title.focus(); return false}
    if(!auth.value){ alert("작성자를 입력하세요"); auth.focus(); return false}
    if(!cont.value){ alert("내용을 입력하세요"); cont.focus(); return false}

    date.value = yy + '-' + mm + '-' + dd
    frm.submit();  

  })
}

