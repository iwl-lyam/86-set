export type AssemblyInstruction = {
    mnemonic: string,
    args: string[]
}

export type BytecodeInstruction = {
    opcode: string,
    args: (string)[]
}

export enum Reference {
    LABEL,
    EAX,
    EBX,
    ECX,
    EDX,
    ESI,
    EDI,
    ESP,
    EBP,
    AX,
    BX,
    CX,
    DX,
    SI,
    DI,
    SP,
    BP,
    AH,
    BH,
    CH,
    DH,
    AL,
    BL,
    CL,
    DL,
    SIL,
    DIL,
    SPL,
    BPL
}

export function identifyReference(reference: string) : {label: string, type: Reference} {
    let ref: {label: string, type: Reference};
    if (Reference[reference.toUpperCase()] && !parseInt(reference) && reference !== "0") {
        ref = {
            label: reference.toUpperCase(),
            type: Reference[reference.toUpperCase()]
        }
    } else {
        ref = {
            label: reference,
            type: Reference.LABEL
        }
    }
    return ref
}

