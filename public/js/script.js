const btnmenu = document.querySelector('#btnmenu')
const menu = document.querySelector('#menu')
const inputs = document.querySelectorAll('.formulario__input')
for(let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keyup',()=>{
        if(inputs[i].value.length >= 1){
            inputs[i].nextElementSibling.classList.add('fijar');
        }else {
            inputs[i].nextElementSibling.classList.remove('fijar');
        }
    })
}

btnmenu.addEventListener('click', () => {
    menu.classList.toggle('mostrar')
})