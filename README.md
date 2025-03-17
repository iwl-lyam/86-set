# WIP: 86-set
`npm` module for identifying x86 (32bit) instructions

- Input: `AssemblyInstruction`
```ts
{
    mnemonic: string,
    args: string[]
}
```

- Output: `BytecodeInstruction`
    - A string in the arguments represents a label (label name)
```ts
{
    opcode: number,
    args: (number | string)[]
}
```
