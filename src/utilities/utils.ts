
import path from "path";
import { fileURLToPath, pathToFileURL } from 'node:url';


/**
 *  This constant contains the path to the src/ (or build/) folder.
 */
export const SRC_PATH: string = path.normalize(path.join(path.dirname(fileURLToPath(import.meta.url)), ".."));


/**
 * This function extract the default export from a file
 * @param {string} path - The path to the file
 */
export async function dynamicImport(path: string): Promise<any> {
    const module = await import(pathToFileURL(path).toString());
    return module?.default;
};
