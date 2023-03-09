import * as service from './service'
import cat from '../../utils/diode';

const transfer = cat('Transfer Funds Between Accounts', async (req, res) => {
    const data = await service.transfer(req, res);

    return res
        .status(200)
        .json({ success: true, message: 'Transfer done successfully', data:  data});
});
export default {
   transfer
};
