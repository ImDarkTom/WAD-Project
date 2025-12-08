export async function createUserAndGetSession(username: string, password: string): Promise<{ error: { text: string, code: number }, data: null } | { error: null, data: string }> {
    const newUser = new User({
        username,
        password
    });

    try {
        const result = await newUser.save()

        return { error: null, data: result.token }
    } catch (error: unknown) {
        if ((error as any).code == 11000) {
            return { error: { text: 'User with that name already exists.', code: 409 }, data: null };
        } else {
            console.error(error);
            return { error: { text: 'Unknown Server Error', code: 500 }, data: null };
        }
    }

}