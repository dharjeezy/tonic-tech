import * as service from './service'
import cat from '../../utils/diode';

const signUp = cat('Signs Up A User', async (req, res) => {
    const validatedUser = await service.signup(req, res);

    return res
        .status(200)
        .json({ success: true, message: 'User created successfully', data:  validatedUser});
});

const signIn = cat('Signs In A User', async (req, res) => {
    const validatedUser = await service.signin(req, res);

    return res
        .status(200)
        .json({ success: true, message: 'User signed in successfully', data:  validatedUser});
});

const refresh = cat('Refreshes Token For A User', async (req, res) => {
    const validatedUser = await service.refresh(req, res);

    return res
        .status(200)
        .json({ success: true, message: 'Token refreshed successfully', data:  validatedUser});
});

export default {
    signUp,
    signIn,
    refresh
};
