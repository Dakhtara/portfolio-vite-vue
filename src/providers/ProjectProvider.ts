import jsonData from "../datas/projects.json"
import Project, {ProjectModel} from "../models/Project"

export default class ProjectProvider {
    getAllProjects(): Array<ProjectModel> {
        return jsonData.map(project => {
            return new Project(project.slug, project.backgroundColor, project.pictures, project.title, project.detailedTechnologies, project.projectBackground)
        })
    }
}