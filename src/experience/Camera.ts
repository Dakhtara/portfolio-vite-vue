import * as THREE from 'three'
import PortfolioExperience from "./PortfolioExperience";
import Sizes from "./Utils/Sizes";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import OnResizeTriggerInterface from "./Interfaces/OnResizeTriggerInterface";
import OnUpdateTriggerInterface from "./Interfaces/OnUpdateTriggerInterface";


interface CameraOptions {
    orbitControls: boolean
}

export default class Camera implements OnResizeTriggerInterface, OnUpdateTriggerInterface {
    experience: PortfolioExperience
    instance: THREE.PerspectiveCamera|null = null
    sizes: Sizes
    scene: THREE.Scene
    canvas: HTMLElement
    controls: OrbitControls | null = null
    options: CameraOptions | null = null

    constructor(options: CameraOptions|null = null) {
        this.experience = new PortfolioExperience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.options = options

        this.setInstance()
        if (this.options && this.options.orbitControls) {
            this.setControls()
        }
    }

    private setInstance(): void {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(0, 0, 8)
        this.scene.add(this.instance)
    }

    private setControls(): void {
        if (this.instance) {
            this.controls = new OrbitControls(this.instance, this.canvas)
            this.controls.enableDamping = true
        }
    }

    onResize(): void {
        if (this.instance) {
            this.instance.aspect = this.sizes.width / this.sizes.height
            this.instance.updateProjectionMatrix()
        }
    }

    onUpdate(): void {
        if (this.options && this.options.orbitControls && this.controls) {
            this.controls.update()
        }
    }
}
