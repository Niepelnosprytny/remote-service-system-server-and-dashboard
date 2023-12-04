export default defineEventHandler(() => {
    return {
        status: 400,
        body: `Bad request. Use /api/auth/register to create user`
    }
});