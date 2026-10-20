import {} from "zod";
export const validateRequest = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const formattedErrors = result.error.format();
            const flattenedErrors = Object.values(formattedErrors)
                .flat()
                .filter(Boolean) // Filter out undefined values
                .map((error) => {
                if (error._errors) {
                    return error._errors;
                }
            })
                .flat();
            const errormessage = flattenedErrors.join(", ");
            return res.status(400).json({ error: errormessage });
        }
        req.body = result.data;
        next();
    };
};
//# sourceMappingURL=validateRequest.js.map