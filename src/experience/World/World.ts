import PortfolioExperience from "../PortfolioExperience";
import * as THREE from "three";
import Resources from "../Utils/Resources";
import Environment from "./Environment";
import TailwindModel from "./TailwindModel";
import OnUpdateTriggerInterface from "../Interfaces/OnUpdateTriggerInterface";
import VueJsModel from "./VueJsModel";
import FigmaModel from "./FigmaModel";
import PhpModel from "./PhpModel";
import SymfonyModel from "./SymfonyModel";
import OnMouseMoveTriggerInterface from "../Interfaces/OnMouseMoveTriggerInterface";

export default class World implements OnUpdateTriggerInterface, OnMouseMoveTriggerInterface {
    experience: PortfolioExperience
    scene: THREE.Scene
    resources: Resources
    environment: Environment
    tailwindModel: TailwindModel
    vuejsModel: VueJsModel
    figmaModel: FigmaModel
    phpModel: PhpModel
    symfonyModel: SymfonyModel

    constructor() {
        this.experience = new PortfolioExperience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        //@ts-ignore
        this.resources.on('ready', () => {
            this.environment = new Environment()
            this.tailwindModel = new TailwindModel()
            this.vuejsModel = new VueJsModel()
            this.figmaModel = new FigmaModel()
            this.phpModel = new PhpModel()
            this.symfonyModel = new SymfonyModel()
        })
    }

    onUpdate(): void {
        if (this.tailwindModel) {
            this.tailwindModel.onUpdate()
        }

        if (this.vuejsModel) {
            this.vuejsModel.onUpdate()
        }

        if (this.figmaModel) {
            this.figmaModel.onUpdate()
        }

        if (this.phpModel) {
            this.phpModel.onUpdate()
        }

        if (this.symfonyModel) {
            this.symfonyModel.onUpdate()
        }
    }

    onMouseMove(mouseEvent: MouseEvent) {
        if (this.symfonyModel) {
            this.symfonyModel.onMouseMove(mouseEvent)
        }
    }
}
