
export function Loggable() {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
        console.log(descriptor);
    }
}
