export interface Usecase<inputDTO, OutputDTO>{
    execute(input: inputDTO): Promise<OutputDTO>;
}
