
export type ProjectModel = {
    slug: string;
    backgroundColor: string;
    pictures: Array<string>;
    title: string;
    detailedTechnologies: Array<string>;
    projectBackground: string;
}

export default class Project implements ProjectModel {
    slug: string;
    backgroundColor: string;
    pictures: Array<any>;
    title: string;
    detailedTechnologies: Array<string>;
    projectBackground: string;

    constructor(slug: string, backgroundColor: string, pictures: Array<any>, title: string, detailedTechnologies: Array<string>, projectBackground: string) {
        this.slug = slug;
        this.backgroundColor = backgroundColor;
        this.pictures = pictures;
        this.title = title;
        this.detailedTechnologies = detailedTechnologies;
        this.projectBackground = projectBackground;
    }
}