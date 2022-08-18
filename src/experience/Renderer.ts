import OnResizeTriggerInterface from "./Interfaces/OnResizeTriggerInterface";
import OnUpdateTriggerInterface from "./Interfaces/OnUpdateTriggerInterface";
import PortfolioExperience, {Parameters} from "./PortfolioExperience";
import Sizes from "./Utils/Sizes";
import Camera from "./Camera";
import * as THREE from "three";

export default class Renderer implements OnResizeTriggerInterface, OnUpdateTriggerInterface
{
    experience: PortfolioExperience
    canvas: HTMLElement
    sizes: Sizes
    scene: THREE.Scene
    camera: Camera
    instance: THREE.WebGLRenderer
    parameters: Parameters

    constructor() {
        this.experience = new PortfolioExperience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.parameters = this.experience.parameters

        this.setInstance()
    }

    private setInstance(): void {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.instance.physicallyCorrectLights = true
        this.instance.outputEncoding = THREE.sRGBEncoding
        this.instance.toneMapping = THREE.CineonToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor(this.parameters.clearColor ?? '#121C27')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    onResize(): void {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    onUpdate(): void {
        this.instance.render(this.scene, this.camera.instance)
    }

}
