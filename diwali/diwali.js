const canvas = document.getElementById('canvas');

const context = canvas.getcontext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize',()=>{
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
})

function  