document.addEventListener("DOMContentLoaded", function() {
  
  var socket = io();
  
  socket.on('add-circle', function(data) {
    addCircle(data);
  });

  socket.on('clear-circle', function() {
    clearCircle();
  });

  var circles = document.getElementById('circles');
  var initials = '';

  circles.addEventListener('click', function(evt) {
        socket.emit('add-circle', {
        //data sent in at click
        initials: initials,
        x: evt.clientX,
        y: evt.clientY,
        dia: randomBetween(10,100),
        rgba: getRandomRGBA()
    });
  });

  document.getElementsByTagName('button')[0].addEventListener('click', function() {
    socket.emit('clear-circle');
  });

  while (initials.length < 2 || initials.length > 3) {
    initials = prompt("Please enter your initials").toUpperCase();
  }

  function addCircle(data) {
    var el = document.createElement('div');
    el.style.left = data.x - Math.floor(data.dia / 2 + 0.5) + 'px';
    el.style.top = data.y - Math.floor(data.dia / 2 + 0.5) + 'px';
    el.style.width = el.style.height = data.dia + 'px';
    el.style.backgroundColor = data.rgba;
    el.style.fontSize = Math.floor(data.dia / 3) + 'px';
    el.style.color = 'white';
    el.style.textAlign = 'center';
    el.style.lineHeight = data.dia + 'px';
    el.innerHTML = data.initials;
    circles.appendChild(el);
  }

  function clearCircle() {
    circles.innerHTML = '';
  }


  function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getRandomRGBA() {
    return ['rgba(', randomBetween(0, 255), ',', randomBetween(0, 255), ',',
      randomBetween(0, 255), ',', randomBetween(2, 10) / 10, ')'].join(''); 
  }

});
