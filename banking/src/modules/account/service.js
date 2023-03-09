import {
    Account,
} from './model';
import ServiceError from '../../helpers/ServiceError';

const createAccount = async ({userId}) => {
    try {
        //TODO: optimize this, account number can get duplicated
        const accountNumber = generateAccountNumber();
        const account = new Account({ userId, accountNumber });

        await account.save();

        return account;
    } catch (err) {
        console.error(err);
        throw new ServiceError('Something went wrong...', 500);
    }
};

const transfer = async (req, res) => {
    try {
        const { toAccountId, amount } = req.body;
        const fromAccountId = req.userId;

        // check if from and to accounts are different
        if (toAccountId === fromAccountId) {
            throw new ServiceError('Cannot transfer to the same account', 400);
        }

        // get from account
        const fromAccount = await Account.findById(fromAccountId);
        if (!fromAccount) {
            throw new ServiceError('from Account not found', 404);
        }

        // get to account
        const toAccount = await Account.findById(toAccountId);
        if (!toAccount) {
            throw new ServiceError('to Account not found', 404);
        }

        // check if from account has sufficient balance
        if (fromAccount.balance < amount) {
            throw new ServiceError('Insufficient balance', 400);
        }

        // perform transfer
        fromAccount.balance -= amount;
        toAccount.balance += amount;

        await Promise.all([fromAccount.save(), toAccount.save()]);

        return fromAccount;
    } catch (err) {
        console.error(err);
        throw new ServiceError('Something went wrong while trying to transfer...', 500);
    }
};

function generateAccountNumber() {
    const length = 10;
    let accountNumber = '';

    for (let i = 0; i < length; i++) {
        const randomDigit = Math.floor(Math.random() * 10);
        accountNumber += randomDigit;
    }

    return accountNumber;
}

export {
    createAccount,
    transfer
};
