import {appSources, appSourcesWithoutLogin} from "./appSources";
export class AppService {
    public async getTasks(path = ''): Promise<any> {
        let source = appSources('https://tasks.akiralab.com.br/backend/api/tasks/')
        const response = source.get(path);
        return response;
    }
    public async deleteTask(id: number): Promise<any> {
        let source = appSources(`https://tasks.akiralab.com.br/backend/api/tasks/${id}/`)
        const response = await source.delete('');
        return response.data;
    }
    public async postTask(object: any): Promise<any> {
        let source = appSources('https://tasks.akiralab.com.br/backend/api/tasks/')
        const response = await source.post('', object);
        return response.data;
    }

    public async postUser(object: any): Promise<any> {
        let source = appSources('https://tasks.akiralab.com.br/backend/api/users/')
        const response = await source.post('', object);
        return response.data;
    }

    public async postAuth(object: any): Promise<any> {
        let source = appSourcesWithoutLogin('https://tasks.akiralab.com.br/backend/api/token/')
        const response = await source.post('', object);
        return response.data;
    }

    public async putTask(event: any, id: any): Promise<any> {
        let source = appSources('https://tasks.akiralab.com.br/backend/api/tasks/'.concat(id).concat("/"))
        const response = await source.put("", event);
        return response.data;
    }
}