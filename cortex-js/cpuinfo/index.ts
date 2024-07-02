export type InstructionSet = 'AVX' | 'AVX2' | 'AVX512'; // Add more as needed later
export const cpuInfo = require('bindings')('cpuinfo') as {
  cpuInfo: () => InstructionSet[];
};
