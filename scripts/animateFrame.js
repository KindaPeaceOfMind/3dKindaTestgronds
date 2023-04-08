import { THREE } from './init.js'
export { animationStart }

function animationStart(scene, camera, renderer) {
    
  //Добавляем слушатель событий клавиатуры
  let keyboard = {};
  window.addEventListener('keydown', function(event) {
    keyboard[event.code] = true;
  });
  window.addEventListener('keyup', function(event) {
    keyboard[event.code] = false;
  });

  /** Рендер кадра
   *  -Переход на другую вкладку останавливает кадры */
  animateFrame()
  function animateFrame() {
    requestAnimationFrame(animateFrame)
    // Получаем текущее положение камеры
    let speed = 0.1;
    let position = camera.position.clone();

    // Обновляем положение камеры на основе нажатых клавиш
    if (keyboard['ShiftLeft']) {
      speed += 0.2;
    }if (keyboard['KeyW']) {
      position.z -= speed;
      // console.log(camera)
    }
    if (keyboard['KeyS']) {
      position.z += speed;
    }
    if (keyboard['KeyA']) {
      position.x -= speed;
    }
    if (keyboard['KeyD']) {
      position.x += speed;
    }
    if (keyboard['KeyQ']) {
      camera.rotation.y += 0.03;
    }
    if (keyboard['KeyE']) {
      camera.rotation.y -= 0.03;
    }
    // Устанавливаем новое положение камеры
    camera.position.copy(position);

    //???
    if (keyboard['KeyZ']) {
      camera.lookAt(scene.position)
    }

    // Рендерим сцену
    renderer.render(scene, camera);
  }
}