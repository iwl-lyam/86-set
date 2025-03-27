import {BytecodeInstruction} from "./util"

/**
 * AsmToByte
 * Takes in an ASM (intel) x86 instruction (e.g. MOV EAX, 42) and outputs the correspoding bytecode
 * @param {string} input - ASM instruction, case insensitive
 * @returns {BytecodeInstruction} Equivalent bytecode instruction (x86)
 */
export default function AsmToByte(input: string) : BytecodeInstruction {
       
    return {opcode:0,args:[]}
}