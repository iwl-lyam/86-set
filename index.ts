import {BytecodeInstruction} from "./util.ts"
import HTML from "html-parse-stringify"

/**
 * AsmToByte
 * Takes in an ASM (intel) x86 instruction (e.g. MOV EAX, 42) and outputs the correspoding bytecode
 * @param {string} input - ASM instruction, case insensitive
 * @returns {BytecodeInstruction} Equivalent bytecode instruction (x86)
 */
export default async function AsmToByte(input: string) : Promise<BytecodeInstruction> {
    // https://www.felixcloutier.com/x86/
    let fetched = await (await fetch("https://www.felixcloutier.com/x86/mov")).text()
    fetched = HTML.parse(fetched)

    return {opcode:0,args:[]}
}

// TESTING DELETE
AsmToByte("MOV EAX, 2")