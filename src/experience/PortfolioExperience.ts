import * as THREE from 'three'
import Debug from "./Utils/Debug";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Renderer from "./Renderer";
import Camera from "./Camera";
import Resources from "./Utils/Resources";
import sources from "./sources";
import World from "./World/World";

let experience: null|PortfolioExperience = null

export interface Parameters {
    clearColor: string|null;
}

export default class PortfolioExperience
{
    camera: Camera
    scene: THREE.Scene
    canvas: HTMLElement
    debug: Debug
    sizes: Sizes
    time: Time
    renderer: Renderer
    sphere: THREE.Mesh
    resources: Resources
    world: World
    parameters: Parameters

    constructor(canvas: HTMLElement|null = null, options: any = null, parameters: Parameters = {clearColor: null}) {
        if (experience) {
            return experience
        }
        experience = this

        console.log("Bootstrap of the experience")
        this.canvas = canvas

        //Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.resources = new Resources(sources)
        this.scene = new THREE.Scene()
        this.camera = new Camera(options.camera)
        this.parameters = parameters
        this.renderer = new Renderer()
        this.world = new World()
        // Resize event
        //@ts-ignore
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time tick event
        //@ts-ignore
        this.time.on('tick', () =>
        {
            this.update()
        })

        document.addEventListener('mousemove', (event) => {
            this.onMouseMove(event)
        })

    }

    private resize(): void {
        this.camera.onResize()
        this.renderer.onResize()
    }

    private update(): void {
        this.camera.onUpdate()
        this.world.onUpdate()
        this.renderer.onUpdate()
    }

    private onMouseMove(mouseEvent): void {
        this.world.onMouseMove(mouseEvent)
    }

    destroy() {
        //@ts-ignore
        this.sizes.off('resize')
        //@ts-ignore
        this.time.off('tick')
        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })
        if (this.camera.controls) {
            this.camera.controls.dispose()
        }
        this.renderer.instance.dispose()

        if(this.debug.active) {
            this.debug.ui.destroy()
        }
        experience = null
    }
}
