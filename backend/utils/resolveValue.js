export const resolveValue = (value, context) => {
    if (typeof value !== "string") return value;

    return value.replace(/\{\{(.+?)\}\}/g, (_, path) => {
        const keys = path.trim().split(".");

        let result = context;

        for (const key of keys) {
            result = result?.[key];
        }

        return result ?? "";
    });
};