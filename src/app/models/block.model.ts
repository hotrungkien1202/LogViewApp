export class Block{
    block_id : string;
    block_name : string;
    block_ability: string;
    block_distance: string;
    version: string;

    constructor(block_id, block_name){
        this.block_id = block_id;
        this.block_name = block_name;
    }
}