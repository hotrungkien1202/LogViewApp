export class File{
    file_name: string;
    load_factor: number;
    res_time: string;

    constructor(file_name, load_factor, res_time){
        this.file_name = file_name;
        this.load_factor = load_factor;
        this.res_time = res_time;
    }
}