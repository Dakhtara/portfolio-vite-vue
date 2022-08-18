import PortfolioExperience from "../PortfolioExperience";
import * as THREE from 'three';
import Resources from "../Utils/Resources";
import Debug from "../Utils/Debug";
import GUI from "lil-gui";

export default class Environment {

    experience: PortfolioExperience
    scene: THREE.Scene
    resources: Resources
    debug: Debug
    debugFolder: GUI|undefined

    constructor() {
        this.experience = new PortfolioExperience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('environment')
        }

        this.setSunLight()
    }

    private setSunLight() {
        let debugObject = {
            color: "#FAFAFA",
            color2: "#371561"
        }
        let directionalLight = new THREE.PointLight(debugObject.color, 2)
        directionalLight.position.set(-2, .46, 4)
        directionalLight.castShadow = true
        directionalLight.shadow.camera.far = 5
        // let cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
        this.scene.add(directionalLight)
        // this.scene.add(cameraHelper)
        if (this.debugFolder) {
            this.debugFolder.add(directionalLight.position, 'x').min(-4).max(4).step(.001).name("LightPosX")
            this.debugFolder.add(directionalLight.position, 'y').min(-4).max(4).step(.001).name("LightPosY")
            this.debugFolder.add(directionalLight.position, 'z').min(-4).max(12).step(.001).name("LightPosZ")
            this.debugFolder.add(directionalLight, 'intensity').min(0).max(4).step(.001).name("LightIntensity")
            this.debugFolder.addColor(debugObject, 'color').name("LightColor").onChange(() => {
                directionalLight.color.set(debugObject.color)
            })
        }

        let directionalLight2 = new THREE.PointLight(debugObject.color2, 1.24)
        directionalLight2.position.set(1.05, .16, 4)
        directionalLight2.castShadow = true
        directionalLight2.shadow.camera.far = 5
        // let cameraHelper2 = new THREE.CameraHelper(directionalLight2.shadow.camera)
        this.scene.add(directionalLight2)
        // this.scene.add(cameraHelper2)
        if (this.debugFolder) {
            this.debugFolder.add(directionalLight2.position, 'x').min(-4).max(4).step(.001).name("LightPosX")
            this.debugFolder.add(directionalLight2.position, 'y').min(-4).max(4).step(.001).name("LightPosY")
            this.debugFolder.add(directionalLight2.position, 'z').min(-4).max(12).step(.001).name("LightPosZ")
            this.debugFolder.add(directionalLight2, 'intensity').min(0).max(4).step(.001).name("LightIntensity")
            this.debugFolder.addColor(debugObject, 'color2').name("LightColor").onChange(() => {
                directionalLight2.color.set(debugObject.color2)
            })
        }

    }
}
