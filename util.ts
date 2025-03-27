export type AssemblyInstruction = {
    mnemonic: string,
    args: string[]
}

export type BytecodeInstruction = {
    opcode: number,
    args: (number | string)[]
}