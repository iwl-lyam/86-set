import {AssemblyInstruction, BytecodeInstruction, identifyReference, Reference, identifySize} from "./util.ts"
import HTML from "html-parse-stringify"

/**
 * AsmToByte
 * Takes in an ASM (intel) x86 instruction (e.g. MOV EAX, 42) and outputs the correspoding bytecode
 * @param {string} input - ASM instruction, case insensitive
 * @returns {AssemblyInstruction} Equivalent bytecode instruction (x86)
 */
export default async function AsmToByte(input: AssemblyInstruction) : Promise<BytecodeInstruction> {
    // https://www.felixcloutier.com/x86/
    let fetched = await (await fetch("https://www.felixcloutier.com/x86/"+input.mnemonic.toLowerCase())).text()
    fetched = fetched.replace("\n", "")
    let parsed = HTML.parse(fetched)
    let body = parsed[0].children[0].children[1].children

    let tables: any = []


    body.forEach((table, i) => {
        if (table.name == "table") {
            tables.push({})
          
            // Ensure tables[i] is initialized
            if (!tables[i]) tables[i] = {};
            table.children.forEach(row => {
              if (row.name == "tr") {
                // Find the header row (first tr with th children)
                if (!tables[i].headers) {
                  const headerCells = row.children.filter(child => child.name === "th");
                  if (headerCells.length > 0) {
                  tables[i].headers = headerCells.map(cell => cell.children[0]?.content?.trim() ?? "");
                  tables[i].rows = [];
                  }
                } else {
                  // Data row: td children
                  const dataCells = row.children.filter(child => child.name === "td");
                  if (dataCells.length > 0 && tables[i].headers) {
                  const rowObj: Record<string, string> = {};
                  dataCells.forEach((cell, idx) => {
                    const key = tables[i].headers[idx] ?? `col${idx}`;
                    rowObj[key] = cell.children[0]?.content?.trim() ?? "";
                  });
                  tables[i].rows.push(rowObj);
                  }
                }
              }
            })
            // Remove empty tables (no headers or no rows)
            if (
              !tables[i].headers ||
              !tables[i].rows ||
              tables[i].headers.length === 0 ||
              tables[i].rows.length === 0
            ) {
              tables.splice(i, 1);
            }
        }
    })

    tables = tables.filter(table => Array.isArray(table.rows));
    // console.log(tables)

    const instructions = tables[0].rows
    const format = tables[1].rows

    // console.log(instructions)

    // identify each argument type
    let argtypes: {}[] = []

    input.args.forEach(arg => {
        let ref = identifyReference(arg)
        ref.size = identifySize(ref) // really bad code
        argtypes.push({ref, arg})
    })

    console.log(argtypes)

    return {opcode:"",args:[]}
}

// TESTING DELETE
AsmToByte({mnemonic: "MOV", args: ["EAX", "120"]})
AsmToByte({mnemonic: "MOV", args: ["AH", "0xF2"]})
AsmToByte({mnemonic: "MOV", args: ["EBX", "0b1010110"]})