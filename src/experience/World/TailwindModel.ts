import PortfolioExperience from "../PortfolioExperience";
import * as THREE from 'three';
import Resources from "../Utils/Resources";
import OnUpdateTriggerInterface from "../Interfaces/OnUpdateTriggerInterface";
import Time from "../Utils/Time";
import Debug from "../Utils/Debug";
import GUI from "lil-gui";

export default class TailwindModel implements OnUpdateTriggerInterface
{
    experience: PortfolioExperience
    scene: THREE.Scene
    resources: Resources
    resource: any
    model: THREE.Scene
    time: Time
    debug: Debug
    debugModel: GUI

    constructor() {
        this.experience = new PortfolioExperience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        if (this.debug.active) {
            this.debugModel = this.debug.ui.addFolder('tailwindModel')
        }
        // @ts-ignore
        this.resource = this.resources.items.tailwindModel
        this.buildModel()
    }

    private buildModel() {
        this.model = this.resource.scene
        this.scene.add(this.model)
        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.rotation.x = Math.PI * .5
                child.position.x = -.5
                child.updateMatrix()
                child.geometry.applyMatrix4(child.matrix);

                child.position.set( 0, 0, 0 );
                child.rotation.set( 0, 0, 0 );
                child.scale.set( 1, 1, 1 );
                child.updateMatrix();
                child.castShadow = true
            }
        })
        if(this.debugModel) {
            this.debugModel.add(this.model.position, "x").min(-4).max(4).step(.01).name("ModelPosX")
            this.debugModel.add(this.model.position, "y").min(-4).max(4).step(.01).name("ModelPosY")
            this.debugModel.add(this.model.position, "z").min(-4).max(4).step(.01).name("ModelPosZ")
        }
    }

    onUpdate(): void {
        this.model.rotation.y = this.time.elapsed * .0005
    }
}
