const callIndex = function(){
  const btn = document.querySelectorAll('input[type="button"')

  btn[0].addEventListener('click', ()=>{ location.href = '/write' })
  btn[1].addEventListener('click', ()=> { location.href = '/adlogin'})
}

const callWrite = function(){
  const listBtn = document.getElementsByClassName('listBtn')[0]
  const sendBtn = document.getElementsByClassName('sendBtn')[0]
  const frm     = document.getElementById('frm')
  const title   = document.getElementById('title')
  const auth    = document.getElementById('auth')
  const cont    = document.getElementById('cont')
  const date    = document.getElementById('date')

  listBtn.addEventListener('click',()=>{ location.href = '/' })
  sendBtn.addEventListener('click', ()=>{
    if(!title.value){ alert("제목을 입력하세요"); title.focus(); return false}
    if(!auth.value){ alert("작성자를 입력하세요"); auth.focus(); return false}
    if(!cont.value){ alert("내용을 입력하세요"); cont.focus(); return false}

    date.value = getDate()
    frm.submit()

  })
}

const callRead = function(){
  const repleBtn = document.getElementsByClassName('repleBtn')[0]
  const listBtn = document.getElementsByClassName('listBtn')[0]

  listBtn.addEventListener('click',()=>{ location.href = '/' })
  repleBtn.addEventListener('click', ()=>{
    const frm     = document.getElementById('refrm')
    const auth    = document.getElementById('auth')
    const cont    = document.getElementById('cont')
    const date    = document.getElementById('date')

    if(!auth.value){ alert("작성자를 입력하세요"); auth.focus(); return false}
    if(!cont.value){ alert("내용을 입력하세요"); cont.focus(); return false}

    date.value = getDate()
    frm.submit()


  })


}

const callAdmin = function(){
  const btn = document.querySelector('input[type="button"')
  btn.addEventListener('click',()=>{ location.href = '/'})
}

const delProc = function(obj){
  const idx = obj.getAttribute('data-value')
  if(confirm('정말 삭제하시겠습니까?\n댓글도 함께 삭제됩니다.')){
    location.href = '/dProc/'+idx
  }
}

const getDate = function(){
  const today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth()+1
  let yy = today.getFullYear()
  if(mm<10) { mm = '0'+mm }
  if(dd<10) { dd = '0'+dd }

  return yy + '-' + mm + '-' + dd
}

const callAdminLogin = function(){
  const btn = document.getElementById('loginBtn')
  btn.addEventListener('click', ()=>{
    const adminID = document.getElementById('adminID')
    const adminPWD = document.getElementById('adminPWD')
    if(adminID.value===''){ alert('관리자 아이디를 입력하세요'); adminID.focus(); return false;}
    if(adminPWD.value===''){ alert('관리자 비빌번호를 입력하세요'); adminPWD.focus(); return false;}

    document.getElementById('loginFrm').submit();
  })
}
