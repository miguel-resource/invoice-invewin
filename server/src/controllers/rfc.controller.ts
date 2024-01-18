import validateRfc from "validate-rfc";


export const isValidRfc = (rfc: string) => {
    const result = validateRfc(rfc);

    return result;
}