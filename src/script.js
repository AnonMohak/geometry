import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'


//canvas
const canvas = document.querySelector("canvas.webgl")

//scene
const scene = new THREE.Scene()

//mesh
//SphereGeometry(radius, widthSegment, heightSegment)
//const sphereGeo=new THREE.SphereGeometry(15,64,32)
//const sphereMat=new THREE.MeshBasicMaterial({color: 'white', wireframe: true})

//const boxGeo=new THREE.BoxGeometry(1,1,1,3,3,3)
//my Geo
//const positionsArray=new Float32Array([
//	0,0,0,
//	0,1,0,
//	1,0,0
//])
//
//const positionsAttribute=new THREE.BufferAttribute(positionsArray, 3)
//const myGeo=new THREE.BufferGeometry()
//myGeo.setAttribute('position', positionsAttribute)
//
//
//bunch of random triangles
const myGeo=new THREE.BufferGeometry()
const count=100
const positionsArray=new Float32Array(count*3*3)

for(let i=0; i<count*3*3; i++){
	positionsArray[i]=(Math.random() -0.5)*2
}

const positionsAttribute=new THREE.BufferAttribute(positionsArray, 3)
myGeo.setAttribute('position', positionsAttribute)


const boxMat=new THREE.MeshBasicMaterial({color: 'white', wireframe: true})
const mesh = new THREE.Mesh(myGeo, boxMat)
scene.add(mesh)

//camera
const sizes={
	width: window.innerWidth,
	height: window.innerHeight
}

const aspectRatio = sizes.width/sizes.height

const camera=new THREE.PerspectiveCamera(75, aspectRatio)
camera.position.z=3	//60 for sphere
scene.add(camera)

//resize event
window.addEventListener("resize", ()=>{
	sizes.width=window.innerWidth
	sizes.height=window.innerHeight

	camera.aspect=sizes.width/sizes.height
	camera.updateProjectionMatrix()

	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//dbl click event
window.addEventListener("dblclick", ()=>{
	if(!document.fullscreenElement){
		canvas.requestFullscreen()
	}
	else{
		document.exitFullscreen()
	}
})

//controls
const controls=new OrbitControls(camera, canvas)
controls.enableDamping=true


//renderer
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)

//tick
const tick = ()=>{
	controls.update()

	renderer.render(scene, camera)

	window.requestAnimationFrame(tick)
}
tick()
