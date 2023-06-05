

export async function getHelloWorldService(): Promise<{ message?: {}; error?: string }> {
    try {
        return { message: "Hello GROEP E" };
    } catch (error) {
        return { error: "Error in getHelloWorld" };
    }
}
