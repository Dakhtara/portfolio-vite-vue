
export default class Debug
{
    active: boolean;
    ui: any;

    constructor()
    {
        this.active = window.location.hash === '#debug'

        if(this.active)
        {
            import('lil-gui').then((ui) => {
                this.ui = new ui.GUI()
            })
        }
    }
}
