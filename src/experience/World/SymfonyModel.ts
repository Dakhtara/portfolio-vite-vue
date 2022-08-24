import PortfolioExperience from "../PortfolioExperience";
import * as THREE from 'three';
import Resources from "../Utils/Resources";
import OnUpdateTriggerInterface from "../Interfaces/OnUpdateTriggerInterface";
import Time from "../Utils/Time";
import Debug from "../Utils/Debug";
import GUI from "lil-gui";
import gsap, {Bounce} from "gsap";
import OnMouseMoveTriggerInterface from "../Interfaces/OnMouseMoveTriggerInterface";

export default class SymfonyModel implements OnUpdateTriggerInterface, OnMouseMoveTriggerInterface
{
    experience: PortfolioExperience
    scene: THREE.Scene
    resources: Resources
    resource: any
    model: THREE.Scene
    time: Time
    debug: Debug
    debugModel: GUI|undefined
    tween: any
    startUpdate: boolean = false
    startTime: number = 0
    initialPosition = {
        x: 2,
        y: 0,
        z: 0
    }
    constructor() {
        this.experience = new PortfolioExperience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        if (this.debug.active) {
            this.debugModel = this.debug.ui.addFolder('symfonyModel')
        }
        // @ts-ignore
        this.resource = this.resources.items.symfonyModel
        this.model = this.resource.scene
        this.buildModel()
    }

    private buildModel() {
        this.scene.add(this.model)
        this.model.traverse((child: any) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.rotation.x = Math.PI * .5
                child.position.y = -.2
                child.updateMatrix()
                child.geometry.applyMatrix4(child.matrix);

                child.position.set( 0, 0, 0 );
                child.rotation.set( 0, 0, 0 );
                child.scale.set( 1, 1, 1 );
                child.updateMatrix();
                child.castShadow = true
            }
        })
        this.model.position.x = this.initialPosition.x

        this.tween = gsap.from(this.model.position, {y: 2, duration: 1.4, ease: Bounce.easeOut})
        gsap.from(this.model.scale, {x: 0, y: 0, duration: 1, ease: "power1"})

        this.tween.eventCallback("onComplete", () => {
          this.startUpdate = true;
          this.startTime = this.time.elapsed;
        })
        if(this.debugModel) {
            this.debugModel.add(this.model.position, "x").min(-4).max(4).step(.01).name("ModelPosX")
            this.debugModel.add(this.model.position, "y").min(-4).max(4).step(.01).name("ModelPosY")
            this.debugModel.add(this.model.position, "z").min(-4).max(4).step(.01).name("ModelPosZ")
        }
    }

    onUpdate(): void {
        if (this.startUpdate) {
            this.model.rotation.y = (this.startTime - this.time.elapsed) * .0005
        }
    }

    onMouseMove(e: MouseEvent): void {
        let x = e.clientX / window.innerWidth
        let y = e.clientY / window.innerHeight
        let xVelocity = 0.5
        let yVelocity = 0.5
        let transformX = this.initialPosition.x - ((x - .5) * xVelocity)
        let transformY = -(this.initialPosition.y - ((y - .5) * yVelocity))

        gsap.to(this.model.position, {
            duration: 1,
            x: transformX,
            y: transformY
        })
    }
}
