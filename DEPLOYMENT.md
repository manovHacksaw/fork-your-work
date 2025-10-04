# 🚀 Contract Deployment Guide for U2U Solaris Mainnet

This guide will help you deploy your smart contracts to U2U Solaris Mainnet using Hardhat.

## 📋 Prerequisites

1. **Node.js** (v18 or higher)
2. **npm** or **yarn**
3. **U2U tokens** for gas fees
4. **Private key** of the deployment account

## 🛠️ Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

1. Copy the environment template:
```bash
cp env.template .env
```

2. Edit `.env` and add your private key:
```bash
PRIVATE_KEY=your_actual_private_key_here
```

**⚠️ IMPORTANT SECURITY NOTES:**
- Never commit your `.env` file to version control
- Never share your private key with anyone
- Use a dedicated account for deployment (not your main wallet)

### 3. Get U2U Tokens

You'll need U2U tokens to pay for gas fees during deployment. You can:
- Bridge from other networks
- Buy from exchanges that support U2U
- Use faucets if available

## 🚀 Deployment Options

### Option 1: Deploy All Contracts (Recommended)

Deploy all contracts in the correct order:

```bash
npm run deploy:all
```

This will deploy:
1. MockUSDT token
2. Allin1Bounty contract
3. FreelanceGigEscrow contract

### Option 2: Deploy Individually

Deploy contracts one by one:

```bash
# 1. Deploy USDT token first
npm run deploy:usdt

# 2. Deploy Bounty contract
npm run deploy:bounty

# 3. Deploy Freelance contract
npm run deploy:freelance
```

## 📁 Deployment Output

After successful deployment, you'll find:

- `./deployments/complete-deployment.json` - Complete deployment summary
- `./deployments/USDT-deployment.json` - USDT contract details
- `./deployments/Bounty-deployment.json` - Bounty contract details
- `./deployments/Freelance-deployment.json` - Freelance contract details

## 🔧 Available Commands

```bash
# Compile contracts
npm run compile

# Run tests
npm run test

# Deploy individual contracts
npm run deploy:usdt
npm run deploy:bounty
npm run deploy:freelance

# Deploy all contracts
npm run deploy:all

# Verify contracts (optional)
npm run verify:usdt <contract_address>
npm run verify:bounty <contract_address>
npm run verify:freelance <contract_address>
```

## 📝 Post-Deployment Steps

### 1. Update Frontend Configuration

After deployment, update your frontend contract addresses in `lib/contracts.ts`:

```typescript
export const BOUNTY_CONTRACT_ADDRESS = "0x..."; // Your deployed bounty address
export const USDT_TOKEN_ADDRESS = "0x..."; // Your deployed USDT address
export const FREELANCE_CONTRACT_ADDRESS = "0x..."; // Your deployed freelance address
```

### 2. Test the Contracts

1. Connect your wallet to U2U Solaris Mainnet
2. Test creating bounties and freelance gigs
3. Verify all functionality works as expected

### 3. Contract Verification (Optional)

Verify your contracts on the U2U explorer:

```bash
# Get the contract addresses from deployment files
npm run verify:usdt <usdt_address>
npm run verify:bounty <bounty_address>
npm run verify:freelance <freelance_address>
```

## 🌐 Network Information

- **Network Name**: U2U Solaris Mainnet
- **RPC URL**: https://rpc-mainnet.u2u.xyz
- **Chain ID**: 39
- **Currency**: U2U
- **Explorer**: https://explorer.u2u.xyz

## 🆘 Troubleshooting

### Common Issues

1. **"Insufficient funds" error**
   - Ensure you have enough U2U tokens for gas fees
   - Check your account balance

2. **"Private key not found" error**
   - Verify your `.env` file exists and contains `PRIVATE_KEY`
   - Ensure the private key is valid (starts with 0x)

3. **"Network not found" error**
   - Make sure you're using the correct network name: `u2uSolarisMainnet`
   - Check your `hardhat.config.js` configuration

4. **"Contract deployment failed" error**
   - Check if you have enough gas
   - Verify the contract code compiles without errors
   - Ensure all dependencies are installed

### Getting Help

If you encounter issues:

1. Check the deployment logs for specific error messages
2. Verify your environment configuration
3. Ensure you have sufficient U2U tokens
4. Check the U2U network status

## 📊 Gas Estimation

Approximate gas costs for deployment:
- MockUSDT: ~500,000 gas
- Allin1Bounty: ~2,000,000 gas
- FreelanceGigEscrow: ~2,500,000 gas

Total estimated cost: ~5,000,000 gas units

## 🔒 Security Best Practices

1. **Use a dedicated deployment account**
2. **Never commit private keys to version control**
3. **Test on testnet first** (if available)
4. **Verify contracts after deployment**
5. **Keep deployment records for audit purposes**

## 📞 Support

For U2U Solaris Mainnet specific issues:
- Check the official U2U documentation
- Visit the U2U explorer for network status
- Contact U2U support channels

---

**Happy Deploying! 🎉**
