export class CreateTaskDTO {
    constructor(
        public title: string,
        public content: string,
        public date: string,
        public authorId: number,
    ) {}
}