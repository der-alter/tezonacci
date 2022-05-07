import dotenv from 'dotenv';
dotenv.config();

type Config = {
    [key: string]: NetworkConfig;
};

type NetworkConfig = {
    node: string;
    accounts: Accounts;
};

type Accounts = {
    [key: string]: Account;
};

type Account = {
    pkh: string;
    sk: string;
    pk: string;
};

const devAccounts = {
    alice: {
        pkh: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
        sk: 'edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq',
        pk: 'edpkvGfYw3LyB1UcCahKQk4rF2tvbMUk8GFiTuMjL75uGXrpvKXhjn',
    },
    bob: {
        pkh: 'tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6',
        sk: 'edsk3RFfvaFaxbHx8BMtEW1rKQcPtDML3LXjNqMNLCzC3wLC1bWbAt',
        pk: 'edpkurPsQ8eUApnLUJ9ZPDvu98E8VNj4KtJa1aZr16Cr5ow5VHKnz4',
    },
};

const config: Config = {
    local: {
        node: 'http://localhost:20000',
        accounts: devAccounts,
    },
    ci: {
        node: 'http://sandbox:20000',
        accounts: devAccounts,
    },
    testnet: {
        node: 'https://rpc.ithacanet.teztnets.xyz',
        accounts: {
            alice: {
                pkh: 'tz1YXU2QTCq9gbFpRganWi8LWAER5ayASkgt',
                sk: 'edskRtQVNr7FrbdSCT7VBDrJXsTCUrKvLiikhrVz3KK3zUNwKreeQpogZ7pwDX8mrrVCPEYEtEwKJRxrGXnNYfwo6V1Yup8qpT',
                pk: 'edpkuT6CYCBf6Sed4QKfHgZRQsWbGcGLQwoJWGqM2WqmRKucuAKpno',
            },
            bob: {
                pkh: 'tz1dDp12PUfbtFXF9yNxz52GYG5hbmHxsG2f',
                sk: 'edskReYTc1NphoeAB4CSz6SDkGMgEBTExEnABZjw1esYP7fYuu864cHzHjUMvQYPD5p1i3byi3AKQZdsnhZsoY1qDDguzBYDd9',
                pk: 'edpkuWR6xt5Pi59X7eyCxbZTCAsJW2DrFv4vN4ULtNmafxwb4ev9mT',
            },
        },
    },
};

export default config[process.env.NETWORK];
