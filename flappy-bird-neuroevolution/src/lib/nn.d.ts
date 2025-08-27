import p5 from "p5";

export class NeuralNetwork {
  constructor(inputNodes: number, hiddenNodes: number, outputNodes: number);
  predict(inputs: number[]): number[];
  copy(): NeuralNetwork;
  mutate(rate: number, p: p5): void;
  // train(input_array: number[], target_array: number[]): void;
  // serialize(): string;
  // add other methods and properties as needed
}
