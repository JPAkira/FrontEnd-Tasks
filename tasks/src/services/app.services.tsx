import { appSources } from "./appSources";
export class AppService {
    public async getTasks(path = ''): Promise<any> {
        let source = appSources('http://47.88.1.91/backend/api/tasks/')
        const response = source.get(path);
        return response;
    }
}