import { UserSchemaType } from "~~/shared/schemas";
import { User } from "../models/user";

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

export async function signInUser(username: string, password: string): Promise<
    { error: { text: string, code: number }, data: null } | 
    { error: null, data: string }
>{

    const foundUser = await User.findOne({ username }).lean();

    if (!foundUser) {
        return { error: { text: 'No user with that name exists.', code: 404 }, data: null };
    }
    
    // coerce to boolean
    if (foundUser.password === password) {
        return { error: null, data: foundUser.token };
    } else {
        return { error: { text: 'Incorrect password', code: 403 }, data: null };
    }
}

export async function findUserByUsername(username:string): Promise<
    { error: { text: string, code: number }, data: null } | 
    { error: null, data: MongooseSchema<UserSchemaType> }
> {
    const foundUser = await User.findOne({ username }).lean();

    if (!foundUser) {
        return { error: { text: 'No user with that name exists.', code: 404 }, data: null };
    }

    return { error: null, data: (foundUser as unknown as MongooseSchema<UserSchemaType>) };
}