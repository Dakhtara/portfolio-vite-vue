import jsonData from "../datas/projects.json"
import Project from "../models/Project"

export default class ProjectProvider {

    getAllProjects(): Array<Project> {
        return jsonData.map(project => {
            return new Project(project.slug, project.backgroundColor, project.pictures, project.title, project.detailedTechnologies, project.projectBackground)
        })
    }
}