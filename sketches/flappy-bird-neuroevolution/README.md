# Flappy Bird Neuro-Evolution
Learning to play Flappy Bird using neural networks, reinforcement learning and genetic algorithms.

**Basic idea**: create a population of agents (birds) that learn to play the game. Each agent has a neural network that takes the game state as input and outputs an action (flap or not flap). 
The agents are evaluated based on their performance (score) and the best performing agents are selected to create a new generation of agents using genetic algorithms (crossover and mutation).
For simplicity, the game state is represented by manually extracted features (bird's y position, distance to next pipe, height of next pipe gap, etc.) instead of using raw pixel data.

## Tags
- #neuralnetworks
- #geneticalgorithms
- #machinelearning
- #reinforcementlearning
- #game

## Setup
This project was created using the `vanilla-ts` template of vite using the following command:
```bash
npm create vite@latest flappy-bird-neuroevolution -- --template vanilla-ts
```

Install the dependencies:
```bash
npm install
```

## Dependencies

Used libraries:
- The neural network and matrix utilities are taken from https://github.com/CodingTrain/Toy-Neural-Network-JS