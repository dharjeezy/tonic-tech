import {
    Account,
} from './model';
import ServiceError from '../../helpers/ServiceError';
import {User} from "../auth/model";

const createAccount = async ({userId}) => {
    try {
        const accountNumber = generateAccountNumber();

        // Just putting a Default balance
        const balance = 1000000
        const account = await Account({ userId, accountNumber, balance }).save();

        return account;
    } catch (err) {
        console.error(err);
        throw new ServiceError('Something went wrong...', 500);
    }
};

const transfer = async (req, res) => {
        const { toAccountNumber, amount } = req.body;
        const fromAccountId = req.userId;

        // get from account
        const fromAccount = await Account.findOne({userId: fromAccountId});
        if (!fromAccount) {
            throw new ServiceError('from Account not found', 404);
        }

        // check if from and to accounts are different
        if (toAccountNumber === fromAccount.accountNumber) {
            throw new ServiceError('Cannot transfer to the same account', 400);
        }

        // get to account
        const toAccount = await Account.findOne({accountNumber: toAccountNumber});
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
