export interface Usecase<inputDTO, OutputDTO>{
    exceute(input: inputDTO): Promise<OutputDTO>;
}
