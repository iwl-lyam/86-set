export type AssemblyInstruction = {
    mnemonic: string;
    args: string[];
};

export type BytecodeInstruction = {
    opcode: string;
    args: (string)[];
};

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
    BPL,
    IMMEDIATE,
}

enum Size {
    BIT,
    BYTE,
    WORD,
    DWORD // 32b so no qw
}

type ReferenceType = { label: string; type: Reference; size?: Size | null }

export function identifyReference(
    reference: string,
): ReferenceType {
    let ref: ReferenceType;
    if (
        Reference[reference.toUpperCase()] && !parseInt(reference) &&
        reference !== "0"
    ) {
        ref = {
            label: reference.toUpperCase(),
            type: Reference[reference.toUpperCase()]
        };
    } else {
        if (parseInt(reference, 10) || reference === "0") {
            ref = {
                label: reference,
                type: Reference.IMMEDIATE
            };
        } else if (reference.startsWith("0x")) {
            ref = {
                label: parseInt(reference, 16).toString(),
                type: Reference.IMMEDIATE
            };
        } else if (reference.startsWith("0b")) {
            ref = {
                label: parseInt(reference.substring(2), 2).toString(),
                type: Reference.IMMEDIATE
            };
        } else {
            ref = {
                label: reference,
                type: Reference.LABEL
            };
        }
    }
    if (ref.label === "NaN") {
        throw new Error("Invalid immediate: " + reference)
    }
    return ref;
}

export function identifySize(reference: ReferenceType): Size | null {
    if (reference.type >= Reference.EAX && reference.type <= Reference.EBP) {
        return Size.DWORD
    } else if (reference.type >= Reference.AX && reference.type <= Reference.BP) {
        return Size.WORD
    } else if (reference.type >= Reference.AH && reference.type <= Reference.BPL) {
        return Size.BYTE
    } else if (reference.type == Reference.IMMEDIATE) {
        let hex = parseInt(reference.label).toString(16)
        if (hex.length > 8) {
            throw new Error("Immediate value too large: "+reference.label)
        } else if (hex.length > 4) {
            return Size.DWORD
        } else if (hex.length > 2) {
            return Size.WORD
        } else if (hex.length > 0) {
            return Size.BYTE
        }
        return null
    } else {
        return null
    }
}
