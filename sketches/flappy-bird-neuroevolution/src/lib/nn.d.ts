import p5 from "p5";

export class NeuralNetwork {
  constructor(inputNodes: number, hiddenNodes: number, outputNodes: number);
  predict(inputs: number[]): number[];
  copy(): NeuralNetwork;
  mutate(rate: number, p: p5): void;
  serialize(): string;
  static deserialize(jsonSerialized: string): NeuralNetwork;
}
