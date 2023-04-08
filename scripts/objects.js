import {THREE, OBJLoader} from './init.js'

function addGround(scene){
  // Добавляем землю
  let ground = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 10, 10), 
    new THREE.MeshBasicMaterial({color: 0x999999, wireframe: false})
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);
}
function addCube(scene){
  // Добавляем объекты в сцену 1
  let cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1), 
    new THREE.MeshBasicMaterial({color: 0xff0000})
  );
  cube.position.set(0, 5, 0);
  scene.add(cube);
}
function addLine(scene){
  // Добавляем объекты в сцену 2
  const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
  const points = [];
  points.push(new THREE.Vector3( -10, 0, 0 ));
  points.push(new THREE.Vector3( 0, 10, 0 ));
  points.push(new THREE.Vector3( 10, 0, 0 ));
  const geometry = new THREE.BufferGeometry().setFromPoints( points );
  const line = new THREE.Line( geometry, material );
  line.position.set(0, 0, 0);
  scene.add(line);
}

// 3D объект
function addNinja(scene) {

  let texture1 = new THREE.Texture();
  // Текстура (тени, нормаль)
  ImageLoadToTextureProp(texture1, 'image', 'ninja/displacement.jpg')
  ImageLoadToTextureProp(texture1, 'aoMap', 'ninja/ao.jpg')
  ImageLoadToTextureProp(texture1, 'normalMap', 'ninja/normal.png')

  // Модель
  // Загрузчик .obj файлов
  let objLoader = new OBJLoader();
  
  // Параметры объекта 
  let ObjectParams = {
    scale: new THREE.Vector3(0.1, 0.1, 0.1),
    position: new THREE.Vector3(0, -17, 0),
    name: 'ninja1'
  }
  // Загрузка с добавлением на сцену
  let ninja1 = ObjectCreator(scene, objLoader, 'ninja/ninjaHead_Low.obj', ObjectParams, true)

  ninja1.then((res)=>{
    // console.log( res,' is loaded' ) 
    //Текстуры
    res.traverse( function(child) {
      if (child.isMesh){      // if (child instanceof THREE.Mesh){
        child.material.map = texture1;
      }
    })
  })
  return ninja1
}

//Загрузчик картинок (в свойства текстуры)
function ImageLoadToTextureProp(texture, prop, url){
  let imageLoader = new THREE.ImageLoader();
  imageLoader.load(
    url,
    function(image){
      texture[prop] = image
      texture.needsUpdate = true;
    },
    (msg)=>{console.log('loading '+url+' '+msg)},
    (msg)=>{console.log('error_loading '+url+' '+msg)}
  )
}
//Загрузчик объектов 
function ObjectCreator(scene, loader, url, permissions, sceneAdd){
  let objId;
  let promise = new Promise(function(resolve){
    loader.load(
      url,
      function ( object ) {
        // Для return
        // Копируем свойства
        for(let prop in permissions){                       
          if(permissions[prop] instanceof THREE.Vector3)
          { 
            object[prop].copy(permissions[prop])
          }else{
            object[prop] = permissions[prop]
          }
        }
        //Добавляем на сцену
        if(sceneAdd){ scene.add(object) }
        resolve(object)
      }
    )
  })
  return promise // scene.getObjectById(objId)
}
export {addGround, addCube, addLine, addNinja}