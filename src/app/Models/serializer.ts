import { Resource } from './resource';
export class Serializer<T extends Resource>
{
    constructor(private type: new () => T) { }
    fromJson(json: any): T {
        return Object.assign(new this.type, json);
    }
    toJson(resource: T): any {
        return JSON.parse(JSON.stringify(resource));
    }
}