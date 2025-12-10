export async function getBookTitleByWorkId(workId: string): Promise<
    { title: string} |
    { error: string }
> {
    try {
        const response = await fetch(`https://openlibrary.org/works/${workId}.json`);
        const data = await response.json();

        if ('error' in data || !data.title) {
            return { error: data.error ?? 'Unknown Error' };
        } else {
            return { title: data.title };
        }
    } catch (e) {
        return { error: (e as Error).name ?? 'Unknown Error' };
    }
}