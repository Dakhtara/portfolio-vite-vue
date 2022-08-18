import jsonData from "../datas/projects.json"
import Project, {ProjectModel} from "../models/Project"

export default class ProjectProvider {
    getAllProjects(): Array<ProjectModel> {
        return jsonData.map(project => {
            return new Project(project.slug, project.backgroundColor, project.pictures, project.title, project.detailedTechnologies, project.projectBackground)
        })
    }

    getProjectBySlug(slug: string): ProjectModel {
        let project = this.getAllProjects().find(project => project.slug === slug);

        if (!project) {
            throw new Error(`Project with slug ${slug} not found`)
        }

        return project;
    }
}
