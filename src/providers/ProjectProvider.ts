import jsonData from "../datas/projects.json"
import Project, {ProjectModel} from "../models/Project"
import {Loggable} from "../decorators/loggable";

export default class ProjectProvider {
    @Loggable()
    getAllProjects(): Array<ProjectModel> {
        return jsonData.map(project => {
            return new Project(project.slug, project.backgroundColor, project.pictures, project.title, project.detailedTechnologies, project.projectBackground)
        })
    }
}
